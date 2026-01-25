// lib/telegram/commands/status.ts
import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { findEnrollmentByRecovery } from "@/lib/telegram/services/findEnrollmentByRecovery"
import { renderEnrollmentStatus } from "@/lib/telegram/renderers/renderEnrollmentStatus"
import { adminDb } from "@/lib/firebase/admin"
import { Timestamp } from "firebase-admin/firestore"

export default async function status(ctx: TelegramContext) {
    // await setDoc(doc(db!, "telegramSessions", String(ctx.chatId)), {
    //     flow: "status",
    //     step: "awaiting_input",
    //     expiresAt: Timestamp.fromMillis(Date.now() + 5 * 60 * 1000),
    // })

    await adminDb
        .collection("telegramSessions")
        .doc(String(ctx.chatId))
        .set({
            flow: "status",
            step: "awaiting_input",
            expiresAt: Timestamp.fromMillis(Date.now() + 5 * 60 * 1000),
        })

    await sendTelegramMessage(
        ctx.chatId,
        `🔎 *Check Enrollment Status*\n\nReply with:\n• Your *email address*\nOR\n• Your *Paystack payment reference*`,
    )
}
