import { db } from "@/lib/firebase/firebaseConfig"
import { doc, getDoc, setDoc, deleteDoc, Timestamp } from "firebase/firestore"
import { FlowSession } from "@/types/telegram"

const COLLECTION = "telegramSessions"

export async function getTelegramSession(chatId: number): Promise<FlowSession | null> {
    const ref = doc(db, COLLECTION, String(chatId))
    const snap = await getDoc(ref)

    if (!snap.exists()) return null

    return snap.data() as FlowSession
}

export async function setTelegramSession(chatId: number, session: FlowSession) {
    const ref = doc(db, COLLECTION, String(chatId))
    await setDoc(ref, session)
}

export async function clearTelegramSession(chatId: number) {
    const ref = doc(db, COLLECTION, String(chatId))
    await deleteDoc(ref)
}
