// // lib/email/sendEnrollmentEmail.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

interface EmailParams {
    to: string
    cohortName: string
    className: string
    telegramInviteLink?: string
    physicalQrCode?: string
}

export async function sendEnrollmentEmail({
    to,
    cohortName,
    className,
    telegramInviteLink,
    physicalQrCode,
}: EmailParams) {
    console.log("📨 sendEnrollmentEmail called with:", {
        to: to,
        cohortName: cohortName,
        className: className,
        hasTelegram: !!telegramInviteLink,
        hasQr: !!physicalQrCode,
    })
    let content = `
        <h2>🎉 Enrollment Successful</h2>
        <p>You’ve been enrolled in <strong>${cohortName} - ${className}</strong>.</p>
    `

    if (telegramInviteLink) {
        content += `
            <p>
                <a href="${telegramInviteLink}">
                    👉 Join Telegram Class
                </a>
            </p>
            <p><strong>Note:</strong> This link is single-use.</p>
        `
    }

    if (physicalQrCode) {
        content += `
            <p>📍 <strong>Physical Class Access</strong></p>
            <p>Present this QR code at the venue:</p>
            <img src="${physicalQrCode}" width="220" />
        `
    }
    try {
        const res = await resend.emails.send({
            // from: "Bitkova <classes@bitkova.com>",
            from: "Bitkova <onboarding@resend.dev>",
            to,
            subject: `You're enrolled in ${cohortName}`,
            html: content,
        })
        console.log("📨 Enrollment email sent:", res)
    } catch (error) {
        console.error("❌ Error sending enrollment email:", error)
        throw error
    }
}
