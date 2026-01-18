import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export default async function help(ctx: TelegramContext) {
    await sendTelegramMessage(
        ctx.chatId,
        `/classes - View available classes
/status - Know the status of your payment
/schedule - Check class schedules
/calendar - Check cohorts calendr
/payment - Payment instructions
/resources - Learning materials
/support - Contact support`,
    )
}
