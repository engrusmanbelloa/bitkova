"use client"
import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"

export default function RoleManager() {
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [targetEmail, setTargetEmail] = useState("")
    const [role, setRole] = useState<"admin" | "instructor" | "none">("instructor")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email ?? null)
            } else {
                setUserEmail(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    async function assignRole() {
        if (!targetEmail || !userEmail) {
            alert("Please enter an email and be logged in")
            return
        }

        try {
            const res = await fetch("/api/setRole", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: targetEmail, role, requesterEmail: userEmail }),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || "Failed to assign role")

            await auth.currentUser?.getIdToken(true)
            const token = await auth.currentUser?.getIdTokenResult()
            console.log("Custom Claims:", token?.claims)

            alert(data.message)
        } catch (error) {
            console.error("Error:", error)
            alert("Failed to assign or remove role")
        }
    }

    if (loading) return <p>🔄 Loading...</p>
    if (!userEmail) return <p> Not authenticated</p>

    return (
        <div>
            <input
                type="email"
                placeholder="Target User Email"
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value as any)}>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
                <option value="none">Remove Role</option>
            </select>
            <button onClick={assignRole}>{role === "none" ? "Remove Role" : "Assign Role"}</button>
        </div>
    )
}
