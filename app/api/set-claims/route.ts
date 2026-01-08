// app/api/set-claims/route.ts
import { NextRequest, NextResponse } from "next/server"
import { adminAuth, adminDb } from "@/lib/firebase/admin"

const SUPER_ADMIN_EMAIL = "usmanbelloa@gmail.com"

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { targetEmail, role, requesterEmail } = body

    if (!targetEmail || !role || !requesterEmail) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (requesterEmail !== SUPER_ADMIN_EMAIL) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    try {
        // 1. Get user by email
        const user = await adminAuth.getUserByEmail(targetEmail)

        // 2. Update custom claims
        const claims = { ...user.customClaims, [role]: true }
        await adminAuth.setCustomUserClaims(user.uid, claims)

        // 3. Update Firestore user document
        // await adminDb.collection("users").doc(user.uid).update({
        //     role: role, // e.g., "admin" or "instructor"
        // })

        return NextResponse.json({
            message: `Role '${role}' granted to ${targetEmail}`,
        })
    } catch (error: any) {
        console.error("SetClaims Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
