import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { nanoid } from "@/hooks/certId"
import { Certificate, CompletedCourse } from "@/userType"

// export const createCertificate = async (userId: string, courseId: string): Promise<void> => {
//     try {
//         // 1. Define the document references
//         const certificateId = nanoid() //`${userId}_${courseId}`
//         const certificateRef = doc(db, "users", userId, "certificates", certificateId)
//         const completedCourseRef = doc(db, "users", userId, "completedCourses", courseId)

//         const now = new Date()

//         // 2. Prepare the data for the new documents
//         const newCertificate: Certificate = {
//             id: certificateId,
//             userId: userId,
//             courseId: courseId,
//             issuedAt: now,
//         }

//         const completedCourse: CompletedCourse = {
//             userId: userId,
//             courseId: courseId,
//             completedAt: now,
//         }

//         // 3. Save the certificate and completed course to Firestore
//         await setDoc(certificateRef, newCertificate)
//         await setDoc(completedCourseRef, completedCourse)

//         console.log(
//             `Certificate and completed course document created for user ${userId} and course ${courseId}.`,
//         )
//     } catch (error) {
//         console.error("Error creating certificate:", error)
//         throw new Error("Failed to create certificate.")
//     }
// }

// lib/firebase/queries/createCertificate.ts

export const createCertificate = async (userId: string, courseId: string): Promise<string> => {
    try {
        // 1. Generate a new, unique certificate ID using nanoid
        const certificateId = nanoid()
        const certificateRef = doc(db, "users", userId, "certificates", certificateId)
        const completedCourseRef = doc(db, "users", userId, "completedCourses", courseId)

        const now = new Date()

        // 2. Prepare the data for the new documents
        const newCertificate: Certificate = {
            id: certificateId,
            userId: userId,
            courseId: courseId, // Store the courseId inside the document
            issuedAt: now,
        }

        const completedCourse: CompletedCourse = {
            userId: userId,
            courseId: courseId,
            completedAt: now,
        }

        // 3. Save the certificate and completed course to Firestore
        await setDoc(certificateRef, newCertificate)
        await setDoc(completedCourseRef, completedCourse)

        console.log(
            `Certificate and completed course document created for user ${userId} and course ${courseId}.`,
        )
        return certificateId // Return the newly created ID
    } catch (error) {
        console.error("Error creating certificate:", error)
        throw new Error("Failed to create certificate.")
    }
}
