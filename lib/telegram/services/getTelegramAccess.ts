// lib/telegram/services/getTelegramAccess.ts
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"

export async function getTelegramAccess(telegramUserId: number) {
    const snap = await getDocs(
        query(
            collection(db, "enrollments"),
            where("telegramUserId", "==", telegramUserId),
            where("telegramAccess", "==", true),
            where("status", "==", "active"),
        ),
    )

    return snap.docs.map((d) => ({
        enrollmentId: d.id,
        ...d.data(),
    }))
}
