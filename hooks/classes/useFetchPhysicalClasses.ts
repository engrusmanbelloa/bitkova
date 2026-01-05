// hooks/classes/useFetchPhysicalClasses.ts
import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { PhysicalClass } from "@/types/classTypes"

function convertPhysicalClassDoc(doc: any): PhysicalClass {
    const data = doc.data()

    return {
        id: doc.id,
        name: data.name || "",
        location: data.location || "",
        cohortId: data.cohortId || "",
        price: data.price || 0,
        capacity: data.capacity || 0,
        enrolled: data.enrolled || 0,
        telegramGroupId: data.telegramGroupId || "",
        schedule: data.schedule,
        instructors: data.instructors || [],
        courses: data.courses || [],
        mapLink: data.mapLink,
    }
}

export function useFetchPhysicalClasses(cohortId?: string) {
    return useQuery({
        queryKey: ["physicalClasses", cohortId],
        queryFn: async () => {
            if (!cohortId) {
                // console.log("⏭️ Skipping physical classes fetch - no cohort ID")
                return []
            }

            // console.log("🔍 Fetching physical classes for cohort:", cohortId)

            try {
                const q = query(
                    collection(db, "physicalClasses"),
                    where("cohortId", "==", cohortId),
                )

                const snapshot = await getDocs(q)

                // console.log("📊 Physical classes found:", snapshot.size)

                if (snapshot.empty) {
                    // console.warn("⚠️ No physical classes for this cohort")
                    return []
                }

                const classes = snapshot.docs.map(convertPhysicalClassDoc)

                // console.log("✅ Physical classes loaded:", classes.length)
                return classes
            } catch (error) {
                // console.error("❌ Error fetching physical classes:", error)
                throw error
            }
        },
        enabled: !!cohortId,
        retry: 2,
        staleTime: 5 * 60 * 1000,
    })
}
