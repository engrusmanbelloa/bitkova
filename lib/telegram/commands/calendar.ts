// import { TelegramContext } from "@/types/telegram"
// import { sendTelegramMessage } from "@/lib/telegram/bot"
// export default async function calendar(ctx: TelegramContext) {
//     await sendTelegramMessage(
//         ctx.chatId,
//         `🗓 **BITKOVA CALENDAR: Q1 2025**
// ────────────────────

// 📅 **FEBRUARY KICKOFF**
// • \`Feb 01\` | 🚀 **Classes Begin** (All Hubs)
// • \`Feb 15\` | 💡 Tech Founders Workshop
// • \`Feb 28\` | 🏆 Monthly Code Sprint

// ---

// 🌐 **TELEGRAM LIVE SESSIONS**
// \`Sat & Sun\` — 10:00 AM
// \`Tue & Thu\` — 08:30 PM

// 📍 **PHYSICAL HUB HOURS**
// • **Kano (A/B):** 10:00 AM / 02:00 PM
// • **Bauchi:** 10:00 AM
// • **Kaduna:** 10:00 AM
// • **Gombe:** 02:00 PM

// ────────────────────
// _Tap a date to copy or sync to your personal calendar._`,
//     )
// }
// lib/telegram/commands/calendar.ts
import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { getSchedule } from "@/lib/telegram/services/getSchedule"

export default async function calendar(ctx: TelegramContext) {
    const data = await getSchedule()
    if (!data) {
        await sendTelegramMessage(ctx.chatId, "🚫 No calendar available at the moment.")
        return
    }

    let msg = `📅 *${data.cohortName} Calendar*\n────────────────────\n`

    data.telegramClasses.forEach((c: any) => {
        msg += `🌐 ${c.name}: ${c.schedule?.days ?? "TBD"} | ${c.schedule?.time ?? "TBD"}\n`
    })

    data.physicalClasses.forEach((c: any) => {
        msg += `📍 ${c.name}: ${c.schedule?.days ?? "TBD"} | ${c.schedule?.time ?? "TBD"}\n`
    })

    msg += `────────────────────\n`
    msg += `_Use /classes to enroll_`

    await sendTelegramMessage(ctx.chatId, msg)
}
