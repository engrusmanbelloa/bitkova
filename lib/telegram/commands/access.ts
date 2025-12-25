import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export default async function start(ctx: TelegramContext) {
    await sendTelegramMessage(
        ctx.chatId,
        `👋 Welcome to *Bitkova Assistant*!

I help you with:
• Bitkova Classes
• Schedules
• Payments
• Learning resources

Type /help to continue.`,
    )
}
