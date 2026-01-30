// lib/server/enrollAsyncCoursesServer.ts
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import { rewardReferrer } from "@/lib/firebase/uploads/referralRewards"
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
    const batch = adminDb.batch()
    const now = new Date()

    for (const courseId of courseIds) {
        const enrollmentId = `${userId}-${courseId}`

        // ✅ Idempotency check
        const ref = adminDb.collection("enrollments").doc(enrollmentId)
        if ((await ref.get()).exists) continue

        // ✅ Course enrollment record and Create enrollment
        batch.set(ref, {
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
        })
        // ✅ award the referrer with 100xp for async course
        await rewardReferrer(userId, 100)
        // ✅ Increment course student count
        batch.update(adminDb.collection("courses").doc(courseId), {
            students: FieldValue.increment(1),
        })
    }

    await batch.commit()
}
