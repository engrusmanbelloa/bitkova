import { useEffect } from "react"
import { auth } from "@/firebase/firebaseConfig"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { checkSessionValid } from "@/app/api/auth/session/checkSession"

export default function useSessionRefresh() {
    const router = useRouter()

    useEffect(() => {
        const refreshSession = async () => {
            if (!auth.currentUser) return

            // Skip if tab is inactive
            if (document.visibilityState !== "visible") return

            const valid = await checkSessionValid()

            if (!valid && auth.currentUser) {
                try {
                    const freshIdToken = await auth.currentUser.getIdToken(true)
                    const res = await fetch("/api/auth/session", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ idToken: freshIdToken }),
                        credentials: "include",
                    })

                    if (!res.ok) {
                        throw new Error("Failed to refresh session")
                    }
                    console.log("Session refreshed")
                } catch (error) {
                    console.error(" Token refresh failed:", error)
                    toast.warning("Session expired. Logging out...")
                    await fetch("/api/auth/session", { method: "DELETE" })
                    await auth.signOut()
                    router.push("/")
                }
            }
        }

        const interval = setInterval(
            () => {
                refreshSession()
            },
            1000 * 60 * 5,
        ) // Every 5 minutes

        return () => clearInterval(interval)
    }, [router])
}
