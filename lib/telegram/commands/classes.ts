// // lib/telegram/commands/classes.ts
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
import { getActiveClasses } from "@/lib/telegram/services/getActiveClasses"
import { renderClassCard } from "@/lib/telegram/renderers/renderClassCard"

export default async function classes(ctx: TelegramContext) {
    try {
        const result = await getActiveClasses()

        if (!result || result.classes.length === 0) {
            await sendTelegramMessage(
                ctx.chatId,
                "⚠️ No active classes available at the moment.\nPlease check back later.",
            )
            return
        }

        await sendTelegramMessage(
            ctx.chatId,
            "🎓 *Bitkova2026A*\nAvailable Classes:\n────────────────────",
        )

        // await sendTelegramMessage(
        //     ctx.chatId,
        //     `🎓 *${result.cohort.name}*\nAvailable Classes:\n────────────────────`,
        // )

        // for (const c of result.classes) {
        //     const payUrl =
        //         c.type === "physical"
        //             ? `https://bitkova.com/pay/physical/${c.id}`
        //             : `https://bitkova.com/pay/telegram/${c.id}`

        //     await sendTelegramMessage(ctx.chatId, renderClassCard(c), {
        //         reply_markup: {
        //             inline_keyboard: [
        //                 [
        //                     {
        //                         text: "💳 Enroll",
        //                         url: payUrl,
        //                     },
        //                 ],
        //             ],
        //         },
        //     })
        // }
    } catch (err) {
        console.error("❌ /classes error:", err)

        await sendTelegramMessage(
            ctx.chatId,
            "⚠️ Unable to load available classes right now.\nPlease try again later.",
        )
    }
}
