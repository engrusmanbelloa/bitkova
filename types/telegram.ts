export type TelegramContext = {
    chatId: number
    text: string
    from: {
        id: number
        username?: string
    }
}

export type TelegramCommand = {
    name: string
    description: string
    adminOnly?: boolean
    execute: (ctx: TelegramContext) => Promise<void>
}
