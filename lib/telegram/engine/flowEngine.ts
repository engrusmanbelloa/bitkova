import { doc, getDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { flowRegistry } from "@/lib/telegram/engine/flowRegistry"

export async function handleFlow(ctx: any): Promise<boolean> {
    const ref = doc(db, "telegramSessions", String(ctx.chatId))
    const snap = await getDoc(ref)

    if (!snap.exists()) return false

    const session = snap.data()

    // TTL check
    if (Date.now() > session.expiresAt) {
        await deleteDoc(ref)
        return false
    }

    const handler = flowRegistry[session.flow]
    if (!handler) {
        await deleteDoc(ref)
        return false
    }

    await handler(ctx, session)
    return true
}
