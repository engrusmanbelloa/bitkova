import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export default async function help(ctx: TelegramContext) {
    await sendTelegramMessage(
        ctx.chatId,
        `/classes - View available classes
/status - Get your status of payment in bitkova
/payment - Payment instructions
/schedule - Check class schedules
/calendar - View Q1 academic schedule and events
/resources - Learning materials
/faq - View frequently asked question
/support - Contact support`,
    )
}
