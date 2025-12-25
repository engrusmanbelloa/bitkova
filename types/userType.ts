import { CourseType } from "@/types/course"

// Represents user-specific progress for a course
export interface UserCourseProgress {
    course: CourseType
    completedLessons: number
    progress: number // Percentage (0-100)
    status: "completed" | "in-progress" | "archived" | "wishlist" | "cart"
}
export interface UserRole {
    role:
        | "guest"
        | "student"
        | "instructor"
        | "admin"
        | "blog_admin"
        | "event_manager"
        | "business_dev"
}
export interface User {
    id: string
    name: string
    email: string
    role: UserRole["role"]
    username: string
    bio: string
    skill: string
    phoneNumber: string
    registrationDate: string
    wishList: string[]
    cart: string[]
}
export interface EnrolledCourse {
    userId: string // UID from Firebase Auth
    courseId: string // Document ID from the `courses` collection
    completedLessons: number
    progress: number // e.g. 0 to 100
    status: "in progress" | "completed"
    enrolledAt: Date
}
export interface WishListItem {
    id: string
    userId: string
    courseId: string
    addedAt: Date
}
export interface ArchivedCourse {
    userId: string
    courseId: string
    archivedAt: Date
    reason?: string
}
export interface Certificate {
    id: string
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
    userId: string
    courseId: string
    completedAt: Date
}
