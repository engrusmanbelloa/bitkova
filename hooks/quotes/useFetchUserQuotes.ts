// hooks/quotes/useFetchUserQuotes.ts
import { useQuery } from "@tanstack/react-query"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { QuoteRequest } from "@/types/quotes/quoteTypes"
import { toDate } from "@/utils/formatDate"

export function useFetchUserQuotes(userId?: string) {
    return useQuery({
        queryKey: ["userQuotes", userId],
        queryFn: async () => {
            const q = query(
                collection(db!, "quoteRequests"),
                where("userId", "==", userId!),
                orderBy("createdAt", "desc"),
            )
            const snap = await getDocs(q)
            return snap.docs.map((d) => {
                const data = d.data()
                return {
                    ...data,
                    createdAt: toDate(data.createdAt),
                    updatedAt: toDate(data.updatedAt),
                    quotedAt: toDate(data.quotedAt),
                    commitmentPaidAt: toDate(data.commitmentPaidAt),
                    balancePaidAt: toDate(data.balancePaidAt),
                } as QuoteRequest
            })
        },
        enabled: !!userId,
        staleTime: 2 * 60 * 1000,
    })
}
