import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { verifySession } from "@/session/verifySession"

export async function GET() {
    const decoded = await verifySession()
    if (!decoded) {
        return NextResponse.json({ valid: false }, { status: 401 })
    }
    return NextResponse.json({ valid: true })
}
