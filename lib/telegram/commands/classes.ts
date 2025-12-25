import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export default async function classes(ctx: TelegramContext) {
    await sendTelegramMessage(
        ctx.chatId,
        `📚 *Bitkova Crypto Trading Physical Classes*

1️⃣ Telegram online class
2️⃣ Kano physical class
3️⃣ Gombe physical class 
4️⃣ Kaduna physical class
5️⃣ Bauchi physical class

Use /payment to enroll in any of the above classes.`,
    )
}
