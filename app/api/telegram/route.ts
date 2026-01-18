// app/api/telegram/route.ts
import { NextRequest, NextResponse } from "next/server"
import { commandRegistry } from "@/lib/telegram/registry"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { TelegramContext } from "@/types/telegram"
import { db } from "@/lib/firebase/firebaseConfig"
import { doc, setDoc, deleteDoc } from "firebase/firestore"

export async function GET() {
    return new Response("Telegram webhook running ✅", { status: 200 })
}

export async function POST(req: NextRequest) {
    try {
        const update = await req.json()
        const message = update.message
        // let message = update.message || update.edited_message || update.callback_query?.message
        // console.log("Incoming update:", JSON.stringify(update, null, 2))

        if (!message) return NextResponse.json({ ok: true })
        if (message.from?.is_bot) return NextResponse.json({ ok: true })

        // 1. AUTO-SAVE GROUP INFO
        // We do this first to ensure we track the group even if no command is issued
        if (message.chat?.type === "group" || message.chat?.type === "supergroup") {
            const chatId = message.chat.id
            const title = message.chat.title

            if (message.migrate_to_chat_id) {
                const oldId = String(message.chat.id)
                const newId = String(message.migrate_to_chat_id)

                await setDoc(
                    doc(db, "telegramGroups", oldId),
                    {
                        chatId: oldId,
                        migratedTo: newId,
                        deprecated: true,
                        lastActive: new Date(),
                    },
                    { merge: true },
                )

                // Save / update new supergroup
                await setDoc(
                    doc(db, "telegramGroups", newId),
                    {
                        chatId: newId,
                        title: message.chat.title,
                        type: "supergroup",
                        lastActive: new Date(),
                    },
                    { merge: true },
                )

                return NextResponse.json({ ok: true })
            }
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

        // console.log("CTX:", ctx)

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
