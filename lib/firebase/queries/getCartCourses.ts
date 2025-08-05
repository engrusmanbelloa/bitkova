import { db } from "@/lib/firebase/firebaseConfig"
import { collection, getDocs, query, where } from "firebase/firestore"
import { CourseWithExtras } from "@/types"

export async function getCartCourses(cartIds: string[]): Promise<CourseWithExtras[]> {
    if (cartIds.length === 0) return []

    const chunkedIds = chunkArray(cartIds, 10) // Firestore limits `in` queries to 10
    const allCourses: CourseWithExtras[] = []

    for (const chunk of chunkedIds) {
        const q = query(collection(db, "courses"), where("id", "in", chunk))

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            allCourses.push({ ...(doc.data() as CourseWithExtras), id: doc.id })
        })
    }

    return allCourses
}

// Helper to chunk array into groups of 10
function chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size))
    }
    return chunks
}
