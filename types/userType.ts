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

// enrollments/{enrollmentId}
export interface Enrollment {
    id: string
    userId: string

    itemId: string
    itemType: EnrollmentType

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
    inviteLink?: string
    telegramUserId?: number

    termsAccepted?: true
    termsVersion?: "2026-01"
    termsAcceptedAt?: Date

    privacyAccepted?: true
    privacyAcceptedAt?: Date
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
