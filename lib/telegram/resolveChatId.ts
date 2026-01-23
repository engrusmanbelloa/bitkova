import { adminDb } from "@/lib/firebase/admin"

export async function resolveTelegramChatId(chatId: string): Promise<string> {
    if (!chatId) {
        throw new Error("resolveTelegramChatId called with empty chatId")
    }

    const snap = await adminDb.collection("telegramGroups").doc(chatId).get()

    if (!snap.exists) return chatId

    const data = snap.data()

    // Follow migration chain if exists
    if (data?.migratedTo) {
        return resolveTelegramChatId(String(data.migratedTo))
    }

    return chatId
}
