import { db } from "@/lib/firebase/firebaseConfig"
import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore"

import { EnrolledCourse, WishListItem, ArchivedCourse, Certificate, Cart } from "@/userType"

// Enroll user in a course
export async function enrollUserInCourse(userId: string, courseId: string) {
    const id = `${userId}_${courseId}`
    const ref = doc(db, "enrollments", id)
    const data: EnrolledCourse = {
        id,
        userId,
        courseId,
        completedLessons: 0,
        progress: 0,
        status: "in progress",
        enrolledAt: new Date(),
        updatedAt: new Date(),
    }
    await setDoc(ref, data)
}

// Add course to wishlist
export async function addToWishlist(userId: string, courseId: string) {
    const id = `${userId}_${courseId}`
    const ref = doc(db, "wishlists", id)
    const data: WishListItem = {
        id,
        userId,
        courseId,
        addedAt: new Date(),
    }
    await setDoc(ref, data)
}

// Remove course from wishlist
export async function removeFromWishlist(userId: string, courseId: string) {
    const id = `${userId}_${courseId}`
    const ref = doc(db, "wishlists", id)
    await deleteDoc(ref)
}

// Add course to cart
export async function addToCart(userId: string, courseId: string) {
    const ref = doc(db, `carts/${userId}/items/${courseId}`)
    const data: Cart = {
        courseId,
        addedAt: new Date(),
    }
    await setDoc(ref, data)
}

// Remove course from cart
export async function removeFromCart(userId: string, courseId: string) {
    const ref = doc(db, `carts/${userId}/items/${courseId}`)
    await deleteDoc(ref)
}

// Archive a course
export async function archiveCourse(userId: string, courseId: string) {
    const id = `${userId}_${courseId}`
    const ref = doc(db, "archivedCourses", id)
    const data: ArchivedCourse = {
        id,
        userId,
        courseId,
        archivedAt: new Date(),
    }
    await setDoc(ref, data)
}

// Award a certificate
export async function awardCertificate(userId: string, courseId: string) {
    const id = `${userId}_${courseId}`
    const ref = doc(db, "certificates", id)
    const data: Certificate = {
        id,
        userId,
        courseId,
        issuedAt: new Date(),
    }
    await setDoc(ref, data)
}
