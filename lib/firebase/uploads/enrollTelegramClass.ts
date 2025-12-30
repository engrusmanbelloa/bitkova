// lib/firebase/uploads/enrollTelegramClass.ts
import { doc, setDoc, updateDoc, increment } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { TelegramClassEnrollment } from "@/types/classTypes"
import { createTelegramInviteLink } from "@/lib/telegram/inviteLink"

interface EnrollTelegramClassParams {
    userId: string
    classId: string
    cohortId: string
    paymentReference: string
    telegramGroupId: string
}

export async function enrollTelegramClass({
    userId,
    classId,
    cohortId,
    paymentReference,
    telegramGroupId,
}: EnrollTelegramClassParams) {
    const enrollmentId = `${userId}-${classId}-${Date.now()}`

    // Generate Telegram invite link
    const inviteLink = await createTelegramInviteLink(telegramGroupId, userId)

    const enrollment: TelegramClassEnrollment = {
        id: enrollmentId,
        userId,
        classId,
        cohortId,
        paymentReference,
        telegramInviteLink: inviteLink,
        status: "paid",
        enrolledAt: new Date(),
    }

    // Save enrollment
    await setDoc(doc(db, "telegramClassEnrollments", enrollmentId), enrollment)

    // Update class enrolled count
    const classRef = doc(db, "telegramClasses", classId)
    await updateDoc(classRef, {
        enrolled: increment(1),
    })

    // Update user's enrollments list
    await setDoc(doc(db, "users", userId, "classEnrollments", enrollmentId), {
        enrollmentId,
        classId,
        type: "telegram_class",
        enrolledAt: new Date(),
    })

    return enrollment
}
