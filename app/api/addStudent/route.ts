import { NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { adminApp } from "@/lib/firebase/admin"
import { enrollCourses } from "@/lib/firebase/uploads/enrollCourses"
import { createCertificate } from "@/lib/firebase/uploads/createCertificate"
import { cookies } from "next/headers"

const auth = getAuth(adminApp)

export async function POST(request: Request) {
    const body = await request.json()
    const { targetEmail, courseId, enroll, assignCertificate, requesterEmail } = body

    // 1. Basic validation of request body
    if (!targetEmail || !courseId) {
        return NextResponse.json({ error: "Missing email or course ID" }, { status: 400 })
    }

    // 2. Authorization check: Verify the requester's role
    try {
        const sessionCookie = (await cookies()).get("__session")?.value
        if (!sessionCookie) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }

        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true)
        const requesterClaims = decodedClaims.claims
        const isAuthorized =
            requesterClaims?.admin ||
            requesterClaims?.instructor ||
            requesterEmail === "usmanbelloa@gmail.com"

        if (!isAuthorized) {
            return NextResponse.json(
                { error: "Not authorized to perform this action" },
                { status: 403 },
            )
        }
    } catch (error) {
        console.error("Authorization error:", error)
        return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    // 3. Find the target user's UID from their email
    let targetUser
    try {
        targetUser = await auth.getUserByEmail(targetEmail)
    } catch (error) {
        console.error("Failed to find user:", error)
        return NextResponse.json({ error: "User not found with that email" }, { status: 404 })
    }

    const targetUserId = targetUser.uid

    // 4. Perform the requested actions based on flags
    try {
        if (enroll) {
            await enrollCourses(targetUserId, [courseId])
        }

        if (assignCertificate) {
            await createCertificate(targetUserId, courseId)
        }

        return NextResponse.json({
            success: true,
            message: "Student successfully managed.",
        })
    } catch (error) {
        console.error("Failed to enroll student or create certificate:", error)
        return NextResponse.json({ error: "Failed to perform requested action." }, { status: 500 })
    }
}
