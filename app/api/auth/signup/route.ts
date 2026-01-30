// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server"
import createUserIfNotExists from "@/lib/firebase/uploads/createOrUpdateUserDoc"

export async function POST(request: NextRequest) {
    try {
        const { email, uid, name, uplineCode } = await request.json()

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
