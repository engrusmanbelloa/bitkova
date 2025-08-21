import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { auth } from "@/lib/firebase/firebaseConfig"
import { useQuery } from "@tanstack/react-query"
import { getUserById } from "@/lib/firebase/queries/getUserById"
import { User } from "@/userType"
import { User as UserDocType } from "@/userType"
import { onAuthStateChanged, User as FirebaseUserType } from "firebase/auth"

export interface CustomClaims {
    admin?: boolean
    instructor?: boolean
}
export interface AuthUser {
    userDoc: UserDocType | null
    claims: CustomClaims
    firebaseUser: FirebaseUserType | null
}

export function useAuthReady() {
    const [authReady, setAuthReady] = useState(false)
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUserType | null>(null)
    const [claims, setClaims] = useState<CustomClaims>({})
    const [error, setError] = useState<string | null>(null) // State for error handling

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setError(null) // Clear any previous errors
            setFirebaseUser(user)

            if (user) {
                try {
                    // Attempt to fetch custom claims with error handling
                    const idTokenResult = await user.getIdTokenResult()
                    setClaims(idTokenResult.claims as CustomClaims)
                } catch (err) {
                    console.error("Failed to fetch custom claims:", err)
                    setError("Failed to fetch user roles. Please try again.")
                }
            } else {
                setClaims({})
            }
            setAuthReady(true)
        })

        return () => unsubscribe()
    }, [])

    const {
        data: userDoc,
        isLoading,
        error: queryError,
    } = useQuery<UserDocType | null, Error>({
        queryKey: ["userDoc", firebaseUser?.uid],
        queryFn: async () => {
            if (!firebaseUser?.uid) return Promise.resolve(null)
            try {
                // Attempt to fetch user document with error handling
                return await getUserById(firebaseUser.uid)
            } catch (err) {
                console.error("Failed to fetch user document:", err)
                // React Query will handle this error state automatically
                throw err
            }
        },
        enabled: !!firebaseUser?.uid,
        staleTime: 5 * 60 * 1000,
    })

    // Combine errors from both parts of the hook
    const combinedError = error || queryError?.message || null

    return {
        authReady,
        firebaseUser,
        user: userDoc,
        claims,
        isLoadingUserDoc: isLoading,
        error: combinedError,
    }
}
