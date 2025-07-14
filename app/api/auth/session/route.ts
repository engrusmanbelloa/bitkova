import { NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase/admin"
import { cookies } from "next/headers"

const FIVE_DAYS = 60 * 60 * 24 * 5 * 1000

export async function POST(req: NextRequest) {
    const body = await req.json()
    const idToken = body.idToken

    if (!idToken) {
        return NextResponse.json({ error: "Missing ID token" }, { status: 400 })
    }

    try {
        const expiresIn = FIVE_DAYS
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

        const response = NextResponse.json({ status: "success" })
        response.cookies.set("session", sessionCookie, {
            maxAge: expiresIn / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        })

        return response
    } catch (error) {
        console.error("Session cookie creation failed:", error)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
}

export async function DELETE() {
    const cookiesObj = await cookies()
    cookiesObj.delete("session")
    console.log("Session deleted....")
    return NextResponse.json({ status: "logged out" })
}
