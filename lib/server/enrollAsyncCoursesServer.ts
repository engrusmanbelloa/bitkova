// lib/server/enrollAsyncCoursesServer.ts
import { db } from "@/lib/firebase/firebaseConfig"
import { doc, writeBatch, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { Enrollment } from "@/types/userType"
export async function enrollAsyncCoursesServer({
    userId,
    courseIds,
    paymentReference,
}: {
    userId: string
    courseIds: string[]
    paymentReference: string
}) {
    const batch = writeBatch(db)
    const now = new Date()

    for (const courseId of courseIds) {
        const enrollmentId = `${userId}-${courseId}`

        // ✅ Idempotency check
        const existing = await getDoc(doc(db, "asyncCourseEnrollments", enrollmentId))
        if (existing.exists()) continue

        // ✅ Course enrollment record
        const enrolledRecordRef = doc(db, "asyncCourseEnrollments", enrollmentId)
        const asyncCourseEnrollRecord: Enrollment = {
            id: enrollmentId,
            userId,
            itemId: courseId,
            itemType: "async_course",
            paymentReference,
            completedLessons: 0,
            progress: 0,
            status: "in progress",
            enrolledAt: now,
        }
        batch.set(enrolledRecordRef, asyncCourseEnrollRecord)

        // ✅ Unified enrollment (for dashboards, receipts, history)
        const enrollment: Enrollment = {
            id: enrollmentId,
            userId: userId,
            itemId: courseId,
            itemType: "async_course",
            paymentReference: paymentReference,
            completedLessons: 0,
            progress: 0,
            status: "in progress",
            enrolledAt: new Date(),
        }
        batch.set(doc(db, "users", userId, "enrolledCourses", enrollmentId), enrollment)
        // const enrolledCourseRef = doc(db, "users", userId, "enrolledCourses", enrollmentId)
        // const enrolledCourse: Enrollment = {
        //     userId,
        //     id: enrollmentId,
        //     completedLessons: 0,
        //     progress: 0,
        //     itemId: courseId,
        //     status: "in progress",
        //     enrolledAt: now,
        //     itemType: "async_course",
        //     paymentReference,
        // }
        // batch.set(enrolledCourseRef, enrolledCourse)
    }

    await batch.commit()
}
