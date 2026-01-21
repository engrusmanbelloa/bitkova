// lib/telegram/services/getActiveClasses.ts
import { adminDb } from "@/lib/firebase/admin"

export async function getActiveClasses() {
    // 1️⃣ Active cohort
    const cohortSnap = await adminDb
        .collection("cohorts")
        .where("status", "==", "active")
        .limit(1)
        .get()

    if (cohortSnap.empty) return null

    const cohort = {
        id: cohortSnap.docs[0].id,
        ...cohortSnap.docs[0].data(),
    }

    // 2️⃣ Telegram classes
    const tgSnap = await adminDb
        .collection("telegramClasses")
        .where("cohortId", "==", cohort.id)
        .get()

    // 3️⃣ Physical classes
    const phySnap = await adminDb
        .collection("physicalClasses")
        .where("cohortId", "==", cohort.id)
        .get()

    return {
        cohort,
        telegram: tgSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
        physical: phySnap.docs.map((d) => ({ id: d.id, ...d.data() })),
    }
}
