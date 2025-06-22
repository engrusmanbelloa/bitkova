import { initializeApp, applicationDefault, getApps } from "firebase-admin/app"
// import { getAuth } from "firebase-admin/auth"
import { getAuth as getAdminAuth } from "firebase-admin/auth"

export const adminApp = getApps().length ? getApps()[0] : initializeApp()
// const app = initializeApp()

const adminAuth = getAdminAuth(adminApp)

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

export { adminAuth }
