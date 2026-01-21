// lib/telegram/renderers/renderClasses.ts
export function renderClasses(data: any) {
    const buttons: any[] = []

    if (data.telegram.length) {
        buttons.push(
            ...data.telegram.map((c: any) => [
                {
                    text: `💳 Enroll: ${c.name}`,
                    url: `https://bitkova.com/pay/telegram/${c.id}`,
                },
            ]),
        )
    }

    if (data.physical.length) {
        buttons.push(
            ...data.physical.map((c: any) => [
                {
                    text: `📍 Enroll: ${c.name}`,
                    url: `https://bitkova.com/pay/physical/${c.id}`,
                },
            ]),
        )
    }

    return {
        text: `🎓 *BITKOVA ACTIVE CLASSES*\n\nSelect a class to enroll 👇`,
        reply_markup: {
            inline_keyboard: buttons,
        },
    }
}
