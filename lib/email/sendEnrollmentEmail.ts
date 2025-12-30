// lib/email/sendEnrollmentEmail.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendEnrollmentEmail({
    to,
    cohortName,
    telegramInviteLink,
}: {
    to: string
    cohortName: string
    telegramInviteLink: string
}) {
    await resend.emails.send({
        from: "Bitkova <classes@bitkova.com>",
        to,
        subject: `You're enrolled in ${cohortName}`,
        html: `
            <h2>🎉 Enrollment Successful</h2>
            <p>You’ve been enrolled in <strong>${cohortName}</strong>.</p>

            <p><a href="${telegramInviteLink}">👉 Join Telegram Class</a></p>

            <p><strong>Important:</strong> This link is single-use.</p>
        `,
    })
}
