import React from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Dashboard from "@/components/dashboard/Dashoard"
import { User } from "@/userType"
import { getUserById } from "@/lib/firebase/queries/getUserById"
import { verifySession } from "@/session/verifySession"
import { toast } from "sonner"

export default async function page() {
    // Get session cookie
    // const cookieStore = await cookies()
    // const session = cookieStore.get("session")?.value
    // // Check if session is available
    // if (!session) {
    //     console.log("No session cookie found")
    //     return redirect("/")
    // }
    // // Verify session cookie
    // const decodedToken = await verifySession()
    // if (!decodedToken) {
    //     console.log("Invalid or expired session")
    //     return redirect("/")
    // }
    // Get user by id
    // const user = (await getUserById(.uid)) as User
    // if (!user) {
    //     // console.log("User details does not exist")
    //     toast.error("User details does not exist")
    //     redirect("/")
    // } else {
    //     // console.log("User details ", user)
    // }
    return (
        <div>
            <Dashboard />
        </div>
    )
}
