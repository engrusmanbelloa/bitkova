// import { TelegramContext } from "@/types/telegram"
// import { sendTelegramMessage } from "@/lib/telegram/bot"

// export default async function schedule(ctx: TelegramContext) {
//     await sendTelegramMessage(
//         ctx.chatId,
//         `📅 *CLASS SCHEDULE*

// *🌐 Telegram Online (Live)*
// └ Sat, Sun • 10:00 AM
// └ Tue, Thu • 08:30 PM

// *📍 Physical Hubs*
// • *Kano (A):* Sat, Sun • 10:00 AM
// • *Kano (B):* Sat, Sun • 02:00 PM
// • *Bauchi:* Sat, Sun • 10:00 AM
// • *Kaduna:* Sat, Sun • 10:00 AM
// • *Gombe:* Sat, Sun • 02:00 PM`,
//     )
// }
// lib/telegram/commands/schedule.ts
import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { getSchedule } from "@/lib/telegram/services/getSchedule"
import { renderScheduleMessage } from "@/lib/telegram/renderers/renderScheduleMessage"

export default async function schedule(ctx: TelegramContext) {
    const data = await getSchedule()

    if (!data) {
        await sendTelegramMessage(ctx.chatId, "🚫 No schedule available at the moment.")
        return
    }

    const message = renderScheduleMessage(data)
    await sendTelegramMessage(ctx.chatId, message)
}
