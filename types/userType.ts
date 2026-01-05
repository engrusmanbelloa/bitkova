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

// export interface Enrollment {
//     id: string // enrollmentId (doc id)
//     userId: string

//     itemId: string // courseId OR classId
//     itemType: EnrollmentType

//     cohortId?: string
//     className?: string
//     cohortName?: string
//     // async only
//     progress?: number
//     completedLessons?: number
//     completedVideos?: string[]
//     status?: "in progress" | "completed"

//     paymentReference?: string
//     enrolledAt: Date
// }

// enrollments/{enrollmentId}
export interface Enrollment {
    id: string
    userId: string

    itemId: string
    itemType: "async_course" | "physical_class" | "telegram_class"

    cohortId?: string
    className?: string
    cohortName?: string

    paymentReference?: string
    status: "pending" | "paid" | "active" | "completed" | "cancelled" | "in progress"

    enrolledAt: Date

    // async only
    progress?: number
    completedLessons?: number
    completedVideos?: string[]

    // physical only
    qrCode?: string
    attendanceLog?: { date: Date; attended: boolean }[]

    // telegram only
    telegramInviteLink?: string
    telegramUserId?: number
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
