// // app/api/paystack/webhook/route.ts
// import { NextRequest, NextResponse } from "next/server"
// import crypto from "crypto"
// import { enrollTelegramClass } from "@/lib/firebase/uploads/enrollTelegramClass"
// import { sendEnrollmentEmail } from "@/lib/email/sendEnrollmentEmail"

// export async function POST(req: NextRequest) {
//     const body = await req.text()
//     const signature = req.headers.get("x-paystack-signature")!

//     const hash = crypto
//         .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
//         .update(body)
//         .digest("hex")

//     if (hash !== signature) {
//         return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
//     }

//     const event = JSON.parse(body)

//     if (event.event === "charge.success") {
//         const data = event.data
//         const meta = data.metadata

//         if (meta.classType === "telegram_class") {
//             const enrollment = await enrollTelegramClass({
//                 userId: meta.userId,
//                 classId: meta.itemIds[0],
//                 cohortId: meta.cohortId,
//                 paymentReference: data.reference,
//                 telegramGroupId: meta.telegramGroupId,
//             })

//             await sendEnrollmentEmail({
//                 to: data.customer.email,
//                 cohortName: meta.class_name,
//                 telegramInviteLink: enrollment.telegramInviteLink,
//             })
//         }
//     }

//     return NextResponse.json({ ok: true })
// }

// app/api/paystack/webhook/route.ts
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { enrollTelegramClassServer } from "@/lib/server//enrollTelegramClassServer"

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!

export async function POST(req: NextRequest) {
    const rawBody = await req.text()
    const signature = req.headers.get("x-paystack-signature")

    if (!signature || !PAYSTACK_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // ✅ Verify signature
    const hash = crypto.createHmac("sha512", PAYSTACK_SECRET).update(rawBody).digest("hex")

    if (hash !== signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event = JSON.parse(rawBody)

    // ✅ We only care about successful charges
    if (event.event !== "charge.success") {
        return NextResponse.json({ ok: true })
    }

    const data = event.data
    const metadata = data.metadata

    try {
        if (metadata.classType === "telegram_class") {
            await enrollTelegramClassServer({
                userId: metadata.userId,
                classId: metadata.itemIds[0],
                cohortId: metadata.cohortId,
                telegramGroupId: metadata.telegramGroupId,
                paymentReference: data.reference,
                payerEmail: data.customer.email,
            })
        }

        return NextResponse.json({ ok: true })
    } catch (err) {
        console.error("Paystack webhook error:", err)
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
    }
}
