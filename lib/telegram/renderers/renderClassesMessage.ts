// lib/telegram/renderers/renderClassesMessage.ts
export function renderClassesMessage({ cohort, telegramClasses, physicalClasses }: any) {
    // let message = `🎓 *${cohort.name}*\n`
    let message = `🎓 *${cohort.name ?? "Current Cohort"}*\n`
    message += `────────────────────\n`
    message += `*Choose your preferred learning hub below:*\n\n`

    // 🌐 TELEGRAM CLASSES
    if (telegramClasses.length) {
        message += `🌐 *Telegram Online Classes*\n`
        telegramClasses.forEach((c: any, i: number) => {
            message += `*${i + 1}. ${c.name}*\n`
            message += `💳 ₦${c.price}\n`
        })
    }

    // 📍 PHYSICAL HUBS
    if (physicalClasses.length) {
        message += `📍 *Physical Learning Hubs*\n`
        physicalClasses.forEach((c: any, i: number) => {
            message += `*${i + 1}. ${c.name}*\n`
            message += `📍 ${c.c.location}\n`
            message += `🗺️ ${c.mapLink}\n`
            message += `💳 ₦${c.price}\n\n`
        })
    }

    message += `────────────────────\n`
    message += `💳 *Ready to start?*\n`
    message += `click enroll botton to enroll in any of these classes.`

    return message
}
