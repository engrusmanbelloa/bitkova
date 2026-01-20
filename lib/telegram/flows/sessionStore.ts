import { db } from "@/lib/firebase/firebaseConfig"
import { doc, getDoc, setDoc, deleteDoc, Timestamp } from "firebase/firestore"

const COLLECTION = "telegramSessions"

export async function getTelegramSession(chatId: number) {
    const ref = doc(db, COLLECTION, String(chatId))
    const snap = await getDoc(ref)
    return snap.exists() ? snap.data() : null
}

export async function setTelegramSession(
    chatId: number,
    data: { flow: string; step?: string; ttlMinutes?: number },
) {
    const expiresAt = Timestamp.fromDate(new Date(Date.now() + (data.ttlMinutes ?? 5) * 60 * 1000))

    await setDoc(doc(db, COLLECTION, String(chatId)), {
        flow: data.flow,
        step: data.step ?? null,
        expiresAt,
        createdAt: Timestamp.now(),
    })
}

export async function clearTelegramSession(chatId: number) {
    await deleteDoc(doc(db, COLLECTION, String(chatId)))
}
