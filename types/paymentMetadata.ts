// types/paymentMetadata.ts

export type AsyncCourseMetadata = {
    type: "async_course"
    userId: string
    courseIds: string[]
}

export type PhysicalClassMetadata = {
    type: "physical_class"
    userId: string
    classId: string
    cohortId: string
    telegramClassId: string
    telegramUsername?: string
}

export type TelegramClassMetadata = {
    type: "telegram_class"
    userId: string
    telegramClassId: string
    telegramUsername?: string
}

export type PaymentMetadata = AsyncCourseMetadata | PhysicalClassMetadata | TelegramClassMetadata
