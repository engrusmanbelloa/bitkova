// lib/server/enrollAsyncCoursesServer.ts
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import { Enrollment } from "@/types/userType"
import { rewardReferral } from "../referrals/referralRewards"

interface EnrollAsyncCoursesParams {
    userId: string
    courseIds: string[]
    paymentReference: string
    price: number
}
export async function enrollAsyncCoursesServer({
    userId,
    courseIds,
    paymentReference,
    price,
}: EnrollAsyncCoursesParams) {
    const batch = adminDb.batch()
    const now = new Date()
    const enrolledCourseIds: string[] = []

    for (const courseId of courseIds) {
        const enrollmentId = `${userId}-${courseId}`

        // Idempotency check
        const ref = adminDb.collection("enrollments").doc(enrollmentId)
        if ((await ref.get()).exists) continue

        // Course enrollment record and Create enrollment
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
        // // award the referrer with 100xp for async course
        // await rewardReferral({
        //     buyerId: userId,
        //     price: price,
        //     enrollmentId,
        // })
        // Increment course student count
        batch.update(adminDb.collection("courses").doc(courseId), {
            students: FieldValue.increment(1),
        })

        // track which ones actually got enrolled
        enrolledCourseIds.push(courseId)
    }

    await batch.commit()

    // Reward once per newly enrolled course
    for (const courseId of enrolledCourseIds) {
        try {
            await rewardReferral({
                buyerId: userId,
                price,
                enrollmentId: `${userId}-${courseId}`,
            })
        } catch (err) {
            // console.warn(`rewardReferral failed for ${courseId}:`, err)
        }
    }
}
