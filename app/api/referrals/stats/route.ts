// app/api/referrals/stats/route.ts
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

    const data = userSnap.data()!

    // ⏱ last 7 days
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const weeklySnap = await adminDb
        .collection("referralRewards")
        .where("referrerId", "==", userId)
        .where("createdAt", ">=", oneWeekAgo)
        .get()

    return NextResponse.json({
        referralCount: data.referralCount || 0,
        weeklyCount: weeklySnap.size,
    })
}
