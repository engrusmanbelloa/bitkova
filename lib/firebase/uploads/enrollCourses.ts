import { doc, setDoc, writeBatch, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { removeFromCartDb } from "@/lib/firebase/queries/cart"
import { EnrolledCourse } from "@/userType"

export const enrollCourses = async (userId: string, courseId: string[]) => {
    const batch = writeBatch(db)
    const now = new Date()

    courseId.forEach((courseId) => {
        const enrolledCourseRef = doc(db, "users", userId, "enrolledCourses", courseId)
        const enrolledCourse: EnrolledCourse = {
            userId,
            courseId,
            completedLessons: 0,
            progress: 0,
            status: "in progress",
            enrolledAt: now,
            updatedAt: now,
        }
        batch.set(enrolledCourseRef, enrolledCourse)
    })
    // courseId.forEach((id) => removeFromCartDb(userId, id))

    await batch.commit()
}
