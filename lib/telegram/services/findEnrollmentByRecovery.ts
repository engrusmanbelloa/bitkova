// lib/telegram/services/findEnrollmentByRecovery.ts

import { adminDb } from "@/lib/firebase/admin"

export async function findEnrollmentByRecovery(input: string) {
    const enrollmentsRef = adminDb.collection("enrollments")

    // 📧 Email lookup
    if (input.includes("@")) {
        const snap = await enrollmentsRef.where("payerEmail", "==", input).limit(1).get()

        if (snap.empty) return null
        return snap.docs[0].data()
    }

    // Payment reference lookup

    // 💳 Payment reference lookup
    const snap = await enrollmentsRef.where("paymentReference", "==", input).limit(1).get()

    if (snap.empty) return null
    return snap.docs[0].data()

    return snap.docs[0]?.data() ?? null
}
