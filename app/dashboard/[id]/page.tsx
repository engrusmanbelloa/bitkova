import React from "react"
import { redirect } from "next/navigation"
import Dashboard from "@/components/dashboard/Dashoard"
import { users } from "@/userType"
import { adminAuth } from "@/lib/firebase/admin"

export default function page() {
    const id = "user1"

    const user = users.find((user) => user.id.toString() === id)
    if (!user) {
        redirect("/")
    } else {
        // console.log("User details ", user)
    }
    return (
        <div>
            <Dashboard user={user} />
        </div>
    )
}
