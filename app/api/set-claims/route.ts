import { NextApiRequest, NextApiResponse } from "next"
import { adminAuth } from "@/firebase/admin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end()

    const { email, role } = req.body

    try {
        const user = await adminAuth.getUserByEmail(email)

        let claims: { [key: string]: any } = user.customClaims || {}
        claims[role] = true // e.g., admin, instructor

        await adminAuth.setCustomUserClaims(user.uid, claims)

        return res.status(200).json({ message: `Claim '${role}' added to ${email}` })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message })
        } else {
            return res.status(500).json({ error: "An unexpected error occurred" })
        }
    }
}
