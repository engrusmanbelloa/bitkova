// app/api/paystack/webhook/route.ts
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { paymentHandlers } from "@/lib/server/paymentHandlers"
import { PaymentType } from "@/types/payments/paymentTypes"

// const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!
const IS_PRODUCTION = process.env.NODE_ENV === "production"

export async function POST(req: NextRequest) {
    const env = IS_PRODUCTION ? "🟢 PRODUCTION" : "🟡 DEVELOPMENT"
    console.log(`${env} Paystack webhook hit`)
    console.log("Headers:", Object.fromEntries(req.headers))
    const rawBody = await req.text()
    const signature = req.headers.get("x-paystack-signature")

    console.log("Secret Key Exists:", !!PAYSTACK_SECRET)
    console.log("Signature Received:", signature)
    // Log which key type is being used
    const keyType = PAYSTACK_SECRET?.startsWith("sk_test_") ? "TEST" : "LIVE"
    console.log(`${env} Using ${keyType} secret key`)

    if (!signature || !PAYSTACK_SECRET) {
        console.error(" Missing signature or secret")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify signature
    const hash = crypto.createHmac("sha512", PAYSTACK_SECRET).update(rawBody).digest("hex")

    if (hash !== signature) {
        console.error("Invalid signature")
        console.log("Expected:", hash)
        console.log("Received:", signature)
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event = JSON.parse(rawBody)
    console.log(`${env} Event:`, event.event)
    console.log(`${env} Metadata:`, event.data?.metadata)

    // We only care about successful charges
    if (event.event !== "charge.success") {
        console.log(" Not a charge.success event")
        return NextResponse.json({ ok: true })
    }

    const data = event.data
    const metadata = data.metadata
    const amountPaid = data.amount / 100
    const paymentType = metadata.paymentType as PaymentType

    console.log("Processing payment for:", metadata.paymentType)
    console.log("Processing payment for price:", data.amount / 100)

    const handler = paymentHandlers[paymentType]

    if (!handler) {
        console.log("No payment handler for type:", metadata.paymentType)
        return NextResponse.json({ ok: true })
    }

    try {
        await handler({
            userId: metadata.userId,
            itemIds: metadata.itemIds,
            metadata,
            paymentReference: data.reference,
            payerEmail: data.customer.email,
            price: amountPaid,
        })
        // console.log(" Payment processed successfully!")
        return NextResponse.json({ ok: true })
    } catch (err) {
        console.error("Webhook processing error:", err)
        return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
    }
}
