// lib/server/enrollStudentServer.ts
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import QRCode from "qrcode"
import { createTelegramInviteLink } from "@/lib/telegram/inviteLink"
import { resolveTelegramChatId } from "@/lib/telegram/resolveChatId"
import { sendEnrollmentEmail } from "@/lib/email/sendEnrollmentEmail"
import { markInvitePending } from "@/lib/telegram/markInvitePending"
import { Enrollment, EnrollmentType } from "@/types/userType"

interface Params {
    userId: string
    itemId: string
    itemType: EnrollmentType

    cohortId?: string
    className?: string
    cohortName?: string

    telegramGroupId?: string
    payerEmail: string

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
        payerEmail,
        paymentReference,
        enrolledBy,
    } = params

    const enrollmentId = `${userId}-${itemId}`

    const ref = adminDb.collection("enrollments").doc(enrollmentId)

    // ✅ Idempotency
    if ((await ref.get()).exists) return

    const batch = adminDb.batch()

    // const batch = writeBatch(db)
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
            // Send email if invite link creation is successfull
            await sendEnrollmentEmail({
                to: payerEmail,
                cohortName: cohortName || className || "Class",
                className: className || "Class",
                telegramInviteLink: inviteLink,
            })
        } else {
            // Mark as pending if invite link creation failed
            if (payerEmail) {
                await markInvitePending({
                    userId,
                    email: payerEmail,
                    classId: itemId,
                    telegramGroupId,
                    cohortName: cohortName || className || "Class",
                    className: className || "Class",
                })
                // console.log(`⏳ Invite marked as pending for ${payerEmail}`)
            }
        }

        if (itemType === "physical_class") {
            const qrPayload = {
                inviteLink,
            }

            enrollment.qrCode = await QRCode.toDataURL(JSON.stringify(qrPayload))

            batch.update(adminDb.collection("physicalClasses").doc(itemId), {
                enrolled: FieldValue.increment(1),
            })
        }

        if (itemType === "telegram_class") {
            batch.update(adminDb.collection("telegramClasses").doc(itemId), {
                enrolled: FieldValue.increment(1),
            })
        }
    }

    batch.set(ref, clean(enrollment))
    await batch.commit()
}
