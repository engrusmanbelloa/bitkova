// app/api/referrals/leaderboard/route.ts
import { adminDb } from "@/lib/firebase/admin"
import { NextResponse } from "next/server"

export async function GET() {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const rewardsSnap = await adminDb
        .collection("referralRewards")
        .where("createdAt", ">=", oneWeekAgo)
        .get()

    const counts: Record<string, number> = {}

    rewardsSnap.docs.forEach((doc) => {
        const { referrerId } = doc.data()
        counts[referrerId] = (counts[referrerId] || 0) + 1
    })

    const leaderboard = await Promise.all(
        Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(async ([userId, score], index) => {
                const user = await adminDb.collection("users").doc(userId).get()
                return {
                    rank: index + 1,
                    name: user.data()?.name || "Anonymous",
                    score,
                }
            }),
    )

    return NextResponse.json(leaderboard)
}
