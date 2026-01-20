// lib/telegram/renderers/renderClassButtons.ts
export function renderClassButtons({ cohort, telegramClasses, physicalClasses }: any) {
    const buttons: any[] = []

    telegramClasses.forEach((c: any) => {
        buttons.push([
            {
                text: `💳 Enroll: ${c.name}`,
                url: `https://bitkova.com/pay/telegram/${c.id}`,
            },
        ])
    })

    physicalClasses.forEach((c: any) => {
        buttons.push([
            {
                text: `📍 Enroll: ${c.name}`,
                url: `https://bitkova.com/pay/physical/${c.id}`,
            },
        ])
    })

    return {
        reply_markup: {
            inline_keyboard: buttons,
        },
    }
}
