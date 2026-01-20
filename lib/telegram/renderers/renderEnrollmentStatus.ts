// lib/telegram/renderers/renderEnrollmentStatus.ts
export function renderEnrollmentStatus(enrollment: any) {
    let msg = `📌 *ENROLLMENT STATUS*\n`
    msg += `────────────────────\n`
    msg += `🎓 *${enrollment.className ?? "Course"}*\n`
    msg += `📦 Type: ${enrollment.itemType.replace("_", " ")}\n`
    msg += `💳 Payment: ${enrollment.status}\n`
    msg += `🗓 Enrolled: ${new Date(enrollment.enrolledAt.seconds * 1000).toDateString()}\n\n`

    if (enrollment.inviteLink) {
        msg += `👉 *Telegram Access:*\n${enrollment.inviteLink}\n\n`
        msg += `⚠️ Single-use link. Join immediately.\n`
    } else {
        msg += `⏳ Telegram access pending.\n`
        msg += `You’ll receive it by email shortly.\n`
    }

    msg += `────────────────────\n`
    msg += `Need help? Use /support`

    return msg
}
