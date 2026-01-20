// lib/telegram/services/getAvailableClasses.ts
import { getActiveCohort } from "@/lib/firebase/queries/getActiveCohort"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { adminDb } from "@/lib/firebase/admin"

export async function getAvailableClasses() {
    const cohortSnap = await adminDb
        .collection("cohorts")
        .where("status", "==", "active")
        .orderBy("registrationClose", "asc")
        .limit(1)
        .get()

    if (cohortSnap.empty) return null

    const cohortDoc = cohortSnap.docs[0]
    const cohort = { id: cohortDoc.id, ...cohortDoc.data() }

    const [tgSnap, physicalSnap] = await Promise.all([
        adminDb.collection("telegramClasses").where("cohortId", "==", cohort.id).get(),
        adminDb.collection("physicalClasses").where("cohortId", "==", cohort.id).get(),
    ])

    return {
        cohort,
        telegramClasses: tgSnap.docs.map((d) => ({ id: d.id, ...d.data(), type: "telegram" })),
        physicalClasses: physicalSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            type: "physical",
        })),
    }
}

// export async function getAvailableClasses() {
//     const cohort = await getActiveCohort()
//     if (!cohort) return null

//     const [tgSnap, physicalSnap] = await Promise.all([
//         getDocs(query(collection(db, "telegramClasses"), where("cohortId", "==", cohort.id))),
//         getDocs(query(collection(db, "physicalClasses"), where("cohortId", "==", cohort.id))),
//     ])

//     const telegramClasses = tgSnap.docs.map((d) => ({
//         id: d.id,
//         ...d.data(),
//         type: "telegram",
//     }))

//     const physicalClasses = physicalSnap.docs.map((d) => ({
//         id: d.id,
//         ...d.data(),
//         type: "physical",
//     }))

//     return {
//         cohort,
//         telegramClasses,
//         physicalClasses,
//     }
// }
