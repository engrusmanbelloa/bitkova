// // lib/email/getAdminEmails.ts
// export function getAdminEmails(): string[] {
//     const emails = process.env.ADMIN_EMAILS ?? ""
//     return emails
//         .split(",")
//         .map((e) => e.trim())
//         .filter(Boolean)
// }

// lib/email/getStaffEmails.ts
import { adminDb } from "@/lib/firebase/admin"
import { UserRole } from "@/types/userType"

export async function getEmailsByRole(role: UserRole["role"]): Promise<string[]> {
    // Env var override always wins — useful for testing
    const envKey = `${role.toUpperCase()}_EMAILS`
    const envVal = process.env[envKey]
    if (envVal)
        return envVal
            .split(",")
            .map((e) => e.trim())
            .filter(Boolean)

    const snap = await adminDb.collection("staffRoles").where("role", "==", role).get()

    console.log(`Fetched ${snap.size} emails for role ${role}`)

    return snap.docs.map((d) => d.data().email).filter(Boolean)
}

// Convenience shorthand
export const getAdminEmails = () => getEmailsByRole("admin")
export const getBusinessDevEmails = () => getEmailsByRole("business_dev")
export const getEventManagerEmails = () => getEmailsByRole("event_manager")
export const getInstructorEmails = () => getEmailsByRole("instructor")
export const getBlogAdminEmails = () => getEmailsByRole("blog_admin")
