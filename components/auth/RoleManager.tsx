"use client"
import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "react-toastify"
import { UserRole } from "@/userType"

export default function RoleManager() {
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [targetEmail, setTargetEmail] = useState("")
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState<UserRole["role"] | "none">("instructor")
    const [assigning, setAssigning] = useState(false)

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
            // alert("Please enter an email and be logged in")
            toast.error("Please enter an email and be logged in")
            return
        }

        setAssigning(true)

        try {
            const res = await fetch("/api/setRole", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: targetEmail, role, requesterEmail: userEmail }),
            })

            const data = await res.json()

            if (!res.ok) {
                // Handle specific error cases
                throw new Error(data.error || "Failed to assign role")
            }

            // Refresh token to get updated claims
            await auth.currentUser?.getIdToken(true)
            const token = await auth.currentUser?.getIdTokenResult()
            toast.success(
                `Role ${role} ${token?.claims} claim assigned to ${targetEmail} successfully`,
            )
            // console.log("Custom Claims:", token?.claims)

            alert(data.message)
            setTargetEmail("") // Clear input on success
        } catch (error) {
            console.log("Error assigning role:", error)
            const errorMessage = error instanceof Error ? error.message : "Failed to assign role"
            alert(`Error: ${errorMessage}`)
            toast.error(`Failed to assign or remove role. Error: ${errorMessage}`)
        } finally {
            setAssigning(false)
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
                disabled={assigning}
                style={{ padding: "8px" }}
            />
            {/* <input
                type="email"
                placeholder="Target User Email"
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
            /> */}

            <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole["role"] | "none")}
                disabled={assigning}
                style={{ padding: "8px" }}
            >
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
                <option value="blog_admin">Blog Admin</option>
                <option value="event_manager">Event Manager</option>
                <option value="business_dev">Business Development</option>
                <option value="none">Remove Role</option>
            </select>
            <button
                onClick={assignRole}
                disabled={assigning}
                style={{ padding: "10px", cursor: assigning ? "not-allowed" : "pointer" }}
            >
                {assigning ? "⏳ Processing..." : role === "none" ? "Remove Role" : "Assign Role"}
            </button>
            {/* <button onClick={assignRole}>{role === "none" ? "Remove Role" : "Assign Role"}</button> */}
        </div>
    )
}
