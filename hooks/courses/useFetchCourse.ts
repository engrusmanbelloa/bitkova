import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { Course, Review, Module, Lesson, CourseWithExtras, Facilitator } from "@/types"
import { useQuery } from "@tanstack/react-query"

const fetchCourses = async (): Promise<CourseWithExtras[]> => {
    const querySnap = await getDocs(collection(db, "courses"))
    return querySnap.docs.map((doc) => doc.data() as CourseWithExtras)
}

export const useFetchCourses = () =>
    useQuery({
        queryKey: ["courses"],
        queryFn: fetchCourses,
    })
