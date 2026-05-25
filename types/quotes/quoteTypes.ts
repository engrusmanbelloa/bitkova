// types/quotes/quoteTypes.ts
export type QuoteStatus =
    | "pending" // user submitted, admin hasn't responded
    | "quoted" // admin set price, awaiting user acceptance
    | "accepted" // user accepted, awaiting commitment payment
    | "in_progress" // commitment paid, work started
    | "completed" // balance paid, work done
    | "declined" // user declined the quote

export interface QuoteRequest {
    id: string
    userId: string
    userName: string
    orgName: string
    email: string
    phone: string
    service: "web" | "blockchain" | "design" | "event"
    details: string
    status: QuoteStatus

    // Admin fills on quoting
    quotedPrice?: number
    adminNote?: string
    quotedAt?: Date

    // Payment tracking
    commitmentAmount?: number // 25% of quotedPrice
    commitmentPaid?: boolean
    commitmentPaidAt?: Date
    commitmentReference?: string

    balanceAmount?: number // 75% of quotedPrice
    balancePaid?: boolean
    balancePaidAt?: Date
    balanceReference?: string

    createdAt: Date
    updatedAt: Date
}
