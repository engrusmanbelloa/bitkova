// app/api/webhook/paystack/route.ts
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { db } from "@/lib/firebase/client"
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"

// Verify Paystack signature
function verifySignature(body: string, signature: string): boolean {
    const hash = crypto
        .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
        .update(body)
        .digest("hex")
    return hash === signature
}

// Create Telegram invite link
async function createTelegramInvite(chatId: string, userId: string): Promise<string> {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const url = `https://api.telegram.org/bot${botToken}/createChatInviteLink`

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            name: `Student-${userId.slice(0, 8)}`,
            member_limit: 1, // Single use
            expire_date: Math.floor(Date.now() / 1000) + 86400, // 24 hours
        }),
    })

    const data = await response.json()
    if (!data.ok) {
        throw new Error(`Telegram error: ${data.description}`)
    }

    return data.result.invite_link
}

// Generate QR code
async function generateQRCode(enrollmentId: string): Promise<string> {
    const QRCode = require("qrcode")
    const qrData = {
        enrollmentId,
        timestamp: Date.now(),
        type: "physical_class",
    }
    return await QRCode.toDataURL(JSON.stringify(qrData))
}

// Send email notification
async function sendEmail(
    email: string,
    className: string,
    inviteLink?: string,
    qrCode?: string,
): Promise<void> {
    // TODO: Implement with your email service (Resend, SendGrid, etc.)
    console.log("Sending email to:", email, "for class:", className)

    // Example with Resend:
    // await fetch('https://api.resend.com/emails', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         from: 'Bitkova Academy <noreply@bitkova.com>',
    //         to: email,
    //         subject: `Welcome to ${className}`,
    //         html: generateEmailHTML(className, inviteLink, qrCode),
    //     }),
    // })
}

export async function POST(request: NextRequest) {
    try {
        const rawBody = await request.text()
        const signature = request.headers.get("x-paystack-signature")

        // Verify webhook signature
        if (!signature || !verifySignature(rawBody, signature)) {
            console.error("Invalid webhook signature")
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
        }

        const event = JSON.parse(rawBody)

        // Only process successful charges
        if (event.event !== "charge.success") {
            return NextResponse.json({ received: true })
        }

        const { reference, metadata, customer } = event.data
        const { type, items } = metadata

        console.log("Processing payment:", { reference, type, items })

        // Courses are handled immediately on the client side
        if (type === "course") {
            return NextResponse.json({ success: true, message: "Course payment processed" })
        }

        // Handle physical and telegram class enrollments
        if (type === "physical" || type === "telegram") {
            for (const item of items) {
                try {
                    // Find pending enrollment
                    const enrollmentsRef = collection(db!, "classEnrollments")
                    const q = query(
                        enrollmentsRef,
                        where("paymentReference", "==", reference),
                        where("classId", "==", item.id),
                    )

                    const enrollmentSnapshot = await getDocs(q)

                    if (enrollmentSnapshot.empty) {
                        console.warn("No enrollment found for:", item.id, reference)
                        continue
                    }

                    const enrollmentDoc = enrollmentSnapshot.docs[0]
                    const enrollmentData = enrollmentDoc.data()

                    // Get class details
                    const classDocRef = doc(db!, "classes", item.id)
                    const classDocSnap = await getDoc(classDocRef)

                    if (!classDocSnap.exists()) {
                        console.error("Class not found:", item.id)
                        continue
                    }

                    const classData = classDocSnap.data()

                    let telegramInviteLink: string | undefined
                    let qrCode: string | undefined

                    // Generate access credentials based on type
                    if (type === "telegram" && classData.telegramGroupId) {
                        console.log("Generating Telegram invite for:", enrollmentData.userId)
                        telegramInviteLink = await createTelegramInvite(
                            classData.telegramGroupId,
                            enrollmentData.userId,
                        )
                    } else if (type === "physical") {
                        console.log("Generating QR code for:", enrollmentDoc.id)
                        qrCode = await generateQRCode(enrollmentDoc.id)
                    }

                    // Update enrollment with access details
                    await updateDoc(doc(db!, "classEnrollments", enrollmentDoc.id), {
                        status: "paid",
                        telegramInviteLink,
                        qrCode,
                        verifiedAt: new Date(),
                        expiresAt:
                            type === "telegram"
                                ? new Date(Date.now() + 86400000) // 24 hours
                                : null,
                    })

                    // Send email notification
                    await sendEmail(customer.email, classData.name, telegramInviteLink, qrCode)

                    console.log("Enrollment completed:", enrollmentDoc.id)
                } catch (itemError) {
                    console.error("Error processing item:", item.id, itemError)
                }
            }

            return NextResponse.json({
                success: true,
                message: "Class enrollments processed",
            })
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error("Webhook error:", error)
        return NextResponse.json(
            { error: "Webhook processing failed", details: error.message },
            { status: 500 },
        )
    }
}

// For testing the webhook locally
export async function GET() {
    return NextResponse.json({
        message: "Webhook endpoint is active",
        timestamp: new Date().toISOString(),
    })
}
