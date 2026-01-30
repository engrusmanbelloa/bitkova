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
    const userRef = adminDb.collection("users").doc(uid)
    const userSnap = await userRef.get()

    if (userSnap.exists) return userSnap.data() as User

    let uplineUid: string | null = null

    // 1. If a referral code was provided, find the referrer
    if (uplineCode) {
        const uplineQuery = await adminDb
            .collection("users")
            .where("referralCode", "==", uplineCode.trim())
            .limit(1)
            .get()

        if (!uplineQuery.empty) {
            const uplineDoc = uplineQuery.docs[0]
            uplineUid = uplineDoc.id

            // 2. Add this new user to the referrer's list of referees immediately
            await uplineDoc.ref.update({
                referees: FieldValue.arrayUnion(uid),
                referralCount: FieldValue.increment(1),
            })
        }
    }

    const newUser: User = {
        id: uid,
        name: name || "Guest User",
        email: email,
        role: "guest",
        username: email.split("@")[0].toLowerCase(),
        phoneNumber: "",
        skill: "",
        bio: "",
        referralCode: generateReferralCode(email),
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

    // try {
    //     const userRef = doc(db!, "users", user.uid)
    //     const userSnap = await getDoc(userRef)

    //     if (!userSnap.exists()) {
    //         // Optional: Check if another doc with this email exists
    //         const q = query(collection(db!, "users"), where("email", "==", user.email))
    //         const querySnap = await getDocs(q)

    //         if (!querySnap.empty) {
    //             console.warn("User with this email already exists in another document")
    //             return
    //         }
    //         // Logic to find upline user if a code was provided
    //         let uplineUid = ""
    //         if (uplineCode) {
    //             const q = query(collection(db!, "users"), where("referralCode", "==", uplineCode))
    //             const uplineSnap = await getDocs(q)
    //             if (!uplineSnap.empty) {
    //                 uplineUid = uplineSnap.docs[0].id
    //                 // Optional: Credit the upline user here or via Cloud Function
    //             }
    //         }

    //         const newUser: User = {
    //             id: user.uid,
    //             name: user.displayName || "Guest User",
    //             email: user.email || "",
    //             role: "guest",
    //             username: user.displayName?.split(" ").join("").toLowerCase() || "guest",
    //             phoneNumber: user.phoneNumber || "",
    //             skill: "",
    //             bio: "",
    //             referralCode: generateReferralCode(user.email || "USER"),
    //             referredBy: uplineUid,
    //             xpBalance: 0,
    //             totalXpEarned: 0,
    //             referralCount: 0,
    //             registrationDate: new Date().toISOString(),
    //             wishList: [],
    //             cart: [],
    //         }

    //         await setDoc(userRef, newUser, { merge: true })
    //         // console.log("New user document created")
    //     } else {
    //         // console.log("User document already exists")
    //     }
    // } catch (error) {
    //     // console.log("Error creating or checking user document:", error)
    //     throw error
    // }
}
