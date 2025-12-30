// lib/server/enrollAsyncCoursesServer.ts
import { db } from "@/lib/firebase/firebaseConfig"
import { doc, writeBatch, getDoc, serverTimestamp } from "firebase/firestore"
import { EnrolledCourse, asyncCourseEnrollmentsType } from "@/types/userType"
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
        const asyncCourseEnrollRecord: asyncCourseEnrollmentsType = {
            enrollmentId,
            userId,
            courseId,
            paymentReference,
            completedLessons: 0,
            progress: 0,
            status: "in_progress",
            enrolledAt: now,
        }
        batch.set(enrolledRecordRef, asyncCourseEnrollRecord)

        // ✅ Unified enrollment (for dashboards, receipts, history)
        const enrolledCourseRef = doc(db, "users", userId, "enrolledCourses", courseId)
        const enrolledCourse: EnrolledCourse = {
            userId,
            courseId,
            completedLessons: 0,
            progress: 0,
            status: "in progress",
            enrolledAt: now,
            type: "async_course",
            paymentReference,
        }
        batch.set(enrolledCourseRef, enrolledCourse)
    }

    await batch.commit()
}
