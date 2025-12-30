export interface PaymentHandlerContext {
    userId: string
    itemIds: string[]
    metadata: Record<string, any>
    paymentReference: string
    payerEmail: string
}

export type PaymentHandler = (ctx: PaymentHandlerContext) => Promise<void>
