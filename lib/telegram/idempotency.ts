import { adminDb } from "@/lib/firebase/admin"

const COLLECTION = "telegramProcessedUpdates"

export async function isDuplicateUpdate(updateId: number): Promise<boolean> {
    const ref = adminDb.collection(COLLECTION).doc(String(updateId))
    const snap = await ref.get()

    if (snap.exists) return true

    await ref.set({
        processedAt: new Date(),
    })

    return false
}
