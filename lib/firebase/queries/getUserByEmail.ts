import { getFirestore, collection, query, where, getDocs, limit } from "firebase/firestore"
import { app } from "@/lib/firebase/client"

const db = getFirestore(app)

// Method 1: Check by email (recommended for sign-in verification)
export async function getUserByEmail(email: string): Promise<boolean> {
    try {
        if (!email || typeof email !== "string") {
            throw new Error("Invalid email provided")
        }

        // Query users collection by email
        const q = query(
            collection(db, "users"),
            where("email", "==", email),
            limit(1), // Optimize query - we only need to know if one exists
        )

        const querySnapshot = await getDocs(q)
        return !querySnapshot.empty
    } catch (error) {
        console.error("Error checking user existence by email:", {
            email,
            error: error instanceof Error ? error.message : "Unknown error",
        })
        throw new Error("Database query failed")
    }
}
