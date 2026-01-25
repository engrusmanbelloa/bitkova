// lib/firebase/queries/getPhysicalClasses.ts
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { PhysicalClass } from "@/types/classTypes"

export async function getPhysicalClassesByCohort(cohortId: string): Promise<PhysicalClass[]> {
    const q = query(collection(db!, "physicalClasses"), where("cohortId", "==", cohortId))

    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as PhysicalClass[]
}
