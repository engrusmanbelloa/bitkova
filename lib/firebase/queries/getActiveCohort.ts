// lib/firebase/queries/getActiveCohort.ts
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { Cohort } from "@/types/classTypes"

export async function getActiveCohort(): Promise<Cohort | null> {
    const now = new Date()

    const q = query(
        collection(db, "cohorts"),
        where("status", "==", "active"),
        where("registrationClose", ">", now),
        orderBy("registrationClose", "asc"),
        limit(1),
    )

    const snapshot = await getDocs(q)

    if (snapshot.empty) return null

    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() } as Cohort
}
