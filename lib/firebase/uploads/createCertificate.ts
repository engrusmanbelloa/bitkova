// lib/firebase/uploads/createCertificate.ts
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { nanoid } from "@/hooks/certId"

type AsyncCourseParams = {
    type: "async_course"
    userId: string
    courseId: string
}

type SyncClassParams = {
    type: "physical_class" | "telegram_class"
    userId: string
    enrollmentId: string
}

type CreateCertificateParams = AsyncCourseParams | SyncClassParams

export const createCertificate = async (params: CreateCertificateParams): Promise<string> => {
    const now = new Date()
    const certificateId = nanoid()

    if (params.type === "async_course") {
        const { userId, courseId } = params
        const enrollmentId = `${userId}-${courseId}`
        const enrollmentRef = doc(db!, "enrollments", enrollmentId)

        await updateDoc(enrollmentRef, {
            status: "completed",
            completedAt: now,
            certificateId,
        })

        await setDoc(doc(db!, "users", userId, "certificates", certificateId), {
            id: certificateId,
            userId,
            courseId,
            issuedAt: now,
        })

        return certificateId
    }

    // sync class (physical or telegram)
    const { userId, enrollmentId, type } = params
    const enrollmentRef = doc(db!, "enrollments", enrollmentId)
    const enrollmentSnap = await getDoc(enrollmentRef)

    if (!enrollmentSnap.exists()) throw new Error("Enrollment not found")

    const existing = enrollmentSnap.data()
    if (existing?.certificateId) return existing.certificateId // idempotent

    await updateDoc(enrollmentRef, {
        status: "completed",
        completedAt: now,
        certificateId,
    })

    await setDoc(doc(db!, "users", userId, "certificates", certificateId), {
        id: certificateId,
        userId,
        enrollmentId,
        classType: type,
        issuedAt: now,
    })

    return certificateId
}
