import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase/firebaseConfig"

export function useAuthReady() {
    const [authReady, setAuthReady] = useState(false)
    const [user, setUser] = useState<ReturnType<typeof getAuth>["currentUser"] | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setAuthReady(true)
        })

        return () => unsubscribe()
    }, [])

    return { authReady, user }
}
