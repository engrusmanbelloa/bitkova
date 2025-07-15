"use client"
import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "sonner"

export default function RoleManager() {
    const [uid, setUid] = useState<string>("")
    const [role, setRole] = useState<"admin" | "instructor" | "none">("instructor")
    const [loading, setLoading] = useState(true)

    async function assignRole(uid: string, role: "admin" | "instructor" | "none") {
        if (!auth.currentUser?.uid) {
            console.error("User UID is not available")
            return
        }
        try {
            const res = await fetch("/api/setRole", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid,
                    role: role === "none" ? null : role,
                }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Failed to assign role")

            await auth.currentUser.getIdToken(true)
            const token = await auth.currentUser?.getIdTokenResult()
            // console.log("Custom Claims:", token?.claims)
            toast.success(
                role === "none" ? "Role removed successfully" : `Role "${role}" assigned to user`,
            )
        } catch (error) {
            // console.error("Error assigning/removing role:", error)
            // alert("Failed to assign or remove role")
            toast.error("Error assigning/removing role:")
        }
    }

    const handleAssign = () => {
        if (!uid) {
            alert("Please enter a UID")
            return
        }
        assignRole(uid, role)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
            } else {
                setUid("")
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])
    if (loading) return <p>🔄 Checking auth...</p>
    if (!auth.currentUser) return <>No user</>

    return (
        <div>
            <p>{auth.currentUser?.uid}</p>
            <input
                type="text"
                placeholder="Firebase UID"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value as any)}>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
                <option value="none"> Remove All Roles</option>
            </select>
            <button onClick={handleAssign}>
                {role === "none" ? "Remove Role" : "Assign Role"}
            </button>
        </div>
    )
}
