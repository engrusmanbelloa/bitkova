// lib/server/enrollTelegramClassServer.ts
import { db } from "@/lib/firebase/firebaseConfig"
import { doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore"
import { createTelegramInviteLink } from "@/lib/telegram/inviteLink"
import { sendTelegramMessage } from "@/lib/telegram/bot"

interface Params {
    userId: string
    classId: string
    cohortId: string
    telegramGroupId: string
    paymentReference: string
    payerEmail: string
}

export async function enrollTelegramClassServer({
    userId,
    classId,
    cohortId,
    telegramGroupId,
    paymentReference,
    payerEmail,
}: Params) {
    const enrollmentId = `${userId}-${classId}`

    // ✅ Idempotency check
    const existing = await getDoc(doc(db, "telegramClassEnrollments", enrollmentId))
    if (existing.exists()) return

    // ✅ Create Telegram invite
    const inviteLink = await createTelegramInviteLink(telegramGroupId, userId)

    await setDoc(doc(db, "telegramClassEnrollments", enrollmentId), {
        id: enrollmentId,
        userId,
        classId,
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
    await setDoc(doc(db, "users", userId, "classEnrollments", enrollmentId), {
        enrollmentId,
        itemId: classId,
        type: "telegram_class",
        paymentReference,
        enrolledAt: new Date(),
    })

    // ✅ Telegram auto-DM
    //  await sendTelegramMessage(
    //      userId,
    //      `🎉 *Payment Successful!*\n\nHere’s your private Telegram class access:\n\n👉 ${inviteLink}\n\n⚠️ Link is single-use. Join immediately.`,
    //  )
}
