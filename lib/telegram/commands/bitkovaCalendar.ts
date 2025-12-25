import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
export default async function bitkovaCalendar(ctx: TelegramContext) {
    await sendTelegramMessage(
        ctx.chatId,
        `🗓 **BITKOVA CALENDAR: Q1 2025**
────────────────────

📅 **FEBRUARY KICKOFF**
• \`Feb 01\` | 🚀 **Classes Begin** (All Hubs)
• \`Feb 15\` | 💡 Tech Founders Workshop
• \`Feb 28\` | 🏆 Monthly Code Sprint

---

🌐 **TELEGRAM LIVE SESSIONS**
\`Sat & Sun\` — 10:00 AM
\`Tue & Thu\` — 08:30 PM

📍 **PHYSICAL HUB HOURS**
• **Kano (A/B):** 10:00 AM / 02:00 PM
• **Bauchi:** 10:00 AM
• **Kaduna:** 10:00 AM
• **Gombe:** 02:00 PM

────────────────────
_Tap a date to copy or sync to your personal calendar._`,
    )
}
