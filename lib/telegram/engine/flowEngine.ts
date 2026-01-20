// lib/telegram/engine/flowEngine.ts
import { doc, getDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { statusFlow } from "../flows/status.flow"
import { flowRegistry } from "@/lib/telegram/engine/flowRegistry"
import { getTelegramSession, clearTelegramSession } from "../flows/sessionStore"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export async function handleFlow(ctx: any): Promise<boolean> {
    // Global cancel
    if (ctx.text === "/cancel") {
        await clearTelegramSession(ctx.chatId)
        await sendTelegramMessage(ctx.chatId, "❌ Action cancelled.")
        return true
    }

    //  const ref = doc(db, "telegramSessions", String(ctx.chatId))
    //  const snap = await getDoc(ref)

    //  if (!snap.exists()) return false

    const session = await getTelegramSession(ctx.chatId)
    if (!session) return false

    //  const session = snap.data()

    // TTL check
    //  if (Date.now() > session.expiresAt) {
    //      await deleteDoc(ref)
    //      return false
    //  }

    // TTL check
    if (session.expiresAt.toMillis() < Date.now()) {
        await clearTelegramSession(ctx.chatId)
        await sendTelegramMessage(ctx.chatId, "⌛ Session expired. Please start again.")
        return true
    }

    switch (session.flow) {
        case "status":
            await statusFlow(ctx, session)
            return true
        default:
            return false
    }

    //  const handler = flowRegistry[session.flow]
    //  if (!handler) {
    //      await deleteDoc(ref)
    //      return false
    //  }

    //  await handler(ctx, session)
    //  return true
}
