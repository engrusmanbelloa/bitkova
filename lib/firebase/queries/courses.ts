import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { Course, Review } from "@/types"

export const fetchCourses = async (): Promise<Course[]> => {
    const querySnap = await getDocs(collection(db, "courses"))
    return querySnap.docs.map((doc) => doc.data() as Course)
}

// fetchCourseReviews
export const fetchCourseReviews = async (courseId: string): Promise<Review[]> => {
    const q = query(collection(db, "courseReviews"), where("courseId", "==", courseId))
    const snap = await getDocs(q)
    return snap.docs.map((doc) => doc.data() as Review)
}
