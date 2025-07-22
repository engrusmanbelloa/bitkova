import React from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Dashboard from "@/components/dashboard/Dashoard"
import RoleManager from "@/components/auth/RoleManager"
import Panel from "@/components/admin/AdminPannel"
import { User } from "@/userType"
import { getUserById } from "@/lib/firebase/getUserById"
import { verifySession } from "@/session/verifySession"
import { toast } from "sonner"

export default async function page() {
    // Get session cookie
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value
    // Check if session is available
    if (!session) {
        console.log("No session cookie found")
        return redirect("/")
    }
    // Verify session cookie
    const decodedToken = await verifySession()
    if (!decodedToken) {
        console.log("Invalid or expired session")
        return redirect("/")
    }
    // Get user by id
    const user = (await getUserById(decodedToken.uid)) as User
    if (!user) {
        // console.log("User details does not exist")
        toast.error("User details does not exist")
        redirect("/")
    } else {
        // console.log("User details ", user)
    }
    return (
        <div>
            <Panel user={user} />
            <RoleManager />
        </div>
    )
}
