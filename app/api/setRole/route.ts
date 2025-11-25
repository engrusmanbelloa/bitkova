import { NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { adminApp } from "@/lib/firebase/admin"

export async function POST(request: Request) {
    const body = await request.json()
    const { email, role, requesterEmail } = body // role can be: 'admin', 'instructor', or null to clear
    if (!email || !role) {
        return NextResponse.json({ error: "Missing uid" }, { status: 400 })
    }
    try {
        const allowedAdmins = ["usmanbelloa@gmail.com"]

        if (role === "admin" && !allowedAdmins.includes(requesterEmail)) {
            return NextResponse.json(
                { error: "Not authorized to assign admin role" },
                { status: 403 },
            )
        }

        const auth = getAuth(adminApp)
        const user = await auth.getUserByEmail(email)

        const claims =
            role === "none" ? {} : role === "admin" ? { admin: true } : { instructor: true }
        await auth.setCustomUserClaims(user.uid, claims)

        return NextResponse.json({
            success: true,
            message: role === "none" ? "Role removed" : `Assigned ${role} role`,
        })
    } catch (error) {
        console.error("Failed to update claims:", error)
        return NextResponse.json({ error: "Failed to update claims" }, { status: 500 })
    }
}
