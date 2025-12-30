// app/api/telegram/route.ts
import { NextRequest, NextResponse } from "next/server"
import { commandRegistry } from "@/lib/telegram/registry"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { TelegramContext } from "@/types/telegram"
import { db } from "@/lib/firebase/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"

export async function GET() {
    return new Response("Telegram webhook running ✅", { status: 200 })
}

export async function POST(req: NextRequest) {
    try {
        const update = await req.json()
        const message = update.message

        if (!message) return NextResponse.json({ ok: true })
        if (message.from?.is_bot) return NextResponse.json({ ok: true })

        // 1. AUTO-SAVE GROUP INFO
        // We do this first to ensure we track the group even if no command is issued
        if (message.chat?.type === "group" || message.chat?.type === "supergroup") {
            const chatId = message.chat.id
            const title = message.chat.title

            // Using chatId as the Doc ID prevents redundant "groups"
            // It simply updates the existing record for this specific group
            await setDoc(
                doc(db, "telegramGroups", String(chatId)),
                {
                    chatId,
                    title,
                    lastActive: new Date(), // Useful for tracking bot usage
                    type: message.chat.type,
                },
                { merge: true },
            )
        }

        // 2. COMMAND PROCESSING
        if (!message.text) return NextResponse.json({ ok: true })

        const fullText = message.text.trim()
        const firstWord = fullText.split(" ")[0]

        // Strip bot username (e.g., /start@MyBot -> /start)
        const cleanCommand = firstWord.split("@")[0]

        const ctx: TelegramContext = {
            chatId: message.chat.id,
            text: fullText,
            from: {
                id: message.from.id,
                username: message.from.username,
            },
        }

        const handler = commandRegistry[cleanCommand]

        if (!handler) {
            if (message.chat.type === "private") {
                await sendTelegramMessage(
                    ctx.chatId,
                    `❓ Unknown command.\n\nType /help to see available commands.`,
                )
            }
            return NextResponse.json({ ok: true })
        }

        await handler(ctx)
        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error("Telegram Webhook Error:", error)
        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}
