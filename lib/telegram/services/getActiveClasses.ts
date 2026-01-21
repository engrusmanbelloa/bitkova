// lib/telegram/services/getActiveClasses.ts
import { adminDb } from "@/lib/firebase/admin"
import { Cohort, PhysicalClass, TelegramClass } from "@/types/classTypes"

type TelegramClassWithType = TelegramClass & { type: "telegram" }
type PhysicalClassWithType = PhysicalClass & { type: "physical" }

export async function getActiveClasses(): Promise<{
    cohort: Cohort
    classes: (TelegramClassWithType | PhysicalClassWithType)[]
} | null> {
    // 1️⃣ Active cohort
    const cohortSnap = await adminDb
        .collection("cohorts")
        .where("status", "==", "active")
        .limit(1)
        .get()

    if (cohortSnap.empty) return null

    const cohortDoc = cohortSnap.docs[0]

    const cohort: Cohort = {
        id: cohortDoc.id,
        ...(cohortDoc.data() as Omit<Cohort, "id">),
    }

    // 2️⃣ Telegram classes
    const telegramSnap = await adminDb
        .collection("telegramClasses")
        .where("cohortId", "==", cohort.id)
        .get()

    const telegramClasses: TelegramClassWithType[] = telegramSnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<TelegramClass, "id">),
        type: "telegram",
    }))

    // 3️⃣ Physical classes
    const physicalSnap = await adminDb
        .collection("physicalClasses")
        .where("cohortId", "==", cohort.id)
        .get()

    const physicalClasses: PhysicalClassWithType[] = physicalSnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<PhysicalClass, "id">),
        type: "physical",
    }))

    return {
        cohort,
        classes: [...telegramClasses, ...physicalClasses],
    }
}
