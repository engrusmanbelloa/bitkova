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

export interface FlowSession {
    flow: string
    step?: number
    expiresAt: FirebaseFirestore.Timestamp
    data?: Record<string, any>
}

export type TelegramFlowHandler = (ctx: TelegramContext, session: FlowSession) => Promise<void>
