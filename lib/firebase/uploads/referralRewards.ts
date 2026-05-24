// lib/firebase/uploads/referralRewards.ts
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"

export async function rewardReferrer(buyerId: string, rewardAmount: number = 500) {
    const buyerDoc = await adminDb.collection("users").doc(buyerId).get()
    if (!buyerDoc.exists) return

    const referredBy = buyerDoc.data()?.referredBy
    if (!referredBy) return

    const referrerRef = adminDb.collection("users").doc(referredBy)

    // Check referrer actually exists before updating
    const referrerDoc = await referrerRef.get()
    if (!referrerDoc.exists) {
        console.warn(`Referrer ${referredBy} not found — skipping XP reward`)
        return
    }

    // Credit the referrer
    await referrerRef.update({
        xpBalance: FieldValue.increment(rewardAmount),
        totalXpEarned: FieldValue.increment(rewardAmount),
    })

    // console.log(
    //     `Referrer ${referredBy} credited with ${rewardAmount} XP for purchase by ${buyerId}`,
    // )
}
