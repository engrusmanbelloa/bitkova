// lib/server/payments/logPayment.ts

import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/client"

export async function logPayment({
    reference,
    amount,
    email,
    metadata,
    channel,
}: {
    reference: string
    amount: number
    email: string
    metadata: any
    channel: string
}) {
    const ref = doc(db, "payments", reference)

    await setDoc(
        ref,
        {
            reference,
            amount,
            email,
            channel,
            metadata,
            status: "success",
            createdAt: serverTimestamp(),
        },
        { merge: true }, // idempotent
    )
}
