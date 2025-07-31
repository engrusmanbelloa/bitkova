import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"

export const addToWishlist = async (userId: string, courseId: string) => {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
        wishList: arrayUnion(courseId),
    })
}

export const removeFromWishlist = async (userId: string, courseId: string) => {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
        wishList: arrayRemove(courseId),
    })
}
