import { NextRequest, NextResponse } from "next/server"
import { commandRegistry } from "@/lib/telegram/registry"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { TelegramContext } from "@/types/telegram"

export async function GET() {
    return new Response("Telegram webhook running ✅", { status: 200 })
}

export async function POST(req: NextRequest) {
    try {
        const update = await req.json()
        const message = update.message

        if (!message?.text) {
            return NextResponse.json({ ok: true })
        }

        const ctx: TelegramContext = {
            chatId: message.chat.id,
            text: message.text.trim(),
            from: {
                id: message.from.id,
                username: message.from.username,
            },
        }

        const handler = commandRegistry[ctx.text]

        if (!handler) {
            await sendTelegramMessage(
                ctx.chatId,
                `❓ Unknown command.\n\nType /help to see available commands.`,
            )
            return NextResponse.json({ ok: true })
        }

        await handler(ctx)
        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error("Telegram Webhook Error:", error)
        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}
