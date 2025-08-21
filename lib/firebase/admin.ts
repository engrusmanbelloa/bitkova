import { initializeApp, applicationDefault, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth as getAdminAuth } from "firebase-admin/auth"

const adminApp = getApps().length
    ? getApps()[0]
    : initializeApp({
          credential: cert({
              projectId: process.env.PROJECT_ID,
              clientEmail: process.env.CLIENT_EMAIL,
              privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
          }),
      })
const adminAuth = getAdminAuth(adminApp)
const adminDb = getFirestore(adminApp)

export async function addCustomClaim(uid: string, role: "admin" | "instructor") {
    const user = await getAdminAuth().getUser(uid)
    const currentClaims = user.customClaims || {}
    currentClaims[role] = true
    await getAdminAuth().setCustomUserClaims(uid, currentClaims)
    console.log(`Custom claim '${role}' added to user ${uid}`)
}

export async function removeCustomClaim(uid: string, role: "admin" | "instructor") {
    const user = await getAdminAuth().getUser(uid)
    const currentClaims = user.customClaims || {}
    if (currentClaims[role]) {
        delete currentClaims[role]
        await getAdminAuth().setCustomUserClaims(uid, currentClaims)
        console.log(`Custom claim '${role}' removed from user ${uid}`)
    } else {
        console.log(`User ${uid} does not have claim '${role}'`)
    }
}

export { adminAuth, adminDb, adminApp }
