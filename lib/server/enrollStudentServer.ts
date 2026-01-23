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
    if ((await ref.get()).exists) {
        console.log(`⚠️ Enrollment ${enrollmentId} already exists`)
        return
    }

    const batch = adminDb.batch()
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
        console.log(`✅ Async course enrollment created for user ${userId}`)
    }

    // ---------------- TELEGRAM / PHYSICAL ----------------
    if (itemType !== "async_course") {
        if (!telegramGroupId) {
            throw new Error("Telegram group required for telegram/physical classes")
        }

        try {
            const realChatId = await resolveTelegramChatId(telegramGroupId)
            const inviteLink = await createTelegramInviteLink(realChatId, userId)

            if (inviteLink) {
                enrollment.inviteLink = inviteLink

                // 📧 Prepare email data
                const emailData = {
                    to: payerEmail,
                    cohortName: cohortName || className || "Class",
                    className: className || "Class",
                    inviteLink: inviteLink,
                }

                // 🎫 PHYSICAL CLASS: Generate QR Code
                if (itemType === "physical_class") {
                    const qrPayload = `BITKOVA PHYSICAL CLASS
Cohort: ${cohortName}
Class: ${className}
Enrolled: ${now.toLocaleDateString()}
Join: ${inviteLink}`

                    const qrCode = await QRCode.toDataURL(qrPayload, {
                        width: 400,
                        margin: 2,
                        color: {
                            dark: "#000000",
                            light: "#FFFFFF",
                        },
                    })
                    enrollment.qrCode = qrCode

                    // Send email with QR code
                    await sendEnrollmentEmail({
                        ...emailData,
                        status: "success",
                        physicalQrCode: qrCode,
                        // qrPayload
                    })

                    console.log(`📧 Physical class email with QR sent to ${payerEmail}`)

                    // Increment enrolled count
                    batch.update(adminDb.collection("physicalClasses").doc(itemId), {
                        enrolled: FieldValue.increment(1),
                    })
                }

                // 💬 TELEGRAM CLASS: Send email without QR
                if (itemType === "telegram_class") {
                    await sendEnrollmentEmail({ ...emailData, status: "success" })

                    console.log(`📧 Telegram class email sent to ${payerEmail}`)

                    // Increment enrolled count
                    batch.update(adminDb.collection("telegramClasses").doc(itemId), {
                        enrolled: FieldValue.increment(1),
                    })
                }
            } else {
                // ⏳ Invite link creation failed - mark as pending
                console.warn(`⚠️ Failed to create invite link for ${enrollmentId}`)

                await sendEnrollmentEmail({
                    to: payerEmail,
                    cohortName: cohortName || className || "class",
                    className: className || cohortName || "class",
                    status: "pending",
                })

                await markInvitePending({
                    userId,
                    email: payerEmail,
                    classId: itemId,
                    telegramGroupId,
                    cohortName: cohortName || className || "Class",
                    className: className || "Class",
                })

                console.log(`⏳ Invite marked as pending for ${payerEmail}`)
            }
        } catch (error) {
            console.error(`❌ Error during enrollment for ${itemType}:`, error)
        }
    }

    batch.set(ref, clean(enrollment))
    await batch.commit()

    console.log(`✅ Enrollment ${enrollmentId} committed successfully`)
}
