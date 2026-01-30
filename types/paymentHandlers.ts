export interface PaymentHandlerContext {
    userId: string
    itemIds: string[]
    metadata: Record<string, any>
    paymentReference: string
    payerEmail: string
    price: number
}

export type PaymentHandler = (ctx: PaymentHandlerContext) => Promise<void>
