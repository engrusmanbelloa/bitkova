// lib/firebase/admin.ts
import { getApps, initializeApp, cert, App } from "firebase-admin/app"
import { getAuth, Auth } from "firebase-admin/auth"
import { getFirestore, Firestore } from "firebase-admin/firestore"

// Initialize Firebase Admin
let adminApp: App
let adminAuth: Auth
let adminDb: Firestore

if (getApps().length === 0) {
    // Validate environment variables
    if (!process.env.PROJECT_ID || !process.env.CLIENT_EMAIL || !process.env.PRIVATE_KEY) {
        throw new Error(
            "Missing Firebase Admin credentials. Please check your environment variables.",
        )
    }

    adminApp = initializeApp({
        credential: cert({
            projectId: process.env.PROJECT_ID,
            clientEmail: process.env.CLIENT_EMAIL,
            privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
    })

    adminAuth = getAuth(adminApp)
    adminDb = getFirestore(adminApp)
} else {
    adminApp = getApps()[0]
    adminAuth = getAuth(adminApp)
    adminDb = getFirestore(adminApp)
}

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

export { adminApp, adminAuth, adminDb }
