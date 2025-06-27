import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { adminAuth, adminDb } from "@/utils/admin"

export async function POST(req: Request) {
    const body = await req.json()
    const idToken = body?.idToken

    if (!idToken) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 })
    }
    try {
        await adminAuth.verifyIdToken(idToken)

        const res = NextResponse.json({ status: "success", user: idToken })
        res.cookies.set("session", idToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 5, // 5 days
            path: "/",
        })
        return res
    } catch (error) {
        console.error("Session error:", error)
        return NextResponse.json({ error: "Session error" }, { status: 500 })
    }
}

export async function DELETE() {
    // Remove the session cookie
    const cookiesObj = await cookies()
    cookiesObj.delete("session")
    console.log("Session deleted....")

    return NextResponse.json({ status: "logged out" })
}
