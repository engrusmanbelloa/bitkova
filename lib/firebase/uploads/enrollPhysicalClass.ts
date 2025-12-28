// lib/firebase/uploads/enrollPhysicalClass.ts
import { doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { PhysicalClassEnrollment } from "@/types/classTypes"
import QRCode from "qrcode"

interface EnrollPhysicalClassParams {
    userId: string
    classId: string
    cohortId: string
    paymentReference: string
}

export async function enrollPhysicalClass({
    userId,
    classId,
    cohortId,
    paymentReference,
}: EnrollPhysicalClassParams) {
    const enrollmentId = `${userId}-${classId}-${Date.now()}`

    // Generate QR code
    const qrData = JSON.stringify({
        enrollmentId,
        userId,
        classId,
        type: "physical_class",
        timestamp: Date.now(),
    })
    const qrCode = await QRCode.toDataURL(qrData)

    const enrollment: PhysicalClassEnrollment = {
        id: enrollmentId,
        userId,
        classId,
        cohortId,
        paymentReference,
        qrCode,
        status: "paid",
        enrolledAt: new Date(),
        attendanceLog: [],
    }

    // Save enrollment
    await setDoc(doc(db, "physicalClassEnrollments", enrollmentId), enrollment)

    // Update class enrolled count
    const classRef = doc(db, "physicalClasses", classId)
    await updateDoc(classRef, {
        enrolled: increment(1),
    })

    // Update user's enrollments list
    await setDoc(doc(db, "users", userId, "classEnrollments", enrollmentId), {
        enrollmentId,
        classId,
        type: "physical_class",
        enrolledAt: new Date(),
    })

    return enrollment
}
