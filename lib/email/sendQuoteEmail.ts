// lib/email/sendQuoteEmail.ts
import { Resend } from "resend"
import { QuoteDeliverable } from "@/types/quotes/quoteTypes"

const resend = new Resend(process.env.RESEND_API_KEY!)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@bitkova.com"

const SERVICE_LABELS: Record<string, string> = {
    web: "Web & App Development",
    blockchain: "Blockchain Development",
    design: "Graphics & UI/UX Design",
    event: "Event Hosting",
}

export type QuoteEmailEvent =
    | "new_request" // → admin
    | "quote_sent" // → user
    | "commitment_paid" // → admin + user
    | "work_started" // → user
    | "balance_paid" // → admin + user

interface QuoteEmailParams {
    event: QuoteEmailEvent
    to: string | string[]
    isAdmin?: boolean
    orgName: string
    userName: string
    service: string
    quotedPrice?: number
    commitmentAmount?: number
    balanceAmount?: number
    adminNote?: string
    workNote?: string
    deliverables?: QuoteDeliverable[]
    quoteId: string
}

export async function sendQuoteEmail(params: QuoteEmailParams) {
    const {
        event,
        to,
        orgName,
        userName,
        service,
        quotedPrice,
        commitmentAmount,
        balanceAmount,
        adminNote,
        workNote,
        deliverables,
        quoteId,
    } = params

    const serviceLabel = SERVICE_LABELS[service] ?? service
    const dashboardUrl = "https://www.bitkova.com/dashboard"
    const adminUrl = "https://www.bitkova.com/console"

    let subject = ""
    let html = ""

    switch (event) {
        case "new_request":
            subject = `📋 New Quote Request — ${serviceLabel} from ${orgName}`
            html = `
                <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
                    <h2>📋 New Quote Request</h2>
                    <p><strong>From:</strong> ${orgName} (${userName})</p>
                    <p><strong>Service:</strong> ${serviceLabel}</p>
                    <p><strong>Quote ID:</strong> ${quoteId}</p>
                    <p>
                        <a href="${adminUrl}"
                           style="display:inline-block;padding:10px 18px;
                                  background:#1565c0;color:#fff;
                                  text-decoration:none;border-radius:6px;">
                            Review & Respond in Admin Panel →
                        </a>
                    </p>
                </div>`
            break

        case "quote_sent":
            subject = `💼 Your Quote is Ready — ${serviceLabel}`
            html = `
                <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
                    <h2>💼 Your Quote from Bitkova is Ready</h2>
                    <p>Hi ${userName},</p>
                    <p>We've reviewed your request for <strong>${serviceLabel}</strong> and prepared a quote.</p>
                    ${adminNote ? `<p><strong>Note from our team:</strong> ${adminNote}</p>` : ""}
                    <table style="border-collapse:collapse;width:100%;max-width:400px;margin:16px 0;">
                        <tr>
                            <td style="padding:8px;border:1px solid #eee;">Total</td>
                            <td style="padding:8px;border:1px solid #eee;font-weight:700;">₦${quotedPrice?.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td style="padding:8px;border:1px solid #eee;">Commitment (25%)</td>
                            <td style="padding:8px;border:1px solid #eee;">₦${commitmentAmount?.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td style="padding:8px;border:1px solid #eee;">Balance (75%)</td>
                            <td style="padding:8px;border:1px solid #eee;">₦${balanceAmount?.toLocaleString()}</td>
                        </tr>
                    </table>
                    <p>
                        <a href="${dashboardUrl}"
                           style="display:inline-block;padding:10px 18px;
                                  background:#1565c0;color:#fff;
                                  text-decoration:none;border-radius:6px;">
                            Review Quote & Pay →
                        </a>
                    </p>
                    <p style="color:#666;font-size:13px;">
                        Pay 25% commitment to get started. Balance is due on completion.
                    </p>
                </div>`
            break

        case "commitment_paid":
            subject = `✅ Commitment Payment Received — ${serviceLabel}`
            html = `...${
                params.isAdmin
                    ? `<strong>${orgName}</strong> has paid the 25% commitment (₦${commitmentAmount?.toLocaleString()}) for <strong>${serviceLabel}</strong>. Work can begin.
                     <p>
                        <a href="${adminUrl}"
                           style="display:inline-block;padding:10px 18px;
                                  background:#1565c0;color:#fff;
                                  text-decoration:none;border-radius:6px;">
                            Go to Admin Panel →
                        </a>
                    </p>
        `
                    : `Your 25% commitment of ₦${commitmentAmount?.toLocaleString()} has been received. Our team will begin work shortly.
                     <p>
                        <a href="${dashboardUrl}"
                           style="display:inline-block;padding:10px 18px;
                                  background:#1565c0;color:#fff;
                                  text-decoration:none;border-radius:6px;">
                            Track Progress →
                        </a>
                    </p>`
            }`
            break
        // html = `
        //     <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
        //         <h2>✅ Commitment Received</h2>
        //         <p>${
        //             event === "commitment_paid" && to === ADMIN_EMAIL
        //                 ? `<strong>${orgName}</strong> has paid the 25% commitment (₦${commitmentAmount?.toLocaleString()}) for <strong>${serviceLabel}</strong>. Work can begin.`
        //                 : `Your 25% commitment of ₦${commitmentAmount?.toLocaleString()} has been received. Our team will begin work shortly.`
        //         }</p>
        //         ${
        //             to === ADMIN_EMAIL
        //                 ? `
        //         <p>
        //             <a href="${adminUrl}"
        //                style="display:inline-block;padding:10px 18px;
        //                       background:#1565c0;color:#fff;
        //                       text-decoration:none;border-radius:6px;">
        //                 Go to Admin Panel →
        //             </a>
        //         </p>`
        //                 : `
        //         <p>
        //             <a href="${dashboardUrl}"
        //                style="display:inline-block;padding:10px 18px;
        //                       background:#1565c0;color:#fff;
        //                       text-decoration:none;border-radius:6px;">
        //                 Track Progress →
        //             </a>
        //         </p>`
        //         }
        //     </div>`
        // break

        case "work_started":
            subject = `🚀 Work Has Started on Your Project — ${serviceLabel}`
            html = `
                <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
                    <h2>🚀 Work Has Begun!</h2>
                    <p>Hi ${userName},</p>
                    <p>Our team has started working on your <strong>${serviceLabel}</strong> project.</p>
                    ${workNote ? `<p><strong>Update from our team:</strong> ${workNote}</p>` : ""}
                    ${
                        deliverables && deliverables.length > 0
                            ? `
                    <p><strong>Project Links:</strong></p>
                    <ul>
                        ${deliverables
                            .map(
                                (d) => `
                        <li>
                            <strong>${d.label}:</strong>
                            <a href="${d.url}">${d.url}</a>
                        </li>`,
                            )
                            .join("")}
                    </ul>`
                            : ""
                    }
                    <p style="background:#fef3c7;padding:12px;border-radius:6px;">
                        ⚠️ Balance payment of ₦${balanceAmount?.toLocaleString()} is due upon your satisfaction with the completed work.
                    </p>
                    <p>
                        <a href="${dashboardUrl}"
                           style="display:inline-block;padding:10px 18px;
                                  background:#1565c0;color:#fff;
                                  text-decoration:none;border-radius:6px;">
                            View in Dashboard →
                        </a>
                    </p>
                </div>`
            break

        case "balance_paid":
            subject = `🎉 Project Complete — ${serviceLabel}`
            html = `...${
                params.isAdmin
                    ? `<strong>${orgName}</strong> has paid the full balance for <strong>${serviceLabel}</strong>. Project is complete.
           <p>
              <a href="${adminUrl}"
                 style="display:inline-block;padding:10px 18px;
                        background:#1565c0;color:#fff;
                        text-decoration:none;border-radius:6px;">
                  View in Admin Panel →
              </a>
          </p>`
                    : `Thank you ${userName}! Your final payment has been received and your <strong>${serviceLabel}</strong> project is complete.
           <p>
              <a href="${dashboardUrl}"
                 style="display:inline-block;padding:10px 18px;
                        background:#1565c0;color:#fff;
                        text-decoration:none;border-radius:6px;">
                  View in Dashboard →
              </a>
          </p>`
            }`
            // html = `
            //     <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
            //         <h2>${to === ADMIN_EMAIL ? "💰 Balance Payment Received" : "🎉 Project Complete!"}</h2>
            //         <p>${
            //             to === ADMIN_EMAIL
            //                 ? `<strong>${orgName}</strong> has paid the full balance for <strong>${serviceLabel}</strong>. Project is complete.`
            //                 : `Thank you ${userName}! Your final payment has been received and your <strong>${serviceLabel}</strong> project is complete.`
            //         }</p>
            //         <p>
            //             <a href="${to === ADMIN_EMAIL ? adminUrl : dashboardUrl}"
            //                style="display:inline-block;padding:10px 18px;
            //                       background:#166534;color:#fff;
            //                       text-decoration:none;border-radius:6px;">
            //                 ${to === ADMIN_EMAIL ? "View in Admin Panel →" : "View in Dashboard →"}
            //             </a>
            //         </p>
            //     </div>`
            break
    }

    await resend.emails.send({
        from: "Bitkova <no-reply@bitkova.com>",
        to,
        subject,
        html,
    })
}
