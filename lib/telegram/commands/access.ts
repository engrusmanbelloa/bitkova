import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { getTelegramAccess } from "@/lib/telegram/services/getTelegramAccess"

export default async function access(ctx: TelegramContext) {
    const enrollments = await getTelegramAccess(ctx.from.id)
    // const access = await getTelegramAccess(ctx.telegramUserId)

    if (!enrollments.length) {
        await sendTelegramMessage(
            ctx.chatId,
            `🔐 You are not enrolled in any Telegram class yet.\n\nUse /classes to view available classes.`,
        )
        return
    }

    let msg = `✅ *Your Telegram Class Access*\n\n`

    enrollments.forEach((e: any) => {
        msg += `• ${e.className}\n`
        msg += `${e.telegramInviteLink ?? "Invite pending"}\n\n`
    })

    await sendTelegramMessage(ctx.chatId, msg)
}
