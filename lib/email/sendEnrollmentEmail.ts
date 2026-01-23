// lib/email/sendEnrollmentEmail.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

interface EmailParams {
    to: string
    cohortName: string
    className: string
    inviteLink?: string
    physicalQrCode?: string
    status?: "success" | "pending"
}

export async function sendEnrollmentEmail({
    to,
    cohortName,
    className,
    inviteLink,
    physicalQrCode,
    status = "success",
}: EmailParams) {
    // console.log("📨 sendEnrollmentEmail called with:", {
    //     to,
    //     cohortName,
    //     className,
    //     status,
    //     hasTelegram: !!inviteLink,
    //     hasQr: !!physicalQrCode,
    // })

    let subject = `You're enrolled in ${cohortName}`
    let content = ``

    /* =======================
       ⏳ PENDING INVITE EMAIL
       ======================= */
    if (status === "pending") {
        subject = "Your Telegram Class Access Is Being Prepared ⏳"

        content = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
                <h2>⏳ Telegram Access In Progress</h2>

                <p>Hi,</p>

                <p>
                    Your payment was successful and your enrollment in
                    <strong>${cohortName} – ${className}</strong> is confirmed.
                </p>

                <p>
                    We’re currently generating your private Telegram access link.
                </p>

                <p style="background:#fff3cd;padding:12px;border-radius:6px;">
                    ⚠️ <strong>Please note:</strong><br/>
                    Telegram sometimes delays invite creation.
                    Your access link will be available within
                    <strong>24 hours</strong>.
                </p>

                <p>
                    You’ll receive another email immediately your link is ready.
                    You can go to https://www.bitkova.com/dashboard to retrieve it once it is ready.
                </p>

                <p>
                    👉 You can also retrieve your access via our Telegram bot:<br/>
                    <strong>@BitkovaAssistantBot</strong><br/>
                    using your <strong>Paystack reference</strong> or
                    <strong>registered email address</strong>.
                </p>

                <p>
                    Thank you for your patience 🙏<br/>
                    <strong>— Bitkova Team</strong>
                </p>
            </div>
        `
    }

    /* =======================
       🎉 SUCCESS EMAIL
       ======================= */
    if (status === "success") {
        content = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
                <h2>🎉 Enrollment Successful</h2>

                <p>
                    You’ve been successfully enrolled in
                    <strong>${cohortName} – ${className}</strong>.
                </p>
        `

        if (inviteLink) {
            content += `
                <p>
                    <a href="${inviteLink}"
                       style="display:inline-block;padding:10px 16px;
                              background:#2563eb;color:#fff;
                              text-decoration:none;border-radius:6px;">
                        👉 Join Telegram Class
                    </a>
                </p>
                <p><strong>Note:</strong> This link is single-use.</p>
                <p>
                 👉 Your link is also available at https://www.bitkova.com/dashboard and <strong>t.me/@BitkovaAssistantBot</strong><br/>
                </p>
            `
        }

        if (physicalQrCode) {
            content += `
                <hr/>
                <p>📍 <strong>Physical Class Access</strong></p>
                <p>Present this QR code at the venue:</p>
                <img src="${physicalQrCode}" width="220" />
            `
        }

        content += `
                <p>
                    Welcome aboard 🚀<br/>
                    <strong>— Bitkova Team</strong>
                </p>
            </div>
        `
    }

    try {
        await resend.emails.send({
            from: "Bitkova <no-reply@bitkova.com>",
            to,
            subject,
            html: content,
        })

        console.log("📨 Enrollment email sent to:", to)
    } catch (error) {
        console.error("❌ Error sending enrollment email:", error)
        throw error
    }
}
