// app/api/telegram/route.ts
import { NextRequest, NextResponse } from "next/server"
import { commandRegistry } from "@/lib/telegram/registry"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { handleFlow } from "@/lib/telegram/engine/flowEngine"
import { TelegramContext } from "@/types/telegram"
import { adminDb } from "@/lib/firebase/admin"
import { telegramLog } from "@/lib/telegram/logger"
import { isDuplicateUpdate } from "@/lib/telegram/idempotency"
import { pushDeadLetter } from "@/lib/telegram/deadLetter"

export async function GET() {
    return new Response("Telegram webhook running ✅", { status: 200 })
}

export async function POST(req: NextRequest) {
    let update: any
    try {
        update = await req.json()

        // 🛑 Idempotency guard
        if (await isDuplicateUpdate(update.update_id)) {
            telegramLog("info", "Duplicate update skipped", {
                updateId: update.update_id,
            })
            return NextResponse.json({ ok: true })
        }

        const message = update.message
        if (!message) return NextResponse.json({ ok: true })
        if (message.from?.is_bot) return NextResponse.json({ ok: true })

        // 1️⃣ AUTO-SAVE GROUP INFO
        if (message.chat?.type === "group" || message.chat?.type === "supergroup") {
            const oldId = String(message.chat.id)

            if (message.migrate_to_chat_id) {
                const newId = String(message.migrate_to_chat_id)

                await adminDb.collection("telegramGroups").doc(oldId).set(
                    {
                        chatId: oldId,
                        migratedTo: newId,
                        deprecated: true,
                        lastActive: new Date(),
                    },
                    { merge: true },
                )

                await adminDb.collection("telegramGroups").doc(newId).set(
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

        // 2️⃣ COMMAND PROCESSING
        if (!message.text) return NextResponse.json({ ok: true })

        const fullText = message.text.trim()
        const cleanCommand = fullText.split(" ")[0].split("@")[0]

        const ctx: TelegramContext = {
            chatId: message.chat.id,
            text: fullText,
            from: {
                id: message.from.id,
                username: message.from.username,
            },
        }

        telegramLog("info", "Incoming message", {
            chatId: ctx.chatId,
            text: ctx.text,
        })

        // Flow engine first
        if (await handleFlow(ctx)) {
            return NextResponse.json({ ok: true })
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
        telegramLog("error", "Webhook failure", { error })

        // ☠️ Dead-letter storage
        if (update) {
            await pushDeadLetter(update, error)
        }
        // return NextResponse.json({ error: "Internal error" }, { status: 500 })
        // Always return 200 or Telegram will retry forever
        return NextResponse.json({ ok: true })
    }
}
