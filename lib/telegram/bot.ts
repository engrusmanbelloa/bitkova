// lib/telegram/bot.ts
const TELEGRAM_API = "https://api.telegram.org"

export async function sendTelegramMessage(
    chatId: number,
    text: string,
    options?: {
        reply_markup?: any
        parse_mode?: "Markdown" | "HTML"
    },
) {
    const token = process.env.TELEGRAM_BOT_TOKEN
    if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN")

    const url = `https://api.telegram.org/bot${token}/sendMessage`

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: options?.parse_mode ?? "Markdown",
            reply_markup: options?.reply_markup,
        }),
    })
}
