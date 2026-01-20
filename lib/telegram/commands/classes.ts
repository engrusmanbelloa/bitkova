// lib/telegram/commands/classes.ts
import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { getAvailableClasses } from "@/lib/telegram/services/getAvailableClasses"
import { renderClassesMessage } from "@/lib/telegram/renderers/renderClassesMessage"
import { renderClassButtons } from "@/lib/telegram/renderers/renderClassButtons"

export default async function classes(ctx: TelegramContext) {
    try {
        const data = await getAvailableClasses()

        if (!data) {
            await sendTelegramMessage(ctx.chatId, "🚫 No active classes at the moment.")
            return
        }
        const message = renderClassesMessage(data)
        const buttons = renderClassButtons(data)

        await sendTelegramMessage(ctx.chatId, message, {
            reply_markup: buttons.reply_markup,
        })
    } catch (err) {
        console.log("❌ /classes failed:", err)

        await sendTelegramMessage(
            ctx.chatId,
            "⚠️ Something went wrong loading classes. Please try again later.",
        )
    }
}
