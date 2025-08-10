import { initializeApp, getApps, cert, App } from "firebase-admin/app"
import { getAuth as getAdminAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

function validateEnv() {
    if (!process.env.PROJECT_ID) throw new Error("Missing PROJECT_ID in env")
    if (!process.env.CLIENT_EMAIL) throw new Error("Missing CLIENT_EMAIL in env")
    if (!process.env.PRIVATE_KEY) throw new Error("Missing PRIVATE_KEY in env")
}

validateEnv()

let adminApp: App

if (!getApps().length) {
    adminApp = initializeApp({
        credential: cert({
            projectId: process.env.PROJECT_ID,
            clientEmail: process.env.CLIENT_EMAIL,
            privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    })
    console.log("Firebase Admin initialized")
} else {
    adminApp = getApps()[0]
}

export const adminAuth = getAdminAuth(adminApp)
export const adminDb = getFirestore(adminApp)

// Create session cookie with retries (for transient Google API failures)
export async function createSessionCookieWithRetry(
    idToken: string,
    expiresIn: number,
    retries = 2,
) {
    let lastErr
    for (let i = 0; i <= retries; i++) {
        try {
            return await adminAuth.createSessionCookie(idToken, { expiresIn })
        } catch (err: any) {
            lastErr = err
            console.error(`createSessionCookie attempt ${i + 1} failed:`, err?.message || err)
            // Only retry on network errors / Google API token fetch errors
            if (!String(err?.message).includes("oauth2") && !String(err?.message).includes("fetch"))
                break
            if (i < retries) await new Promise((res) => setTimeout(res, 500 * (i + 1))) // backoff
        }
    }
    throw lastErr
}
