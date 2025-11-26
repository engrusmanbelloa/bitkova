import { NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { adminApp } from "@/lib/firebase/admin"
import { enrollCourses } from "@/lib/firebase/uploads/enrollCourses"
import { createCertificate } from "@/lib/firebase/uploads/createCertificate"
import { getFirestore } from "firebase-admin/firestore"

const auth = getAuth(adminApp)
const db = getFirestore(adminApp)

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { targetEmail, courseId, enroll, assignCertificate, requesterEmail } = body

        // Validation
        if (!targetEmail || !courseId || !requesterEmail) {
            return NextResponse.json(
                { error: "Missing required fields: targetEmail, courseId, and requesterEmail" },
                { status: 400 },
            )
        }

        // 1. Check for Authorization header
        const authHeader = request.headers.get("Authorization")
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }

        const idToken = authHeader.split("Bearer ")[1]
        const decoded = await auth.verifyIdToken(idToken)

        // 2. Check claims
        const isAuthorized =
            decoded.admin || decoded.instructor || requesterEmail === "usmanbelloa@gmail.com"

        if (!isAuthorized) {
            return NextResponse.json(
                { error: "You are not authorized to manage student enrollments" },
                { status: 403 },
            )
        }
        // 3. Find target user
        let targetUser
        try {
            targetUser = await auth.getUserByEmail(targetEmail)
        } catch (error) {
            return NextResponse.json(
                { error: `Student not found with email: ${targetEmail}` },
                { status: 404 },
            )
        }
        const targetUserId = targetUser.uid

        // 4. Perform enrollment/certificate actions
        const courseDoc = await db.collection("courses").doc(courseId).get()
        if (!courseDoc.exists) {
            return NextResponse.json(
                { error: `Course not found with ID: ${courseId}` },
                { status: 404 },
            )
        }

        // 5. Check if student is already enrolled
        const userDoc = await db.collection("users").doc(targetUserId).get()
        const userData = userDoc.data()
        const enrolledCourses = userData?.enrolledCourses || []

        if (enroll && enrolledCourses.includes(courseId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Student is already enrolled in this course`,
                },
                { status: 200 },
            )
        }
        // 6. Check if certificate already exists
        if (assignCertificate) {
            const certificatesRef = db
                .collection("users")
                .doc(targetUserId)
                .collection("certificates")

            const certificateSnapshot = await certificatesRef
                .where("courseId", "==", courseId)
                .get()

            if (!certificateSnapshot.empty) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Student already has a certificate for this course`,
                    },
                    { status: 200 },
                )
            }
        }

        // 7. Perform enrollment/certificate actions
        const actions: string[] = []

        if (enroll && !enrolledCourses.includes(courseId)) {
            await enrollCourses(targetUserId, [courseId])
            actions.push("enrolled")
        }

        if (assignCertificate) {
            await createCertificate(targetUserId, courseId)
            actions.push("certificate assigned")
        }

        if (actions.length === 0) {
            return NextResponse.json(
                { success: false, message: "No actions performed" },
                { status: 200 },
            )
        }

        const actionMessage = actions.join(" and ")
        return NextResponse.json({
            success: true,
            message: `Student successfully ${actionMessage} for the course`,
        })

        // return NextResponse.json({ success: true, message: "Student successfully managed." })
    } catch (error) {
        console.error("Error managing student enrollment:", error)

        if (error instanceof Error) {
            // Handle specific Firebase errors
            if (error.message.includes("auth/id-token-expired")) {
                return NextResponse.json(
                    { error: "Session expired. Please log in again." },
                    { status: 401 },
                )
            }
            if (error.message.includes("auth/id-token-revoked")) {
                return NextResponse.json(
                    { error: "Access revoked. Please log in again." },
                    { status: 401 },
                )
            }
        }

        return NextResponse.json(
            { error: "Failed to manage student enrollment. Please try again." },
            { status: 500 },
        )
    }
}
