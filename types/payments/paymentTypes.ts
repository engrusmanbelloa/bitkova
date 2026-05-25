// types/paymentTypes.ts
export type PaymentType =
    | "async_course"
    | "physical_class"
    | "telegram_class"
    | "quote_commitment"
    | "quote_balance"
// future: "event_ticket" | "merchandise" | "donation"

export type EnrollmentPaymentType = Extract<
    PaymentType,
    "async_course" | "physical_class" | "telegram_class"
>
