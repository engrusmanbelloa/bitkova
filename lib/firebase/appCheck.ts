// lib/firebase/appCheck.ts
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check"
import { app } from "./client"

/**
 * IMPORTANT:
 * This route must NOT use Firebase App Check.
 * It is accessed by server-to-server clients (Telegram/Cron).
 *
 * /api/telegram/route.ts
 * /api/cron/*
 * /api/paystack/*
 *
 */

let appCheckInitialized = false
export const initAppCheck = () => {
    if (appCheckInitialized) return
    // Only run on the client side
    if (typeof window !== "undefined") {
        // Enable debug mode in development
        if (process.env.NODE_ENV === "development") {
            // This allows you to use the debug token printed in your console
            ;(window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true
        }

        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

        if (!siteKey) {
            console.warn("App Check failed: Missing reCAPTCHA site key.")
            return
        }

        initializeAppCheck(app, {
            provider: new ReCaptchaEnterpriseProvider(siteKey),
            isTokenAutoRefreshEnabled: true,
        })
    }
    appCheckInitialized = true
}
