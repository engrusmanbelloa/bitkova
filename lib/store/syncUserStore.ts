import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { useUserStore } from "@/lib/store/useUserStore"

export const syncUserStore = async (userId: string) => {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
        const userData = userSnap.data()
        useUserStore.getState().setWishlist(userData.wishList || [])
        useUserStore.getState().setCart(userData.cart || [])
        useUserStore.getState().setEnrolledCourses(userData.enrolledCourses || [])
    }
}
