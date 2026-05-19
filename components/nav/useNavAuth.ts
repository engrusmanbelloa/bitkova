"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, sendEmailVerification } from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

export function useNavAuth(firebaseUser: any) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [isManualVerified, setIsManualVerified] = useState(false)
    const [activeModal, setActiveModal] = useState<"signin" | "signup" | "notify" | "reset" | null>(
        null,
    )

    const isVerified = firebaseUser?.emailVerified || isManualVerified

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            queryClient.clear()
            router.push("/")
            toast.success("Signed out successfully")
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleSendVerification = async () => {
        if (!firebaseUser) return toast.error("User not authenticated")
        await firebaseUser.reload()
        if (firebaseUser.emailVerified) {
            await firebaseUser.getIdToken(true)
            toast.success("Email already verified")
            return
        }
        await sendEmailVerification(firebaseUser)
        toast.success("Verification email sent. Check inbox or spam.")
    }

    const checkVerification = async () => {
        if (!firebaseUser) return
        try {
            await firebaseUser.reload()
            if (firebaseUser.emailVerified) {
                setIsManualVerified(true)
                const idToken = await firebaseUser.getIdToken(true)
                const uplineCode = localStorage.getItem("pendingReferral")
                await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${idToken}`,
                    },
                    body: JSON.stringify({ uplineCode }),
                })
                localStorage.removeItem("pendingReferral")
                toast.success("Account verified and synced!")
                setActiveModal(null)
            } else {
                toast.error("Please verify your email first.")
            }
        } catch {
            toast.error("Verification check failed.")
        }
    }

    return {
        isVerified,
        isManualVerified,
        activeModal,
        setActiveModal,
        handleSignOut,
        handleSendVerification,
        checkVerification,
    }
}
