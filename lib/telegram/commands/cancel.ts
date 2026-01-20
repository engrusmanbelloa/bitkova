import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { clearTelegramSession } from "@/lib/telegram/flows/sessionStore"

export default async function cancel(ctx: TelegramContext) {
    await clearTelegramSession(ctx.chatId)

    await sendTelegramMessage(
        ctx.chatId,
        `❌ *Action cancelled*\n\nYou can start again using:\n• /status\n• /payment\n• /help`,
    )
}
