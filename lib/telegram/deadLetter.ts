import { adminDb } from "@/lib/firebase/admin"

export async function pushDeadLetter(update: any, error: unknown) {
    await adminDb.collection("telegramDeadLetters").add({
        update,
        error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
        createdAt: new Date(),
    })
}
