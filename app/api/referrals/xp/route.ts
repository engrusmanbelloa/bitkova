import { adminDb } from "@/lib/firebase/admin"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    const userSnap = await adminDb.collection("users").doc(userId).get()

    if (!userSnap.exists) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const data = userSnap.data()

    return NextResponse.json({
        xpBalance: data?.xpBalance || 0,
        totalXpEarned: data?.totalXpEarned || 0,
    })
}
