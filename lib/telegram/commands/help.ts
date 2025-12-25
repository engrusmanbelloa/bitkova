import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export default async function help(ctx: TelegramContext) {
    await sendTelegramMessage(
        ctx.chatId,
        `/classes - View available classes
/schedule - Check class schedules
/payment - Payment instructions
/access - Get class access link
/resources - Learning materials
/support - Contact support`,
    )
}
