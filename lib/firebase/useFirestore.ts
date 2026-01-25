"use client"

import { db } from "@/lib/firebase/client"

export function useFirestore() {
    if (!db) {
        throw new Error(
            "Firestore client is not available on the server. " + "Use Firebase Admin SDK instead.",
        )
    }

    return db
}
