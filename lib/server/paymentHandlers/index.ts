// lib/server/paymentHandlers/index.ts
import { PaymentHandler } from "@/types/payments/paymentHandlers"
import { PaymentType } from "@/types/payments/paymentTypes"
import { enrollTelegramClassServer } from "@/lib/server/enrollTelegramClassServer"
import { enrollAsyncCoursesServer } from "@/lib/server/enrollAsyncCoursesServer"
import { removeCoursesFromCartServer } from "@/lib/server/cartServer"
import { enrollPhysicalClassServer } from "../enrollPhysicalClassServer"
import { adminDb } from "@/lib/firebase/admin-new"
import { sendQuoteEmail } from "@/lib/email/sendQuoteEmail"
import { getBusinessDevEmails } from "@/lib/email/getStaffEmails"

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
        const quoteSnap = await adminDb.collection("quoteRequests").doc(quoteId).get()
        const quote = quoteSnap.data()
        const userSnap = await adminDb.collection("users").doc(userId).get()
        const userEmail = userSnap.data()?.email

        await adminDb.collection("quoteRequests").doc(quoteId).update({
            status: "in_progress",
            commitmentPaid: true,
            commitmentPaidAt: new Date(),
            commitmentReference: paymentReference,
            updatedAt: new Date(),
        })
        // Email both admin and user
        await Promise.all([
            sendQuoteEmail({
                event: "commitment_paid",
                to: await getBusinessDevEmails(),
                isAdmin: true,
                orgName: quote?.orgName,
                userName: quote?.userName,
                service: quote?.service,
                commitmentAmount: quote?.commitmentAmount,
                quoteId,
            }),
            sendQuoteEmail({
                event: "commitment_paid",
                to: userEmail,
                isAdmin: false,
                orgName: quote?.orgName,
                userName: quote?.userName,
                service: quote?.service,
                commitmentAmount: quote?.commitmentAmount,
                quoteId,
            }),
        ])
    },

    // Handle quote balance payment
    quote_balance: async ({ userId, itemIds, paymentReference, price }) => {
        const quoteId = itemIds[0]
        const quoteSnap = await adminDb.collection("quoteRequests").doc(quoteId).get()
        const quote = quoteSnap.data()
        const userSnap = await adminDb.collection("users").doc(userId).get()
        const userEmail = userSnap.data()?.email

        await adminDb.collection("quoteRequests").doc(quoteId).update({
            status: "completed",
            balancePaid: true,
            balancePaidAt: new Date(),
            balanceReference: paymentReference,
            updatedAt: new Date(),
        })

        // Email both admin and user
        await Promise.all([
            sendQuoteEmail({
                event: "balance_paid",
                to: await getBusinessDevEmails(),
                isAdmin: true,
                orgName: quote?.orgName,
                userName: quote?.userName,
                service: quote?.service,
                commitmentAmount: quote?.commitmentAmount,
                quoteId,
            }),
            sendQuoteEmail({
                event: "balance_paid",
                to: userEmail,
                isAdmin: false,
                orgName: quote?.orgName,
                userName: quote?.userName,
                service: quote?.service,
                commitmentAmount: quote?.commitmentAmount,
                quoteId,
            }),
        ])
    },
}
