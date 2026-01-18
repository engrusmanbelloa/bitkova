// lib/telegram/services/findEnrollmentByRecovery.ts

import { collection, getDocs, query, where, limit } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"

export async function findEnrollmentByRecovery(input: string) {
    const enrollmentsRef = collection(db, "enrollments")

    // Email lookup
    if (input.includes("@")) {
        const snap = await getDocs(
            query(enrollmentsRef, where("payerEmail", "==", input), limit(1)),
        )
        return snap.docs[0]?.data() ?? null
    }

    // Payment reference lookup
    const snap = await getDocs(
        query(enrollmentsRef, where("paymentReference", "==", input), limit(1)),
    )

    return snap.docs[0]?.data() ?? null
}
