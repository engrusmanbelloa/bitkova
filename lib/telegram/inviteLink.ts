// lib/telegram/inviteLink.ts
import { setTimeout as delay } from "timers/promises"
const TELEGRAM_API = "https://api.telegram.org"

export async function createTelegramInviteLink(
    chatId: string,
    userName: string,
): Promise<string | null> {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 7_000) // 7s max

    if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN")

    const url = `${TELEGRAM_API}/bot${token}/createChatInviteLink`
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                name: `Student-${userName}`,
                member_limit: 1, // Single use
            }),
        })

        const data = await response.json()

        if (!data.ok) {
            throw new Error(`Telegram API error: ${data.description}`)
        }

        return data.result.invite_link
    } catch (err) {
        console.error("❌ Telegram invite link failed:", err)
        return null // VERY IMPORTANT
    } finally {
        clearTimeout(timeout)
    }
}
