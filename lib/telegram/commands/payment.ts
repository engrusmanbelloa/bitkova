import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export default async function payment(ctx: TelegramContext) {
    await sendTelegramMessage(
        ctx.chatId,
        `💳 *Payment*

Pay securely via Paystack:
👉 https://paystack.com/pay/bitkova-classes`,
    )
}
