//config/paystack.ts
export const getPaystackConfig = () => {
    const isProduction = process.env.NODE_ENV === "production"

    return {
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        secretKey: process.env.PAYSTACK_SECRET_KEY!,
        webhookUrl: isProduction
            ? "https://www.bitkova.com/api/paystack/webhook"
            : process.env.NEXT_PUBLIC_WEBHOOK_URL ||
              "https://precipitous-curt-nonacutely.ngrok-free.dev/api/paystack/webhook",
    }
}

export const isTestMode = () => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""
    return publicKey.startsWith("pk_test_")
}
