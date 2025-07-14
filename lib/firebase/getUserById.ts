import { adminDb } from "@/lib/firebase/admin"

export async function getUserById(uid: string) {
    const docRef = adminDb.collection("users").doc(uid)
    const docSnap = await docRef.get()

    if (!docSnap.exists) return null
    return docSnap.data()
}
