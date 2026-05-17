// lib/firebase/uploads/createClassCertificate.ts
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { nanoid } from "@/hooks/certId"

export const createClassCertificate = async (
    userId: string,
    //  classId: string,
    enrollmentId: string, // already formed: e.g. the enrollment doc id
    classType: "physical_class" | "telegram_class",
): Promise<string> => {
    // Check if certificate already exists on the enrollment
    //  const enrollmentId = `${userId}-${classId}`
    const enrollmentRef = doc(db!, "enrollments", enrollmentId)
    const enrollmentSnap = await getDoc(enrollmentRef)

    if (!enrollmentSnap.exists()) throw new Error("Enrollment not found")

    const existing = enrollmentSnap.data()
    if (existing?.certificateId) return existing.certificateId // idempotent

    const certificateId = nanoid()
    const now = new Date()

    await updateDoc(enrollmentRef, {
        status: "completed",
        completedAt: now,
        certificateId,
    })

    const certificateRef = doc(db!, "users", userId, "certificates", certificateId)
    await setDoc(certificateRef, {
        id: certificateId,
        userId,
        enrollmentId,
        classType,
        issuedAt: now,
    })

    return certificateId
}
