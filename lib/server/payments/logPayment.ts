// lib/server/payments/logPayment.ts
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"

export async function logPaymentAdmin(data: {
    reference: string
    amount: number
    email: string
    metadata: any
    channel: string
}) {
    await adminDb
        .collection("payments")
        .doc(data.reference)
        .set(
            {
                ...data,
                status: "success",
                createdAt: FieldValue.serverTimestamp(),
            },
            { merge: true },
        )
}
