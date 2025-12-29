// lib/telegram/inviteLink.ts
const TELEGRAM_API = "https://api.telegram.org"

export async function createTelegramInviteLink(chatId: string, userName: string): Promise<string> {
    const token = process.env.TELEGRAM_BOT_TOKEN

    if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN")

    const url = `${TELEGRAM_API}/bot${token}/createChatInviteLink`

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            name: `Student-${userName}`,
            member_limit: 1, // Single use
            expiration_date: 0, // it never expire
        }),
    })

    const data = await response.json()

    if (!data.ok) {
        throw new Error(`Telegram API error: ${data.description}`)
    }

    return data.result.invite_link
}
