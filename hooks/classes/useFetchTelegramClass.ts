// hooks/classes/useFetchTelegramClass.ts
import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
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
        // modules: data.modules || [],
        telegramGroupId: data.telegramGroupId || "",
        schedule: data.schedule,
    }
}

export function useFetchTelegramClass(cohortId?: string) {
    return useQuery<TelegramClass[]>({
        queryKey: ["telegramClasses", cohortId],
        queryFn: async () => {
            if (!cohortId) return []

            const q = query(collection(db!, "telegramClasses"), where("cohortId", "==", cohortId))

            const snapshot = await getDocs(q)

            if (snapshot.empty) return []

            return snapshot.docs.map(convertTelegramClassDoc)
        },
        enabled: !!cohortId,
        staleTime: 5 * 60 * 1000,
    })
}
