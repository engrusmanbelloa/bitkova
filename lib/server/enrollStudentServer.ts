// lib/server/enrollStudentServer.ts
import { db } from "@/lib/firebase/client"
import { doc, writeBatch, getDoc, increment } from "firebase/firestore"
import QRCode from "qrcode"
import { createTelegramInviteLink } from "@/lib/telegram/inviteLink"
import { resolveTelegramChatId } from "@/lib/telegram/resolveChatId"
import { Enrollment, EnrollmentType } from "@/types/userType"

interface Params {
    userId: string
    itemId: string
    itemType: EnrollmentType

    cohortId?: string
    className?: string
    cohortName?: string

    telegramGroupId?: string
    payerEmail?: string

    paymentReference: string
    enrolledBy: "payment" | "admin"
}

function clean<T extends Record<string, any>>(obj: T): T {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as T
}

export async function enrollStudentServer(params: Params) {
    const {
        userId,
        itemId,
        itemType,
        cohortId,
        className,
        cohortName,
        telegramGroupId,
        paymentReference,
        enrolledBy,
    } = params

    const enrollmentId = `${userId}-${itemId}`
    const ref = doc(db, "enrollments", enrollmentId)

    // ✅ Idempotency
    if ((await getDoc(ref)).exists()) return

    const batch = writeBatch(db)
    const now = new Date()

    const enrollment: Enrollment = {
        id: enrollmentId,
        userId,
        itemId,
        itemType,
        cohortId,
        className,
        cohortName,
        paymentReference,
        status: enrolledBy === "admin" ? "active" : "paid",
        enrolledAt: now,
    }

    // ---------------- ASYNC COURSE ----------------
    if (itemType === "async_course") {
        enrollment.progress = 0
        enrollment.completedLessons = 0
        enrollment.completedVideos = []
    }

    // ---------------- TELEGRAM / PHYSICAL ----------------
    if (itemType !== "async_course") {
        if (!telegramGroupId) {
            throw new Error("Telegram group required")
        }

        const realChatId = await resolveTelegramChatId(telegramGroupId)
        const inviteLink = await createTelegramInviteLink(realChatId, userId)

        if (inviteLink) {
            enrollment.telegramInviteLink = inviteLink
        }

        if (itemType === "physical_class") {
            const qrPayload = {
                inviteLink,
            }

            enrollment.qrCode = await QRCode.toDataURL(JSON.stringify(qrPayload))

            batch.update(doc(db, "physicalClasses", itemId), {
                enrolled: increment(1),
            })
        }

        if (itemType === "telegram_class") {
            batch.update(doc(db, "telegramClasses", itemId), {
                enrolled: increment(1),
            })
        }
    }

    batch.set(ref, clean(enrollment))
    await batch.commit()
}
