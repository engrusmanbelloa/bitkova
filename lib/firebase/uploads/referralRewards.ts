// lib/firebase/uploads/referralRewards.ts
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"

export async function rewardReferrer(buyerId: string, rewardAmount: number = 500) {
    const buyerDoc = await adminDb.collection("users").doc(buyerId).get()
    if (!buyerDoc.exists) return

    const referredBy = buyerDoc.data()?.referredBy
    if (!referredBy) return

    const referrerRef = adminDb.collection("users").doc(referredBy)

    // ✅ Credit the referrer
    await referrerRef.update({
        xpBalance: FieldValue.increment(rewardAmount),
        totalXpEarned: FieldValue.increment(rewardAmount),
    })

    console.log(
        `Referrer ${referredBy} credited with ${rewardAmount} XP for purchase by ${buyerId}`,
    )
}
