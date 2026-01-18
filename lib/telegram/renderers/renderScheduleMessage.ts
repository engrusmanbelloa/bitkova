export function renderScheduleMessage({ cohortName, telegramClasses, physicalClasses }: any) {
    let message = `🗓 *${cohortName} — Class Schedule*\n`
    message += `────────────────────\n`

    if (telegramClasses.length) {
        message += `🌐 *Telegram Online Classes*\n`
        telegramClasses.forEach((c: any) => {
            message += `• ${c.name}\n`
            message += `  📅 ${c.schedule?.days ?? "TBD"}\n`
            message += `  ⏰ ${c.schedule?.time ?? "TBD"}\n\n`
        })
    }

    if (physicalClasses.length) {
        message += `📍 *Physical Hubs*\n`
        physicalClasses.forEach((c: any) => {
            message += `• ${c.name}\n`
            message += `  📍 ${c.locationName}\n`
            message += `  🏢 ${c.address}\n`
            message += `  🗺️ ${c.googleMapsLink}\n`
            message += `  📅 ${c.schedule?.days ?? "TBD"}\n`
            message += `  ⏰ ${c.schedule?.time ?? "TBD"}\n\n`
        })
    }

    message += `────────────────────\n`
    message += `_Use /classes to enroll in any of these classes_`

    return message
}
