// lib/server/enrollAsyncCoursesServer.ts
import { db } from "@/lib/firebase/firebaseConfig"
import { doc, writeBatch, getDoc, increment, setDoc, serverTimestamp } from "firebase/firestore"
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
        const existing = await getDoc(doc(db, "enrollments", enrollmentId))
        if (existing.exists()) continue

        // ✅ Course enrollment record
        const enrollmentRef = doc(db, "enrollments", enrollmentId)

        const enrollment: Enrollment = {
            id: enrollmentId,
            userId,
            itemId: courseId,
            itemType: "async_course",
            paymentReference,
            status: "in progress",
            enrolledAt: now,
            progress: 0,
            completedLessons: 0,
            completedVideos: [],
        }

        // ✅ Create enrollment
        batch.set(enrollmentRef, enrollment)

        // ✅ Increment course student count
        batch.update(doc(db, "courses", courseId), {
            students: increment(1),
        })
    }

    await batch.commit()
}
