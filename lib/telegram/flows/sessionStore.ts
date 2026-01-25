// lib/telegram/flows/sessionStore.ts
import { adminDb } from "@/lib/firebase/admin"
import { FlowSession } from "@/types/telegram"

function isValidFlowSession(data: any): data is FlowSession {
    return typeof data?.flow === "string" && data?.expiresAt?.toMillis
}

// export async function getTelegramSession(chatId: number): Promise<FlowSession | null> {
//     const ref = doc(db!, COLLECTION, String(chatId))
//     const snap = await getDoc(ref)

//     if (!snap.exists()) return null

//     const data = snap.data()
//     if (!isValidFlowSession(data)) return null
//     return data
// }

// export async function setTelegramSession(chatId: number, session: FlowSession) {
//     const ref = doc(db!, COLLECTION, String(chatId))
//     await setDoc(ref, session)
// }

// export async function clearTelegramSession(chatId: number) {
//     const ref = doc(db!, COLLECTION, String(chatId))
//     await deleteDoc(ref)
// }

export async function getTelegramSession(chatId: number) {
    const snap = await adminDb.collection("telegramSessions").doc(String(chatId)).get()

    if (!snap.exists) return null
    return snap.data() as FlowSession
}

export async function setTelegramSession(chatId: number, session: FlowSession) {
    await adminDb.collection("telegramSessions").doc(String(chatId)).set(session)
}

export async function clearTelegramSession(chatId: number) {
    await adminDb.collection("telegramSessions").doc(String(chatId)).delete()
}
