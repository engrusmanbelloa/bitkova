import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export default async function access(ctx: TelegramContext) {
    await sendTelegramMessage(
        ctx.chatId,
        `🔐 *Class Access* Once your payment is confirmed, your class link will be sent here automatically.`,
    )
}
