import { NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { adminApp } from "@/lib/firebase/admin"

export async function POST(request: Request) {
    const body = await request.json()
    const { uid, role } = body // role can be: 'admin', 'instructor', or null to clear

    if (!uid) {
        return NextResponse.json({ error: "Missing uid" }, { status: 400 })
    }

    try {
        const auth = getAuth(adminApp)

        let customClaims = {}

        if (role === "admin") {
            customClaims = { admin: true }
        } else if (role === "instructor") {
            customClaims = { instructor: true }
        } else if (role === null || role === "remove") {
            // clear all roles
            customClaims = {}
        } else {
            return NextResponse.json({ error: "Invalid role" }, { status: 400 })
        }

        await auth.setCustomUserClaims(uid, customClaims)

        return NextResponse.json({
            success: true,
            message:
                Object.keys(customClaims).length === 0
                    ? "Removed all custom claims"
                    : `Assigned ${role} role`,
        })
    } catch (error) {
        console.error("Failed to update claims:", error)
        return NextResponse.json({ error: "Failed to update claims" }, { status: 500 })
    }
}
