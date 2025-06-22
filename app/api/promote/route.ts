// /app/api/promote/route.ts (App Router structure)
import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { adminApp } from "@/firebase/admin"

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json()
        const decoded = await getAuth(adminApp).verifyIdToken(idToken)

        if (!decoded.email_verified) {
            return NextResponse.json({ status: "email not verified" })
        }

        await getAuth(adminApp).setCustomUserClaims(decoded.uid, { admin: true })

        return NextResponse.json({ status: "success" })
    } catch (err: any) {
        return NextResponse.json({ status: "error", message: err.message }, { status: 500 })
    }
}
