// lib/server/enrollTelegramClassServer.ts
import { db } from "@/lib/firebase/firebaseConfig"
import { doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore"
import { createTelegramInviteLink } from "@/lib/telegram/inviteLink"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { sendEnrollmentEmail } from "@/lib/email/sendEnrollmentEmail"
import { markInvitePending } from "@/lib/telegram/markInvitePending"
import { resolveTelegramChatId } from "@/lib/telegram/resolveChatId"

interface Params {
    userId: string
    classId: string
    className: string
    cohortId: string
    cohortName: string
    telegramGroupId: string
    paymentReference: string
    payerEmail: string
}

export async function enrollTelegramClassServer({
    userId,
    classId,
    cohortId,
    cohortName,
    telegramGroupId,
    paymentReference,
    payerEmail,
    className,
}: Params) {
    const enrollmentId = `${userId}-${classId}`

    // ✅ Idempotency check
    const existing = await getDoc(doc(db, "telegramClassEnrollments", enrollmentId))
    if (existing.exists()) return

    // ✅ Create Telegram invite
    const realChatId = await resolveTelegramChatId(telegramGroupId)
    const inviteLink = await createTelegramInviteLink(realChatId, userId)

    // ✅ Save enrollment record
    await setDoc(doc(db, "telegramClassEnrollments", enrollmentId), {
        id: enrollmentId,
        userId,
        classId,
        className,
        cohortId,
        paymentReference,
        telegramInviteLink: inviteLink,
        status: "paid",
        enrolledAt: new Date(),
    })

    // ✅ Increment class count
    await updateDoc(doc(db, "telegramClasses", classId), {
        enrolled: increment(1),
    })

    // ✅ Save unified enrollment
    await setDoc(doc(db, "users", userId, "enrolledCourses", enrollmentId), {
        enrollmentId,
        className,
        itemId: classId,
        type: "telegram_class",
        paymentReference,
        enrolledAt: new Date(),
    })

    if (inviteLink) {
        await sendEnrollmentEmail({
            to: payerEmail,
            cohortName,
            className,
            telegramInviteLink: inviteLink,
        })
    } else {
        // await markInvitePending(userId, classId, telegramGroupId)
        await markInvitePending({
            userId: userId,
            email: payerEmail,
            classId: classId,
            telegramGroupId: telegramGroupId,
            cohortName: cohortName,
            className: className,
        })
    }

    // await s  `1endEnrollmentEmail({
    //     to: payerEmail,
    //     cohortName: cohortName,
    //     className: className,
    //     telegramInviteLink: inviteLink,
    // })
    // ✅ Telegram auto-DM
    //  await sendTelegramMessage(
    //      userId,
    //      `🎉 *Payment Successful!*\n\nHere’s your private Telegram class access:\n\n👉 ${inviteLink}\n\n⚠️ Link is single-use. Join immediately.`,
    //  )
}
