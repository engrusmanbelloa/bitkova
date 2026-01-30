// lib/referrals/referralRewards.ts
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import { calculateReferralXP } from "@/lib/referrals/rewardCalculator"

export async function rewardReferral({
    buyerId,
    price,
    enrollmentId,
}: {
    buyerId: string
    price: number
    enrollmentId: string
}) {
    console.log("referral rewards file hit for enrolment id: ", enrollmentId)

    const buyerRef = adminDb.collection("users").doc(buyerId)

    await adminDb.runTransaction(async (tx) => {
        const buyerSnap = await tx.get(buyerRef)
        if (!buyerSnap.exists) return

        const referredBy = buyerSnap.data()?.referredBy
        if (!referredBy) return

        const { referrerXP, refereeXP } = calculateReferralXP(price)
        const referrerRef = adminDb.collection("users").doc(referredBy)

        // ✅ Referrer reward
        tx.update(referrerRef, {
            xpBalance: FieldValue.increment(referrerXP),
            totalXpEarned: FieldValue.increment(referrerXP),
        })

        // ✅ Referee reward
        tx.update(buyerRef, {
            xpBalance: FieldValue.increment(refereeXP),
            totalXpEarned: FieldValue.increment(refereeXP),
        })

        // ✅ Audit trail (HIGHLY RECOMMENDED)
        const rewardRef = adminDb.collection("referralRewards").doc()
        tx.set(rewardRef, {
            buyerId,
            referrerId: referredBy,
            enrollmentId,
            price,
            referrerXP,
            refereeXP,
            createdAt: new Date(),
        })
    })
}
