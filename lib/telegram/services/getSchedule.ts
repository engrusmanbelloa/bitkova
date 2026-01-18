// lib/telegram/services/getSchedule.ts
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"

export async function getSchedule() {
    // Fetch active cohort
    const cohortSnap = await getDocs(query(collection(db, "cohorts"), where("active", "==", true)))
    const cohort = cohortSnap.docs[0]?.data()
    if (!cohort) return null

    // Fetch Telegram and Physical schedules
    const [tgSnap, physicalSnap] = await Promise.all([
        getDocs(query(collection(db, "telegramClasses"), where("cohortId", "==", cohort.id))),
        getDocs(query(collection(db, "physicalClasses"), where("cohortId", "==", cohort.id))),
    ])

    const telegramClasses = tgSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const physicalClasses = physicalSnap.docs.map((d) => ({ id: d.id, ...d.data() }))

    return {
        cohortName: cohort.name,
        telegramClasses,
        physicalClasses,
    }
}
