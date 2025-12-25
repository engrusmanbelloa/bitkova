import { NextRequest, NextResponse } from "next/server"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export async function GET() {
    return new Response("Telegram webhook running ✅", { status: 200 })
}

export async function POST(req: NextRequest) {
    try {
        const update = await req.json()

        const message = update.message
        if (!message || !message.text) {
            return NextResponse.json({ ok: true })
        }

        const chatId = message.chat.id
        const text = message.text.trim()

        // Command routing
        switch (text) {
            case "/start":
                await sendTelegramMessage(
                    chatId,
                    `👋 Welcome to *Bitkova Assistant*!

                     I help you with:
                     • Bitkova Classes
                     • Schedules
                     • Payments
                     • Learning resources

                     Type /help to see all commands.`,
                )
                break

            case "/help":
                await sendTelegramMessage(
                    chatId,
                    `/classes - View available classes
                     /schedule - Check class schedules
                     /payment - Payment instructions
                     /access - Get class access link
                     /resources - Learning materials
                     /support - Contact support`,
                )
                break

            case "/classes":
                await sendTelegramMessage(
                    chatId,
                    `📚 *Bitkova Crypto Trading Physical Classes*

                        1️⃣ Telegram online class
                        2️⃣ Kano physical class
                        3️⃣ Gombe physical class 
                        4️⃣ Kaduna physical class
                        5️⃣ Bauchi physical class

                        Use /payment to enroll in any of the above classes.`,
                )
                break

            case "/schedule":
                await sendTelegramMessage(
                    chatId,
                    `🗓 *Class Schedule*

                     • Telegram online class: Weekends 10am, Tue, Thu, 830pm
                     • Kano: Batch A: Weekends 10am, Batch B: 2pm
                     • Bauchi: Weekends 10am,
                     • Kaduna: Weekends 10am,
                     • Gombe:  Weekends 2pm`,
                )
                break

            case "/payment":
                await sendTelegramMessage(
                    chatId,
                    `💳 *Payment*

                     Pay securely via Paystack:
                     👉 https://paystack.com/pay/bitkova-classes

                     After payment, use /access.`,
                )
                break

            case "/access":
                await sendTelegramMessage(
                    chatId,
                    `🔐 *Class Access*

                     Once your payment is confirmed, your class link will be sent here automatically.`,
                )
                break

            case "/support":
                await sendTelegramMessage(
                    chatId,
                    `🆘 *Support*

                     WhatsApp: +234 803 250 3624 0r +234 803 610 7361
                     Email: support@bitkova.com`,
                )
                break

            default:
                await sendTelegramMessage(
                    chatId,
                    `❓ Unknown command.

                     Type /help to see available commands.`,
                )
        }

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error("Telegram Webhook Error:", error)
        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}
