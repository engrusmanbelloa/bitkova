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

export { adminApp, adminAuth, adminDb }
