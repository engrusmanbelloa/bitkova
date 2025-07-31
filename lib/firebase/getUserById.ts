// import { adminDb } from "@/lib/firebase/admin"

// export async function getUserById(uid: string) {
//     const docRef = adminDb.collection("users").doc(uid)
//     const docSnap = await docRef.get()

//     if (!docSnap.exists) return null
//     return docSnap.data()
// }

// lib/firebase/getUserById.ts
import { getDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { User } from "@/userType"

export async function getUserById(uid: string): Promise<User | null> {
    const docRef = doc(db, "users", uid)
    const snap = await getDoc(docRef)
    return snap.exists() ? (snap.data() as User) : null
}
