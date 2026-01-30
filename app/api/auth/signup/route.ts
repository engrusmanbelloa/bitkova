// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import createUserIfNotExists from "@/lib/firebase/uploads/createOrUpdateUserDoc"

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization")
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    try {
        const token = authHeader.replace("Bearer ", "")
        const decoded = await getAuth().verifyIdToken(token)

        const { uplineCode: rawCode } = await req.json()
        const uplineCode = rawCode?.trim().toUpperCase()

        const uid = decoded.uid
        const email = decoded.email
        const name = decoded.name || decoded.email?.split("@")[0]

        if (!uid || !email) {
            return NextResponse.json(
                { success: false, message: "Missing User Data" },
                { status: 400 },
            )
        }

        const userDoc = await createUserIfNotExists({ uid, email, name, uplineCode })

        return NextResponse.json({
            success: true,
            message: "User document created and referral linked",
            user: userDoc,
        })
    } catch (error: any) {
        console.error("Signup API Error:", error)
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Internal Server Error",
            },
            { status: 500 },
        )
    }
}
