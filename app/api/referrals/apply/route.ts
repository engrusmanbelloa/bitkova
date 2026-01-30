// app/api/referrals/apply/route.ts
import { adminDb } from "@/lib/firebase/admin"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { userId, referralCode } = await req.json()

    if (!userId || !referralCode) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const userRef = adminDb.collection("users").doc(userId)

    await adminDb.runTransaction(async (tx) => {
        const userSnap = await tx.get(userRef)
        if (!userSnap.exists) throw new Error("User not found")

        const userData = userSnap.data()!

        // 🚫 Already has upline
        if (userData.referredBy) {
            throw new Error("Referral already applied")
        }

        // 🚫 Cannot refer self
        if (userData.referralCode === referralCode) {
            throw new Error("Cannot refer yourself")
        }

        // Find referrer by code
        const referrerQuery = await adminDb
            .collection("users")
            .where("referralCode", "==", referralCode)
            .limit(1)
            .get()

        if (referrerQuery.empty) {
            throw new Error("Invalid referral code")
        }

        const referrerDoc = referrerQuery.docs[0]
        const referrerId = referrerDoc.id

        // ✅ Set upline (IMMUTABLE)
        tx.update(userRef, {
            referredBy: referrerId,
            referralAppliedAt: new Date(),
        })

        // ✅ Update referrer stats
        tx.update(referrerDoc.ref, {
            referralCount: (referrerDoc.data().referralCount || 0) + 1,
            referees: [...(referrerDoc.data().referees || []), userId],
        })
    })

    return NextResponse.json({ success: true })
}
