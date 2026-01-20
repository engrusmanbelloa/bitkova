// lib/telegram/services/getAvailableClasses.ts
import { adminDb } from "@/lib/firebase/admin"

export async function getAvailableClasses() {
    const now = new Date()

    const cohortSnap = await adminDb.collection("cohorts").where("status", "==", "active").get()

    if (cohortSnap.empty) return null

    const cohorts = cohortSnap.docs
        .map((doc) => {
            const data = doc.data()
            return {
                id: doc.id,
                ...data,
                registrationClose: data.registrationClose?.toDate?.() ?? null,
            }
        })
        .filter((c) => c.registrationClose && c.registrationClose > now)
        .sort((a, b) => a.registrationClose.getTime() - b.registrationClose.getTime())

    if (!cohorts.length) return null

    const cohort = cohorts[0]

    const [tgSnap, physicalSnap] = await Promise.all([
        adminDb.collection("telegramClasses").where("cohortId", "==", cohort.id).get(),
        adminDb.collection("physicalClasses").where("cohortId", "==", cohort.id).get(),
    ])

    return {
        cohort,
        telegramClasses: tgSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            type: "telegram",
        })),
        physicalClasses: physicalSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            type: "physical",
        })),
    }
}
