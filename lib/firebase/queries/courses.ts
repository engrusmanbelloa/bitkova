import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { Review } from "@/types"

// fetchCourseReviews
export const fetchCourseReviews = async (courseId: string): Promise<Review[]> => {
    const q = query(collection(db, "courseReviews"), where("courseId", "==", courseId))
    const snap = await getDocs(q)
    return snap.docs.map((doc) => doc.data() as Review)
}
