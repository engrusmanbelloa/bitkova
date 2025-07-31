import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"

export const addToCart = async (userId: string, courseId: string) => {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
        cart: arrayUnion(courseId),
    })
}

export const removeFromCart = async (userId: string, courseId: string) => {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
        cart: arrayRemove(courseId),
    })
}
