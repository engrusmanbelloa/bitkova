import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { useQuery } from "@tanstack/react-query"

export type TelegramGroup = {
    chatId: string
    title: string
}

export function useFetchTelegramGroups() {
    return useQuery({
        queryKey: ["telegramGroups"],
        queryFn: async (): Promise<TelegramGroup[]> => {
            const q = query(collection(db, "telegramGroups"), orderBy("title"))
            const snap = await getDocs(q)

            return snap.docs
                .map((doc) => doc.data())
                .filter((g) => !g.deprecated)
                .map((g) => ({
                    chatId: String(g.chatId),
                    title: g.title,
                }))

            // return snap.docs.map((doc) => {
            //     const data = doc.data()
            //     return {
            //         chatId: String(data.chatId), // normalize for Select
            //         title: data.title,
            //     }
            // })
        },
        staleTime: 1000 * 60 * 2, // 2 minutes
    })
}
