import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import QRCode from "qrcode"
import { sendEnrollmentEmail } from "@/lib/email/sendEnrollmentEmail"
import { createTelegramInviteLink } from "@/lib/telegram/inviteLink"
import { markInvitePending } from "../telegram/markInvitePending"
import { resolveTelegramChatId } from "@/lib/telegram/resolveChatId"

interface Params {
    userId: string
    classId: string
    cohortId: string
    cohortName: string
    className: string
    paymentReference: string
    payerEmail: string
    telegramGroupId: string
}

export async function enrollPhysicalClassServer({
    userId,
    classId,
    cohortId,
    cohortName,
    className,
    paymentReference,
    payerEmail,
    telegramGroupId,
}: Params) {
    const enrollmentId = `${userId}-${classId}`

    // ✅ Idempotency check (CRITICAL)
    const ref = adminDb.collection("enrollments").doc(enrollmentId)
    if ((await ref.get()).exists) return

    // ✅ Create Telegram invite
    const realChatId = await resolveTelegramChatId(telegramGroupId)
    const inviteLink = await createTelegramInviteLink(realChatId, userId)

    // ✅ Generate QR code
    const qrPayload = `BITKOVA PHYSICAL CLASS
    Cohort: ${cohortName}
    Class: ${className}
    Enrolled: ${new Date().toLocaleDateString()}
    Join: ${inviteLink}`

    const qrCode = await QRCode.toDataURL(qrPayload, {
        width: 400,
        margin: 2,
        color: {
            dark: "#000000",
            light: "#FFFFFF",
        },
    })

    // const batch = writeBatch(db)
    const batch = adminDb.batch()
    const now = new Date()

    // ✅ Enrollment record
    batch.set(ref, {
        id: enrollmentId,
        userId,
        itemId: classId,
        itemType: "physical_class",
        cohortId,
        className,
        paymentReference,
        status: "paid",
        qrCode,
        inviteLink,
        attendanceLog: [],
        enrolledAt: now,
    })
    // batch.set(doc(db, "enrollments", enrollmentId), {
    //     id: enrollmentId,
    //     userId,
    //     itemId: classId,
    //     itemType: "physical_class",
    //     cohortId,
    //     className,
    //     paymentReference,
    //     status: "paid",
    //     qrCode,
    //     inviteLink,
    //     attendanceLog: [],
    //     enrolledAt: now,
    // })

    // ✅ Increment class capacity
    // batch.update(doc(db, "physicalClasses", classId), {
    //     enrolled: increment(1),
    // })

    batch.update(adminDb.collection("physicalClasses").doc(classId), {
        enrolled: FieldValue.increment(1),
    })

    await batch.commit()

    if (inviteLink) {
        await sendEnrollmentEmail({
            to: payerEmail,
            cohortName,
            className,
            inviteLink: inviteLink,
            physicalQrCode: qrCode,
            status: "success",
        })
    } else {
        await sendEnrollmentEmail({
            to: payerEmail,
            cohortName,
            className,
            status: "pending",
        })
        await markInvitePending({
            userId: userId,
            email: payerEmail,
            classId: classId,
            telegramGroupId: telegramGroupId,
            cohortName: cohortName,
            className: className,
        })
    }

    // ✅ Telegram auto-DM
    //  await sendTelegramMessage(
    //      userId,
    //      `🎉 *Payment Successful!*\n\nHere’s your private Telegram class access:\n\n👉 ${inviteLink}\n\n⚠️ Link is single-use. Join immediately.`,
    //  )
}
