import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"

export async function resolveTelegramChatId(chatId: string): Promise<string> {
    if (!chatId) {
        throw new Error("resolveTelegramChatId called with empty chatId")
    }
    const snap = await getDoc(doc(db, "telegramGroups", chatId))

    if (!snap.exists()) return chatId

    const data = snap.data()

    // Follow migration chain if exists
    if (data.migratedTo) {
        return resolveTelegramChatId(String(data.migratedTo))
    }

    return chatId
}
