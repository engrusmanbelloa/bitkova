// lib/telegram/commands/classes.ts
import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { getActiveClasses } from "@/lib/telegram/services/getActiveClasses"
import { renderClassCard } from "@/lib/telegram/renderers/renderClassCard"

export default async function classes(ctx: TelegramContext) {
    try {
        const result = await getActiveClasses()

        if (!result || result.classes.length === 0) {
            await sendTelegramMessage(
                ctx.chatId,
                "⚠️ No active classes available at the moment.\nPlease check back later.",
            )
            return
        }

        await sendTelegramMessage(
            ctx.chatId,
            "🎓 *Bitkova2026A*\nAvailable Classes:\n────────────────────",
        )
    } catch (err) {
        console.error("❌ /classes error:", err)

        await sendTelegramMessage(
            ctx.chatId,
            "⚠️ Unable to load available classes right now.\nPlease try again later.",
        )
    }
}
