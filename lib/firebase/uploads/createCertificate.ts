// lib/firebase/uploads/createCertificate.ts
import { doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { nanoid } from "@/hooks/certId"

export const createCertificate = async (userId: string, courseId: string): Promise<string> => {
    try {
        // 1. Generate a new, unique certificate ID using nanoid
        const certificateId = nanoid()
        const enrollmentId = `${userId}-${courseId}`
        const enrollmentRef = doc(db, "enrollments", enrollmentId)

        const now = new Date()

        // 2. Update the enrollment document with completion status and certificate ID
        await updateDoc(enrollmentRef, {
            status: "completed",
            completedAt: now,
            certificateId,
        })

        // 3. Save the certificate and completed course to Firestore under the user's subcollections
        const certificateRef = doc(db, "users", userId, "certificates", certificateId)
        await setDoc(certificateRef, {
            id: certificateId,
            userId,
            courseId,
            issuedAt: now,
        })

        // console.log(
        //     `Certificate and completed course document created for user ${enrollmentId} and course ${certificateId}.`,
        // )
        return certificateId // Return the newly created ID
    } catch (error) {
        // console.error("Error creating certificate:", error)
        throw new Error("Failed to create certificate.")
    }
}
