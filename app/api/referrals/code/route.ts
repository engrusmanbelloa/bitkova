// app/api/referrals/code/route.ts
import { nanoid } from "@/hooks/certId"
import { adminDb } from "@/lib/firebase/admin"
import { NextResponse } from "next/server"

const generateReferralCode = (email: string) => {
    const prefix = email.substring(0, 3).toUpperCase()
    const id = nanoid().toUpperCase()
    return `${prefix}${id}`
}

export async function POST(req: Request) {
    const { email, userId } = await req.json()
    if (!userId || !email) {
        console.log("  Missing email or id: ", userId, email)
        return NextResponse.json({ error: "Missing userId or email" }, { status: 400 })
    }

    const userRef = adminDb.collection("users").doc(userId)

    const code = await adminDb.runTransaction(async (tx) => {
        const snap = await tx.get(userRef)
        if (!snap.exists) throw new Error("User not found")

        const data = snap.data()!

        // ✅ Already has one → return it
        if (data.referralCode) return data.referralCode

        // ✅ Create once
        const referralCode = generateReferralCode(email)

        tx.update(userRef, {
            referralCode,
            referralCodeCreatedAt: new Date(),
        })

        return referralCode
    })

    return NextResponse.json({ referralCode: code })
}
