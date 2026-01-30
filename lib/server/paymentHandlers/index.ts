// lib/server/paymentHandlers/index.ts
import { PaymentHandler } from "@/types/paymentHandlers"
import { enrollTelegramClassServer } from "@/lib/server/enrollTelegramClassServer"
import { enrollAsyncCoursesServer } from "@/lib/server/enrollAsyncCoursesServer"
import { removeCoursesFromCartServer } from "@/lib/server/cartServer"
import { enrollPhysicalClassServer } from "../enrollPhysicalClassServer"
// "async_course" | "physical_class" | "telegram_class"
export const paymentHandlers: Record<string, PaymentHandler> = {
    telegram_class: async ({ userId, itemIds, metadata, paymentReference, payerEmail }) => {
        if (!metadata.telegramGroupId) {
            throw new Error("Missing telegramGroupId for physical class")
        }
        await enrollTelegramClassServer({
            userId,
            classId: itemIds[0],
            cohortId: metadata.cohortId,
            telegramGroupId: metadata.telegramGroupId,
            className: metadata.className,
            cohortName: metadata.cohortName,
            paymentReference,
            payerEmail,
            enrolledAt: new Date(),
            itemId: itemIds[0],
        })
    },

    physical_class: async ({ userId, itemIds, metadata, paymentReference, payerEmail, price }) => {
        if (!metadata.telegramGroupId) {
            throw new Error("Missing telegramGroupId for physical class")
        }
        await enrollPhysicalClassServer({
            userId,
            classId: itemIds[0],
            cohortId: metadata.cohortId,
            telegramGroupId: metadata.telegramGroupId,
            className: metadata.className,
            cohortName: metadata.cohortName,
            paymentReference,
            payerEmail,
            price,
        })
    },

    async_course: async ({ userId, itemIds, paymentReference }) => {
        await enrollAsyncCoursesServer({
            userId,
            courseIds: itemIds,
            paymentReference,
        })
        // ✅ REMOVE FROM DB CART (AUTHORITATIVE)
        await removeCoursesFromCartServer(userId, itemIds)
    },
}
