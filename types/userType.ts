import { CourseType } from "@/types/courseType"

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
// types/enrollment.ts
export type EnrollmentType = "async_course" | "telegram_class" | "physical_class"

export interface Enrollment {
    id: string // enrollmentId (doc id)
    userId: string

    itemId: string // courseId OR classId
    itemType: EnrollmentType

    cohortId?: string
    className?: string
    cohortName?: string
    // async only
    progress?: number
    completedLessons?: number
    completedVideos?: string[]
    status?: "in progress" | "completed"

    paymentReference?: string
    enrolledAt: Date
}

// export interface EnrolledCourse {
//     userId: string // UID from Firebase Auth
//     courseId: string // Document ID from the `courses` collection
//     completedLessons: number
//     progress: number // e.g. 0 to 100
//     status: "in progress" | "completed"
//     type?: "async_course" | "physical" | "telegram"
//     paymentReference?: string
//     enrolledAt: Date
// }

// export interface asyncCourseEnrollmentsType {
//     enrollmentId: string
//     userId: string
//     courseId: string
//     paymentReference: string
//     completedLessons: number
//     progress: number
//     status: "in_progress" | "completed" | "expired"
//     enrolledAt: Date
// }
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
