// lib/telegram/commands/status.ts
import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { findEnrollmentByRecovery } from "@/lib/telegram/services/findEnrollmentByRecovery"
import { renderEnrollmentStatus } from "@/lib/telegram/renderers/renderEnrollmentStatus"

export default async function status(ctx: TelegramContext) {
    const text = ctx.text?.trim()

    // Step 1: initial prompt
    if (!text || text === "/status") {
        await sendTelegramMessage(
            ctx.chatId,
            `🔎 *Check Enrollment Status*\n\nReply with:\n• Your *email address*\nOR\n• Your *Paystack payment reference*`,
        )
        return
    }

    // Step 2: lookup
    const enrollment = await findEnrollmentByRecovery(text)

    if (!enrollment) {
        await sendTelegramMessage(
            ctx.chatId,
            `❌ No enrollment found.\n\nPlease check the email or payment reference and try again.`,
        )
        return
    }

    // Step 3: render
    const message = renderEnrollmentStatus(enrollment)
    await sendTelegramMessage(ctx.chatId, message)
}
