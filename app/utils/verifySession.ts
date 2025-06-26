import { adminAuth } from "@/utils/admin"

export async function verifyIdToken(token: string) {
    try {
        const decoded = await adminAuth.verifyIdToken(token)
        return decoded
    } catch (error) {
        console.error("Token verification failed", error)
        return null
    }
}
