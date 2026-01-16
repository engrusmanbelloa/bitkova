// lib/telegram/commands/classes.ts
import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { getAvailableClasses } from "../services/getAvailableClasses"
import { renderClassesMessage } from "../renderers/renderClassesMessage"

export default async function classes(ctx: TelegramContext) {
    const data = await getAvailableClasses()

    if (!data) {
        await sendTelegramMessage(
            ctx.chatId,
            "🚫 No active classes at the moment. Please check back later.",
        )
        return
    }

    const message = renderClassesMessage(data)

    await sendTelegramMessage(ctx.chatId, message)
}
