import { NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { adminApp } from "@/lib/firebase/admin"
import { UserRole } from "@/types/userType"

// Map roles to Firebase custom claim keys (camelCase)
const ROLE_TO_CLAIM_MAP: Record<UserRole["role"], string> = {
    guest: "guest",
    student: "student",
    instructor: "instructor",
    admin: "admin",
    blog_admin: "blogAdmin",
    event_manager: "eventManager",
    business_dev: "businessDev",
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, role, requesterEmail } = body as {
            email: string
            role: UserRole["role"] | "none"
            requesterEmail: string
        }

        // Validation
        if (!email || !role || !requesterEmail) {
            return NextResponse.json(
                { error: "Missing required fields: email, role, and requesterEmail" },
                { status: 400 },
            )
        }

        // Authorization check
        const allowedAdmins = ["usmanbelloa@gmail.com"]
        if (role === "admin" && !allowedAdmins.includes(requesterEmail)) {
            return NextResponse.json(
                { error: "You are not authorized to assign admin role" },
                { status: 403 },
            )
        }

        const auth = getAuth(adminApp)
        const user = await auth.getUserByEmail(email)

        // Get current claims
        const currentUser = await auth.getUser(user.uid)
        const currentClaims = currentUser.customClaims || {}

        // Check if user already has the role
        if (role !== "none") {
            const claimKey = ROLE_TO_CLAIM_MAP[role]

            if (currentClaims[claimKey] === true) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `User already has the ${role.replace(/_/g, " ")} role`,
                    },
                    { status: 200 },
                )
            }
        }
        // Set new claims
        const claims: Record<string, boolean> =
            role === "none" ? {} : { [ROLE_TO_CLAIM_MAP[role]]: true }

        await auth.setCustomUserClaims(user.uid, claims)

        return NextResponse.json({
            success: true,
            message:
                role === "none"
                    ? "All roles removed successfully"
                    : `${role.replace(/_/g, " ")} role assigned successfully`,
        })
    } catch (error) {
        console.error("Failed to update claims:", error)

        if (error instanceof Error && error.message.includes("user-not-found")) {
            return NextResponse.json({ error: "User not found with that email" }, { status: 404 })
        }

        return NextResponse.json(
            { error: "Failed to update user role. Please try again." },
            { status: 500 },
        )
    }
}
