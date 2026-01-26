// lib/telegram/renderers/renderClassCard.ts
export function renderClassCard(c: any) {
    let msg = `🎓 *${c.name}*\n`
    msg += `💰 Price: ₦${c.price.toLocaleString()}\n`
    msg += `💰 Capacity: ${c.capacity.toLocaleString()}\n`
    // msg += `💰 Schedule: {c.schedule.slots.days} {c.schedule.slots.time} \n`

    if (c.type === "physical") {
        msg += `📍 Location: ${c.location}\n`
        if (c.mapLink) msg += `🗺️ [View on Map](${c.mapLink})\n`
    } else {
        msg += `🌐 Mode: Telegram Online\n`
    }

    return msg
}
