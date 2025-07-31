import { CourseType } from "@/types"
import { featuredCourses } from "@/data"

const getCourseDetailsById = (courseId: number): CourseType | undefined => {
    return featuredCourses.find((course) => course._id === courseId)
}

// Represents user-specific progress for a course
export interface UserCourseProgress {
    course: CourseType
    completedLessons: number
    progress: number // Percentage (0-100)
    status: "completed" | "in-progress" | "archived" | "wishlist" | "cart"
}
export interface User {
    id: string
    name: string
    email: string
    role: "guest" | "student" | "instructor" | "admin"
    username: string
    bio: string
    skill: string
    phoneNumber: string
    registrationDate: string
    wishList: string[]
    cart: string[]
}
export interface EnrolledCourse {
    id: string // Optional: custom ID like `${userId}_${courseId}`
    userId: string // UID from Firebase Auth
    courseId: string // Document ID from the `courses` collection
    completedLessons: number
    progress: number // e.g. 0 to 100
    status: "in progress" | "completed"
    enrolledAt: Date
    updatedAt: Date
}
export interface WishListItem {
    id: string // `${userId}_${courseId}`
    userId: string
    courseId: string
    addedAt: Date
}
export interface ArchivedCourse {
    id: string // `${userId}_${courseId}`
    userId: string
    courseId: string
    archivedAt: Date
    reason?: string
}
export interface Certificate {
    id: string // `${userId}_${courseId}`
    userId: string
    courseId: string
    issuedAt: Date
}
export interface Cart {
    courseId: string
    // courseTitle: string
    // priceAtTime: number
    addedAt: Date
}
export interface CompletedCourse {
    id: string
    userId: string
    courseId: string
    completedAt: Date
    // any other fields you store
}
