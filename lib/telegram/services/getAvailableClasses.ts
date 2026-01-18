// lib/telegram/services/getAvailableClasses.ts
import { getActiveCohort } from "@/lib/firebase/queries/getActiveCohort"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"

export async function getAvailableClasses() {
    const cohort = await getActiveCohort()
    if (!cohort) return null

    const [tgSnap, physicalSnap] = await Promise.all([
        getDocs(query(collection(db, "telegramClasses"), where("cohortId", "==", cohort.id))),
        getDocs(query(collection(db, "physicalClasses"), where("cohortId", "==", cohort.id))),
    ])

    const telegramClasses = tgSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        type: "telegram",
    }))

    const physicalClasses = physicalSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        type: "physical",
    }))

    return {
        cohort,
        telegramClasses,
        physicalClasses,
    }
}
