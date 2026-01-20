import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "@/lib/firebase/client"

export const addToWishlistDb = async (userId: string, courseId: string) => {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
        wishList: arrayUnion(courseId),
    })
}

export const removeFromWishlistDb = async (userId: string, courseId: string) => {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
        wishList: arrayRemove(courseId),
    })
}
