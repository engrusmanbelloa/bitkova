// lib/server/enrollTelegramClassServer.ts
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import { createTelegramInviteLink } from "@/lib/telegram/inviteLink"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { sendEnrollmentEmail } from "@/lib/email/sendEnrollmentEmail"
import { markInvitePending } from "@/lib/telegram/markInvitePending"
import { resolveTelegramChatId } from "@/lib/telegram/resolveChatId"
import { rewardReferral } from "@/lib/referrals/referralRewards"
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
    price: number
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
    price,
}: Params) {
    const enrollmentId = `${userId}-${itemId}`
    const enrollmentRef = adminDb.collection("enrollments").doc(enrollmentId)

    // Idempotency check
    if ((await enrollmentRef.get()).exists) return

    // Create Telegram invite
    const realChatId = await resolveTelegramChatId(telegramGroupId)
    const inviteLink = await createTelegramInviteLink(realChatId, userId)

    // Save enrollment record
    const batch = adminDb.batch()

    batch.set(enrollmentRef, {
        id: enrollmentId,
        userId,
        itemId,
        itemType: "telegram_class",
        className,
        cohortId,
        paymentReference,
        inviteLink: inviteLink ?? null,
        status: "paid",
        enrolledAt: new Date(),
    })

    // Increment class count
    batch.update(adminDb.collection("telegramClasses").doc(itemId), {
        enrolled: FieldValue.increment(1),
    })

    await batch.commit()

    // award the referrer with 150xp for physical class
    // await rewardReferrer(userId, 150)
    // award the referrer with 200xp for physical class
    await rewardReferral({
        buyerId: userId,
        price: price,
        enrollmentId,
    })

    if (inviteLink) {
        await sendEnrollmentEmail({
            to: payerEmail,
            cohortName,
            className,
            inviteLink: inviteLink,
            status: "success",
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
        await sendEnrollmentEmail({
            to: payerEmail,
            cohortName,
            className,
            status: "pending",
        })
    }

    // Telegram auto-DM
    //  await sendTelegramMessage(
    //      userId,
    //      `🎉 *Payment Successful!*\n\nHere’s your private Telegram class access:\n\n👉 ${inviteLink}\n\n⚠️ Link is single-use. Join immediately.`,
    //  )
}
