// lib/telegram/engine/flowEngine.ts
import { statusFlow } from "../flows/status.flow"
import { flowRegistry } from "@/lib/telegram/engine/flowRegistry"
import { getTelegramSession, clearTelegramSession } from "../flows/sessionStore"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { TelegramContext } from "@/types/telegram"

export async function handleFlow(ctx: TelegramContext): Promise<boolean> {
    if (ctx.text === "/cancel") return false

    const session = await getTelegramSession(ctx.chatId)
    if (!session) return false

    // TTL check
    if (session.expiresAt.toMillis() < Date.now()) {
        await clearTelegramSession(ctx.chatId)
        await sendTelegramMessage(ctx.chatId, "⌛ Session expired. Please start again.")
        return true
    }

    const handler = flowRegistry[session.flow]

    if (!handler) {
        await clearTelegramSession(ctx.chatId)
        await sendTelegramMessage(ctx.chatId, "⚠️ Unknown action. Please start again.")
        return true
    }

    await handler(ctx, session)
    return true
}
