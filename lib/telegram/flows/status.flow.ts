// lib/telegram/flows/status.flow.ts
import { adminDb } from "@/lib/firebase/admin"
import { findEnrollmentByRecovery } from "../services/findEnrollmentByRecovery"
import { renderEnrollmentStatus } from "../renderers/renderEnrollmentStatus"
import { sendTelegramMessage } from "../bot"

export async function statusFlow(ctx: any, session: any) {
    const input = ctx.text.trim()

    const enrollment = await findEnrollmentByRecovery(input)

    if (!enrollment) {
        await sendTelegramMessage(ctx.chatId, "❌ No enrollment found.\nTry again or type /cancel.")
        return
    }

    await sendTelegramMessage(ctx.chatId, renderEnrollmentStatus(enrollment))

    // Exit flow
    // await deleteDoc(doc(db!, "telegramSessions", String(ctx.chatId)))
    await adminDb.collection("telegramSessions").doc(String(ctx.chatId)).delete()
}
