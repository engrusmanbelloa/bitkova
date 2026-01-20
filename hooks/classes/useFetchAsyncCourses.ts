import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase/client"

export type AsyncCourse = {
    id: string
    title: string
}

export function useFetchAsyncCourses() {
    return useQuery({
        queryKey: ["asyncCourses"],
        queryFn: async (): Promise<AsyncCourse[]> => {
            const snap = await getDocs(query(collection(db, "courses"), orderBy("title")))
            return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
        },
        staleTime: 5 * 60 * 1000,
    })
}
