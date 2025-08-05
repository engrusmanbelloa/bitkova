import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { Course, Review, Module, Lesson, CourseWithExtras, Facilitator } from "@/types"
import { useQuery } from "@tanstack/react-query"

// export const fetchCourses = async (): Promise<CourseWithExtras[]> => {
//     const querySnap = await getDocs(collection(db, "courses"))
//     return querySnap.docs.map((doc) => doc.data() as CourseWithExtras)
// }

// export const useCourses = () =>
//     useQuery({
//         queryKey: ["courses"],
//         queryFn: fetchCourses,
//     })

// fetchCourseReviews
export const fetchCourseReviews = async (courseId: string): Promise<Review[]> => {
    const q = query(collection(db, "courseReviews"), where("courseId", "==", courseId))
    const snap = await getDocs(q)
    return snap.docs.map((doc) => doc.data() as Review)
}
