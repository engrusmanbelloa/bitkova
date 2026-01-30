// lib/firebase/uploads/createOrUpdateUserDoc.ts

import { User } from "@/types/userType"
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import { email } from "zod/v4/core/regexes"
import { nanoid } from "@/hooks/certId"

interface params {
    uid: string
    email: string
    name: string
    uplineCode?: string
}
const generateReferralCode = (email: string) => {
    const prefix = email.substring(0, 3).toUpperCase()
    const id = nanoid().toUpperCase()
    // const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `${prefix}${id}` // e.g., JOHABC
}

export default async function createUserIfNotExists({ uid, email, name, uplineCode }: params) {
    // export default async function createUserIfNotExists(user: FirebaseUser, uplineCode?: string) {
    if (!uid) return
    // console.log(user.uid)
    let referralCode = ""
    let exists = true
    const userRef = adminDb.collection("users").doc(uid)
    const userSnap = await userRef.get()

    if (userSnap.exists) return userSnap.data() as User

    let uplineUid: string | null = null

    // If a referral code was provided, find the referrer
    if (uplineCode) {
        const uplineQuery = await adminDb
            .collection("users")
            .where("referralCode", "==", uplineCode.trim())
            .limit(1)
            .get()

        if (!uplineQuery.empty) {
            const uplineDoc = uplineQuery.docs[0]
            uplineUid = uplineDoc.id
            if (uplineUid === uid) {
                throw new Error("Self-referral is not allowed")
            }
            // Add this new user to the referrer's list of referees immediately
            await uplineDoc.ref.update({
                referees: FieldValue.arrayUnion(uid),
                referralCount: FieldValue.increment(1),
            })
        }
    }

    while (exists) {
        referralCode = generateReferralCode(email)
        const snap = await adminDb
            .collection("users")
            .where("referralCode", "==", referralCode)
            .limit(1)
            .get()
        exists = !snap.empty
    }

    const newUser: User = {
        id: uid,
        name: name,
        email: email,
        role: "guest",
        username: email.split("@")[0].toLowerCase(),
        phoneNumber: "",
        skill: "",
        bio: "",
        referralCode: referralCode,
        referredBy: uplineUid || undefined,
        referees: [],
        xpBalance: 0,
        totalXpEarned: 0,
        referralCount: 0,
        registrationDate: new Date().toISOString(),
        wishList: [],
        cart: [],
    }

    await userRef.set(newUser)
    return newUser
}
