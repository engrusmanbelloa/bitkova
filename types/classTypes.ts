// types/classTypes.ts
export type ClassType = "async_course" | "physical_class" | "telegram_class"

export interface Cohort {
    id: string
    name: string // "Bitkova 2026A"
    quarter: "Q1" | "Q2" | "Q3" | "Q4"
    year: number
    startDate: Date
    endDate: Date
    registrationOpen: Date
    registrationClose: Date
    status: "upcoming" | "active" | "closed"
    telegramGroupId?: string // For TG classes
}

export interface PhysicalClass {
    id: string
    name: string // "Gombe HQ"
    location: string
    cohortId: string
    price: number
    capacity: number
    enrolled: number
    schedule: {
        days: string[] // ["Saturday", "Sunday"]
        time: string // "2pm - 5pm"
    }
    instructors: string[]
    courses: string[]
    mapLink?: string
}

export interface TelegramClass {
    id: string
    name: string
    cohortId: string
    price: number
    capacity: number
    enrolled: number
    modules: string[]
    telegramGroupId: string
    schedule?: {
        days: string[]
        time: string
    }
}

export interface PhysicalClassEnrollment {
    id: string
    userId: string
    classId: string
    cohortId: string
    paymentReference: string
    qrCode: string
    status: "paid" | "attended" | "completed"
    enrolledAt: Date
    attendanceLog: {
        date: Date
        attended: boolean
    }[]
}

export interface TelegramClassEnrollment {
    id: string
    userId: string
    classId: string
    cohortId: string
    paymentReference: string
    telegramInviteLink: string
    status: "paid" | "active" | "completed"
    enrolledAt: Date
    telegramUserId?: number
}

// Unified enrollment type for all class types
export interface ClassEnrollment {
    id: string
    userId: string
    itemId: string // courseId, classId, or telegramClassId
    type: ClassType
    cohortId?: string
    paymentReference: string
    status: "pending" | "paid" | "active" | "completed" | "cancelled"
    enrolledAt: Date

    // Type-specific data
    qrCode?: string // For physical classes
    telegramInviteLink?: string // For TG classes
    telegramUserId?: number
    linkExpiresAt?: Date
    progress?: number // For async courses
    completedLessons?: number // For async courses
}
