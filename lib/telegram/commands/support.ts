import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export default async function support(ctx: TelegramContext) {
    await sendTelegramMessage(
        ctx.chatId,
        `🆘 *Support*

WhatsApp: +234 803 250 3624, +234 803 610 7361
Telegram: @engrusmanbelloa, @mahmoudsardauna
Email: support@bitkova.com`,
    )
}
