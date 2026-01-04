// lib/firebase/uploads/enrollCourses.ts
import { doc, setDoc, writeBatch, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { removeFromCartDb } from "@/lib/firebase/queries/cart"
import { Enrollment } from "@/types/userType"

export const enrollCourses = async (userId: string, courseId: string[]) => {
    const batch = writeBatch(db)
    const now = new Date()

    courseId.forEach((courseId) => {
        const enrolledCourseRef = doc(db, "users", userId, "enrolledCourses", courseId)
        const enrolledCourse: Enrollment = {
            id: `${userId}-${courseId}`,
            userId,
            itemId: courseId,
            completedLessons: 0,
            progress: 0,
            status: "in progress",
            enrolledAt: now,
            itemType: "async_course",
            paymentReference: "",
        }
        batch.set(enrolledCourseRef, enrolledCourse)
    })
    // courseId.forEach((id) => removeFromCartDb(userId, id))

    await batch.commit()
}
