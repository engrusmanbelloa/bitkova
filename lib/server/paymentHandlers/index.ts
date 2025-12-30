// lib/server/paymentHandlers/index.ts
import { PaymentHandler } from "@/types/paymentHandlers"
import { enrollTelegramClassServer } from "@/lib/server/enrollTelegramClassServer"
import { enrollAsyncCoursesServer } from "@/lib/server/enrollAsyncCoursesServer"

export const paymentHandlers: Record<string, PaymentHandler> = {
    telegram_class: async ({ userId, itemIds, metadata, paymentReference, payerEmail }) => {
        await enrollTelegramClassServer({
            userId,
            classId: itemIds[0],
            cohortId: metadata.cohortId,
            telegramGroupId: metadata.telegramGroupId,
            paymentReference,
            payerEmail,
        })
    },

    async_course: async ({ userId, itemIds, paymentReference }) => {
        await enrollAsyncCoursesServer({
            userId,
            courseIds: itemIds,
            paymentReference,
        })
    },
}
