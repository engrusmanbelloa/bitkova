import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { TelegramClass } from "@/types/classTypes"

function convertTelegramClassDoc(doc: any): TelegramClass {
    const data = doc.data()

    return {
        id: doc.id,
        name: data.name || "",
        cohortId: data.cohortId || "",
        price: data.price || 0,
        capacity: data.capacity || 0,
        enrolled: data.enrolled || 0,
        modules: data.modules || [],
        telegramGroupId: data.telegramGroupId || "",
        schedule: data.schedule,
    }
}

export function useFetchTelegramClass(cohortId?: string) {
    return useQuery({
        queryKey: ["telegramClass", cohortId],
        queryFn: async () => {
            if (!cohortId) {
                console.log("⏭️ Skipping telegram class fetch - no cohort ID")
                return null
            }

            console.log("🔍 Fetching telegram class for cohort:", cohortId)

            try {
                const q = query(
                    collection(db, "telegramClasses"),
                    where("cohortId", "==", cohortId),
                )

                const snapshot = await getDocs(q)

                console.log("📊 Telegram classes found:", snapshot.size)

                if (snapshot.empty) {
                    console.warn("⚠️ No telegram class for this cohort")
                    return null
                }

                const telegramClass = convertTelegramClassDoc(snapshot.docs[0])

                console.log("✅ Telegram class loaded:", telegramClass.name)
                return telegramClass
            } catch (error) {
                console.error("❌ Error fetching telegram class:", error)
                throw error
            }
        },
        enabled: !!cohortId,
        retry: 2,
        staleTime: 5 * 60 * 1000,
    })
}
