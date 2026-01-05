// lib/firebase/uploads/createCertificate.ts
import { doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { nanoid } from "@/hooks/certId"
import { Certificate, CompletedCourse } from "@/types/userType"

export const createCertificate = async (userId: string, courseId: string): Promise<string> => {
    try {
        // 1. Generate a new, unique certificate ID using nanoid
        const certificateId = nanoid()
        const enrollmentId = `${userId}-${courseId}`
        const enrollmentRef = doc(db, "enrollments", enrollmentId)

        // const certificateRef = doc(db, "users", userId, "certificates", certificateId)
        // const completedCourseRef = doc(db, "users", userId, "completedCourses", courseId)

        const now = new Date()

        // 2. Prepare the data for the new documents
        // const newCertificate: Certificate = {
        //     id: certificateId,
        //     userId: userId,
        //     courseId: courseId, // Store the courseId inside the document
        //     issuedAt: now,
        // }
        await updateDoc(enrollmentRef, {
            status: "completed",
            completedAt: now,
            certificateId,
        })

        // const completedCourse: CompletedCourse = {
        //     userId: userId,
        //     courseId: courseId,
        //     completedAt: now,
        // }

        // 3. Save the certificate and completed course to Firestore
        const certificateRef = doc(db, "users", userId, "certificates", certificateId)
        await setDoc(certificateRef, {
            id: certificateId,
            userId,
            courseId,
            issuedAt: now,
        })
        // await setDoc(certificateRef, newCertificate)
        // await setDoc(completedCourseRef, completedCourse)

        console.log(
            `Certificate and completed course document created for user ${enrollmentId} and course ${certificateId}.`,
        )
        return certificateId // Return the newly created ID
    } catch (error) {
        console.error("Error creating certificate:", error)
        throw new Error("Failed to create certificate.")
    }
}
