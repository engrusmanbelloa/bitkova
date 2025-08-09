import { doc, getDoc, collection, getDocs, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { useUserStore } from "@/lib/store/useUserStore"
import { EnrolledCourse } from "@/userType"

export const syncUserStore = async (userId: string) => {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
        const userData = userSnap.data()
        useUserStore.getState().setWishlist(userData.wishList || [])
        useUserStore.getState().setCart(userData.cart || [])
    }

    // Get enrolledCourses subcollection
    const enrolledCoursesRef = collection(db, "users", userId, "enrolledCourses")
    const enrolledSnap = await getDocs(enrolledCoursesRef)

    const enrolledList: EnrolledCourse[] = enrolledSnap.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<EnrolledCourse, "enrolledAt" | "updatedAt"> & {
            enrolledAt: Timestamp
            updatedAt: Timestamp
        }

        return {
            ...data,
            enrolledAt: data.enrolledAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
        }
    })

    useUserStore.getState().setEnrolledCourses(enrolledList)
}
