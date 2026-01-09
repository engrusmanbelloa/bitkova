// lib/server/enrollTelegramClassServer.ts
import { db } from "@/lib/firebase/firebaseConfig"
import { doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore"
import { createTelegramInviteLink } from "@/lib/telegram/inviteLink"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { sendEnrollmentEmail } from "@/lib/email/sendEnrollmentEmail"
import { markInvitePending } from "@/lib/telegram/markInvitePending"
import { resolveTelegramChatId } from "@/lib/telegram/resolveChatId"
import { Enrollment } from "@/types/userType"

interface Params {
    userId: string
    classId: string
    className: string
    cohortId: string
    cohortName: string
    telegramGroupId: string
    paymentReference: string
    payerEmail: string
    itemId: string
    enrolledAt: Date
}

export async function enrollTelegramClassServer({
    userId,
    itemId,
    cohortId,
    cohortName,
    telegramGroupId,
    paymentReference,
    payerEmail,
    className,
}: Params) {
    const enrollmentId = `${userId}-${itemId}`

    // ✅ Idempotency check
    const existing = await getDoc(doc(db, "enrollments", enrollmentId))
    if (existing.exists()) return

    // ✅ Create Telegram invite
    const realChatId = await resolveTelegramChatId(telegramGroupId)
    const inviteLink = await createTelegramInviteLink(realChatId, userId)

    // ✅ Save enrollment record
    await setDoc(doc(db, "enrollments", enrollmentId), {
        id: enrollmentId,
        userId,
        itemId,
        itemType: "telegram_class",
        className,
        cohortId,
        paymentReference,
        telegramInviteLink: inviteLink,
        status: "paid",
        enrolledAt: new Date(),
    })

    // ✅ Increment class count
    await updateDoc(doc(db, "telegramClasses", itemId), {
        enrolled: increment(1),
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
            classId: itemId,
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
