import { adminAuth } from "@/utils/admin"
import { cookies } from "next/headers"

export async function verifySession() {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value

    if (!session) return null

    try {
        const decoded = await adminAuth.verifySessionCookie(session, true)
        return decoded // { uid, email, customClaims... }
    } catch (error) {
        console.error("Session cookie verification failed:", error)
        return null
    }
}
