import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase/firebaseConfig"
import { useQuery } from "@tanstack/react-query"
import { getUserById } from "@/lib/firebase/getUserById"
import { User } from "@/userType"

// export function useAuthReady() {
//     const [authReady, setAuthReady] = useState(false)
//     const [user, setUser] = useState<ReturnType<typeof getAuth>["currentUser"] | null>(null)

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//             setUser(firebaseUser)
//             setAuthReady(true)
//         })

//         return () => unsubscribe()
//     }, [])

//     return { authReady, user }
// }

export function useAuthReady() {
    const [authReady, setAuthReady] = useState(false)
    const [firebaseUser, setFirebaseUser] = useState<
        ReturnType<typeof getAuth>["currentUser"] | null
    >(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setFirebaseUser(user)
            setAuthReady(true)
        })

        return () => unsubscribe()
    }, [])

    const { data: userDoc, isLoading } = useQuery<User | null>({
        queryKey: ["userDoc", firebaseUser?.uid],
        queryFn: () => {
            if (!firebaseUser?.uid) return Promise.resolve(null)
            return getUserById(firebaseUser.uid)
        },
        enabled: !!firebaseUser?.uid,
        staleTime: 5 * 60 * 1000, // optional cache time
    })

    return {
        authReady,
        firebaseUser,
        user: userDoc,
        isLoadingUserDoc: isLoading,
    }
}
