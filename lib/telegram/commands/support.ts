import { TelegramContext } from "@/types/telegram"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export default async function support(ctx: TelegramContext) {
    await sendTelegramMessage(
        ctx.chatId,
        `🆘 **BITKOVA SUPPORT CENTER**
────────────────────
*Have a question or need help? Reach out to our team via any of the channels below:*

🟢 **WhatsApp Support**
• \`+234 803 250 3624\`
• \`+234 803 610 7361\`

🔷 **Telegram Admins**
• @engrusmanbelloa
• @mahmoudsardauna

📧 **Email Inquiry**
• support@bitkova.com

────────────────────
_Our team typically responds within 1-2 hours._`,
    )
}
