// lib/store/syncUserStore.ts
import {
    doc,
    getDoc,
    collection,
    getDocs,
    onSnapshot,
    Unsubscribe,
    where,
    query,
} from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { useUserStore } from "@/lib/store/useUserStore"
import { Enrollment, CompletedCourse, ArchivedCourse } from "@/types/userType"

/**
 * Helper to map Firestore timestamps to JS Dates
 */
const mapDoc = (docSnap: any) => {
    const data = docSnap.data()
    return {
        ...data,
        // Automatically handle any common timestamp fields
        enrolledAt: data.enrolledAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        completedAt: data.completedAt?.toDate(),
        archivedAt: data.archivedAt?.toDate(),
    }
}

export const syncUserStore = (userId: string): Unsubscribe => {
    const store = useUserStore.getState()

    // 1. Fetch Static/One-time Data (Cart, Wishlist, Completed, Archived)
    // We run these in parallel for maximum speed
    const initializeStaticData = async () => {
        try {
            const [userSnap, completedSnap, archivedSnap] = await Promise.all([
                getDoc(doc(db!, "users", userId)),
                getDocs(collection(db!, "users", userId, "completedCourses")),
                getDocs(collection(db!, "users", userId, "archivedCourses")),
            ])

            // Set Wishlist & Cart
            if (userSnap.exists()) {
                const userData = userSnap.data()
                store.setWishlist(userData.wishList || [])
                store.setCart(userData.cart || [])
            }

            // Set Completed
            store.setCompletedCourses(completedSnap.docs.map(mapDoc) as CompletedCourse[])

            // Set Archived
            store.setArchivedCourses(archivedSnap.docs.map(mapDoc) as ArchivedCourse[])
        } catch (error) {
            console.error("Error initializing user data:", error)
        }
    }

    initializeStaticData()

    // 2. Setup Real-time Listener for Enrolled Courses
    // This is the only thing that needs to be "Live"
    // const unsubscribe = onSnapshot(
    //     collection(db, "users", userId, "enrolledCourses"),
    //     (snap) => {
    //         const list = snap.docs.map(mapDoc) as Enrollment[]
    //         store.setEnrollments(list)
    //     },
    //     (err) => console.error("Enrollment listener error:", err),
    // )

    const unsubscribe = onSnapshot(
        query(collection(db!, "enrollments"), where("userId", "==", userId)),
        (snap) => {
            const list = snap.docs.map(mapDoc) as Enrollment[]
            store.setEnrollments(list)
        },
        (err) => console.error("Enrollment listener error:", err),
    )

    // 3. Return unsubscribe so the hook can clean up
    return unsubscribe
}
