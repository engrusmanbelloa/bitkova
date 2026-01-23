// app/api/cron/telegram-invites/route.ts
import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import { createTelegramInviteLink } from "@/lib/telegram/inviteLink"
import { sendEnrollmentEmail } from "@/lib/email/sendEnrollmentEmail"

const MAX_ATTEMPTS = 5

export async function GET(req: Request) {
    const auth = req.headers.get("authorization")

    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response("Unauthorized", { status: 401 })
    }

    const snapshot = await adminDb
        .collection("telegramPendingInvites")
        .where("status", "==", "pending")
        .where("attempts", "<", MAX_ATTEMPTS)
        .limit(10)
        .get()

    for (const snap of snapshot.docs) {
        const data = snap.data()

        try {
            const inviteLink = await createTelegramInviteLink(data.chatId, data.userId)

            if (!inviteLink) {
                throw new Error("Telegram invite still failed")
            }

            await sendEnrollmentEmail({
                to: data.email,
                cohortName: data.cohortName,
                className: data.className,
                inviteLink: inviteLink,
            })

            await snap.ref.update({
                status: "sent",
                updatedAt: FieldValue.serverTimestamp(),
            })
        } catch (err: any) {
            const attempts = (data.attempts ?? 0) + 1
            await snap.ref.update({
                attempts,
                lastError: err.message,
                status: attempts >= MAX_ATTEMPTS ? "failed" : "pending",
                updatedAt: FieldValue.serverTimestamp(),
            })
        }
    }

    return NextResponse.json({ ok: true })
}
