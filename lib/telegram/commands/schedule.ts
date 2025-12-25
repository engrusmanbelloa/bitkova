import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export default async function schedule(ctx: TelegramContext) {
    await sendTelegramMessage(
        ctx.chatId,
        `📅 *CLASS SCHEDULE*
        
*🌐 Telegram Online (Live)*
└ Sat, Sun • 10:00 AM
└ Tue, Thu • 08:30 PM

*📍 Physical Hubs*
• *Kano (A):* Sat, Sun • 10:00 AM
• *Kano (B):* Sat, Sun • 02:00 PM
• *Bauchi:* Sat, Sun • 10:00 AM
• *Kaduna:* Sat, Sun • 10:00 AM
• *Gombe:* Sat, Sun • 02:00 PM`,
    )
}
