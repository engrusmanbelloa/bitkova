// app/api/set-claims/route.ts
import { NextResponse } from "next/server"
import { adminAuth } from "@/utils/admin" // or wherever your admin SDK is initialized

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, role } = body

        if (!email || !role) {
            return NextResponse.json({ error: "Missing email or role" }, { status: 400 })
        }

        const user = await adminAuth.getUserByEmail(email)

        let claims: { [key: string]: any } = user.customClaims || {}
        claims[role] = true // e.g., { admin: true } or { instructor: true }

        await adminAuth.setCustomUserClaims(user.uid, claims)

        return NextResponse.json({
            message: `Claim '${role}' added to ${email}`,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || "Unexpected error" }, { status: 500 })
    }
}
