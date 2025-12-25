const TELEGRAM_API = "https://api.telegram.org"

export async function sendTelegramMessage(chatId: number, text: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN

    if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN")

    const url = `${TELEGRAM_API}/bot${token}/sendMessage`

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "Markdown",
        }),
    })
}
