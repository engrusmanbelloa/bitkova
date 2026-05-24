// lib/server/paymentHandlers/index.ts
import { PaymentHandler } from "@/types/payments/paymentHandlers"
import { PaymentType } from "@/types/payments/paymentTypes"
import { enrollTelegramClassServer } from "@/lib/server/enrollTelegramClassServer"
import { enrollAsyncCoursesServer } from "@/lib/server/enrollAsyncCoursesServer"
import { removeCoursesFromCartServer } from "@/lib/server/cartServer"
import { enrollPhysicalClassServer } from "../enrollPhysicalClassServer"
import { adminDb } from "@/lib/firebase/admin-new"
// "async_course" | "physical_class" | "telegram_class"
export const paymentHandlers: Record<PaymentType, PaymentHandler> = {
    // Handle Telegram class enrollment
    telegram_class: async ({ userId, itemIds, metadata, paymentReference, payerEmail, price }) => {
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
            price,
            enrolledAt: new Date(),
            itemId: itemIds[0],
        })
    },
    // Handle physical course enrollment
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
    // Handle async course enrollment
    async_course: async ({ userId, itemIds, price, paymentReference }) => {
        await enrollAsyncCoursesServer({
            userId,
            courseIds: itemIds,
            paymentReference,
            price,
        })
        // REMOVE FROM DB CART (AUTHORITATIVE)
        await removeCoursesFromCartServer(userId, itemIds)
    },

    // Handle quote commitment payment
    quote_commitment: async ({ userId, itemIds, paymentReference, price }) => {
        const quoteId = itemIds[0]
        await adminDb.collection("quoteRequests").doc(quoteId).update({
            status: "in_progress",
            commitmentPaid: true,
            commitmentPaidAt: new Date(),
            commitmentReference: paymentReference,
            updatedAt: new Date(),
        })
    },

    // Handle quote balance payment
    quote_balance: async ({ userId, itemIds, paymentReference, price }) => {
        const quoteId = itemIds[0]
        await adminDb.collection("quoteRequests").doc(quoteId).update({
            status: "completed",
            balancePaid: true,
            balancePaidAt: new Date(),
            balanceReference: paymentReference,
            updatedAt: new Date(),
        })
    },
}
