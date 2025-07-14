"use client"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { app } from "@/lib/firebase/firebaseConfig"
import { User } from "@/userType"

const auth = getAuth(app)
const db = getFirestore(app)

export function useUserDoc() {
    const [userDoc, setUserDoc] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userRef = doc(db, "users", firebaseUser.uid)
                const userSnap = await getDoc(userRef)
                if (userSnap.exists()) {
                    setUserDoc(userSnap.data() as User)
                } else {
                    setUserDoc(null)
                }
            } else {
                setUserDoc(null)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    return { userDoc, loading }
}
