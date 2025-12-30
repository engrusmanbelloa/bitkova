// lib/firebase/queries/cart.ts
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"

export const addToCartDb = async (userId: string, courseId: string) => {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
        cart: arrayUnion(courseId),
    })
}

export const removeFromCartDb = async (userId: string, courseId: string) => {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
        cart: arrayRemove(courseId),
    })
}
