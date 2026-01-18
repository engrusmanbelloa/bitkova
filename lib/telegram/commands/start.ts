// lib/telegram/commands/start.ts
import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { collection, addDoc, setDoc, doc, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"

export default async function start(ctx: TelegramContext) {
    console.log("start is hit:....")
    await setDoc(
        doc(db, "telegramUsers", String(ctx.from.id)),
        {
            telegramUserId: ctx.from.id,
            username: ctx.from.username ?? null,
            firstSeenAt: new Date(),
        },
        { merge: true },
    )
    await sendTelegramMessage(
        ctx.chatId,
        `👋 Welcome to *Bitkova Assistant*!

I help you with:
• Bitkova Classes
• Schedules
• Payments
• Learning resources

Type /help to continue.`,
    )
}
