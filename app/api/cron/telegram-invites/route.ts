import { NextResponse } from "next/server"
import { collection, getDocs, query, where, limit, updateDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { createTelegramInviteLink } from "@/lib/telegram/inviteLink"
import { sendEnrollmentEmail } from "@/lib/email/sendEnrollmentEmail"

const MAX_ATTEMPTS = 1

export async function POST(req: Request) {
    const auth = req.headers.get("authorization")

    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response("Unauthorized", { status: 401 })
    }

    const q = query(
        collection(db, "telegramPendingInvites"),
        where("status", "==", "pending"),
        where("attempts", "<", MAX_ATTEMPTS),
        limit(10),
    )

    const snapshot = await getDocs(q)

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
                telegramInviteLink: inviteLink,
            })

            await updateDoc(doc(db, "telegramPendingInvites", snap.id), {
                status: "sent",
                updatedAt: new Date(),
            })
        } catch (err: any) {
            await updateDoc(doc(db, "telegramPendingInvites", snap.id), {
                attempts: data.attempts + 1,
                lastError: err.message,
                updatedAt: new Date(),
                status: data.attempts + 1 >= MAX_ATTEMPTS ? "failed" : "pending",
            })
        }
    }

    return NextResponse.json({ ok: true })
}
