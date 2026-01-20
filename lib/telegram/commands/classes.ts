// import { TelegramContext } from "@/types/telegram"
// import { sendTelegramMessage } from "@/lib/telegram/bot"

// export default async function classes(ctx: TelegramContext) {
//     await sendTelegramMessage(
//         ctx.chatId,
//         `🎓 **BITKOVA TRADING CLASSES**
// ────────────────────
// *Choose your preferred learning hub below:*

// 🌐 **1. Telegram Online**
// • [Join Live Classroom](https://t.me/+YOUR_INVITE_LINK)
// • _Accessible from anywhere_

// 📍 **2. Kano Physical Hub**
// • [View on Google Maps](https://maps.app.goo.gl/example1)
// • Location: Atlas Training Institute Opp BUK Main Gate Old Site, Kano

// 📍 **3. Gombe Physical Hub**
// • [View on Google Maps](https://maps.app.goo.gl/example2)
// • Location: C6 Duwa Plaza, Opp Old Bauchi Park, Gombe.

// 📍 **4. Kaduna Physical Hub**
// • [View on Google Maps](https://maps.app.goo.gl/example3)
// • Location: Almara Center, 32B Kanta road Unguwan Rimi Kaduna.

// 📍 **5. Bauchi Physical Hub**
// • [View on Google Maps](https://maps.app.goo.gl/example4)
// • Location: Reinsurance house, Bauchi.

// ────────────────────
// 💳 *Ready to start?*
// Use /payment to enroll in any of these classes.`,
//     )
// }
// lib/telegram/commands/classes.ts
import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"
import { getAvailableClasses } from "@/lib/telegram/services/getAvailableClasses"
import { renderClassesMessage } from "@/lib/telegram/renderers/renderClassesMessage"
import { renderClassButtons } from "@/lib/telegram/renderers/renderClassButtons"

export default async function classes(ctx: TelegramContext) {
    try {
        const data = await getAvailableClasses()

        if (!data) {
            await sendTelegramMessage(ctx.chatId, "🚫 No active classes at the moment.")
            return
        }
        const message = renderClassesMessage(data)
        const buttons = renderClassButtons(data)

        await sendTelegramMessage(ctx.chatId, message, {
            reply_markup: buttons.reply_markup,
        })
    } catch (err) {
        console.error("❌ /classes failed:", err)

        await sendTelegramMessage(
            ctx.chatId,
            "⚠️ Something went wrong loading classes. Please try again later.",
        )
    }
}
