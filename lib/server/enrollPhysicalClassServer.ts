import { db } from "@/lib/firebase/firebaseConfig"
import { doc, setDoc, updateDoc, increment, getDoc, writeBatch } from "firebase/firestore"
import QRCode from "qrcode"
import { sendEnrollmentEmail } from "@/lib/email/sendEnrollmentEmail"
import { createTelegramInviteLink } from "@/lib/telegram/inviteLink"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { markInvitePending } from "../telegram/markInvitePending"

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
    const existing = await getDoc(doc(db, "physicalClassEnrollments", enrollmentId))
    if (existing.exists()) return

    // ✅ Create Telegram invite
    const inviteLink = await createTelegramInviteLink(telegramGroupId, userId)

    // ✅ Generate QR code
    const qrPayload = {
        enrollmentId,
        userId,
        classId,
        type: "physical_class",
        inviteLink,
        issuedAt: Date.now(),
    }
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrPayload))

    const batch = writeBatch(db)
    const now = new Date()

    // ✅ Enrollment record
    batch.set(doc(db, "physicalClassEnrollments", enrollmentId), {
        id: enrollmentId,
        userId,
        classId,
        cohortId,
        paymentReference,
        qrCode,
        status: "paid",
        enrolledAt: now,
        attendanceLog: [],
    })

    // ✅ Increment class capacity
    batch.update(doc(db, "physicalClasses", classId), {
        enrolled: increment(1),
    })

    // ✅ Unified enrollment (dashboard, receipts, audit)
    batch.set(doc(db, "users", userId, "classEnrollments", enrollmentId), {
        enrollmentId,
        itemId: classId,
        type: "physical_class",
        paymentReference,
        enrolledAt: now,
    })

    await batch.commit()

    // ✅ Email notification
    //  await sendEnrollmentEmail({
    //      to: payerEmail,
    //      cohortName: cohortName,
    //      className: className,
    //      telegramInviteLink: inviteLink,
    //  })
    if (inviteLink) {
        await sendEnrollmentEmail({
            to: payerEmail,
            cohortName,
            className,
            telegramInviteLink: inviteLink,
        })
    } else {
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
