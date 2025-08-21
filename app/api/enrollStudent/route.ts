import { NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { adminApp } from "@/lib/firebase/admin"
import { enrollCourses } from "@/lib/firebase/uploads/enrollCourses"
import { createCertificate } from "@/lib/firebase/uploads/createCertificate"

const auth = getAuth(adminApp)

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { targetEmail, courseId, enroll, assignCertificate, requesterEmail } = body

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
            return NextResponse.json({ error: "Not authorized" }, { status: 403 })
        }

        // 3. Find target user
        const targetUser = await auth.getUserByEmail(targetEmail)
        const targetUserId = targetUser.uid

        // 4. Perform enrollment/certificate actions
        if (enroll) await enrollCourses(targetUserId, [courseId])
        if (assignCertificate) await createCertificate(targetUserId, courseId)

        return NextResponse.json({ success: true, message: "Student successfully managed." })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
