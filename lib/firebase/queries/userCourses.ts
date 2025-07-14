import { db } from "@/lib/firebase/firebaseConfig"
import { collection, getDocs, query, where } from "firebase/firestore"

// Get enrolled courses for a user
export async function getUserEnrollments(userId: string) {
    const q = query(collection(db, "enrollments"), where("userId", "==", userId))
    const snap = await getDocs(q)
    return snap.docs.map((doc) => doc.data())
}

// Get archived courses for a user
export async function getUserArchivedCourses(userId: string) {
    const q = query(collection(db, "archivedCourses"), where("userId", "==", userId))
    const snap = await getDocs(q)
    return snap.docs.map((doc) => doc.data())
}

// Get completed courses for a user
export async function getUserCompletedCourses(userId: string) {
    const q = query(
        collection(db, "enrollments"),
        where("userId", "==", userId),
        where("status", "==", "completed"),
    )
    const snap = await getDocs(q)
    return snap.docs.map((doc) => doc.data())
}
// Wishlist
export async function getUserWishlist(userId: string) {
    const q = query(collection(db, "wishlists"), where("userId", "==", userId))
    const snap = await getDocs(q)
    return snap.docs.map((doc) => doc.data())
}

// Cart
export async function getUserCart(userId: string) {
    const q = collection(db, `carts/${userId}/items`)
    const snap = await getDocs(q)
    return snap.docs.map((doc) => doc.data())
}

// Certificates
export async function getUserCertificates(userId: string) {
    const q = query(collection(db, "certificates"), where("userId", "==", userId))
    const snap = await getDocs(q)
    return snap.docs.map((doc) => doc.data())
}
