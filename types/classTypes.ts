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
    name: string
    location: string
    cohortId: string
    price: number
    capacity: number
    enrolled: number
    telegramGroupId: string
    schedule: {
        slots: {
            days: string[]
            time: string
        }[]
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
    telegramGroupId: string
    schedule: {
        slots: {
            days: string[]
            time: string
        }[]
    }
}

export type InviteStatus = "pending" | "processing" | "sent" | "failed"

export interface telegramPendingInvites {
    userId: string
    email: string
    classId: string
    telegramGroupId: string
    cohortName: string
    className: string
    attempts: number
    status: InviteStatus
    createdAt: Date
    updatedAt: Date
}
