import { getDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { User } from "@/types/userType"

export async function getUserById(uid: string): Promise<User | null> {
    const docRef = doc(db, "users", uid)
    const snap = await getDoc(docRef)
    return snap.exists() ? (snap.data() as User) : null
}
