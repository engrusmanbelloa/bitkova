import React from "react"
import { redirect } from "next/navigation"
import Dashboard from "@/components/dashboard/Dashoard"
import { users } from "@/userType"

export default function page() {
    const id = "user2"

    const user = users.find((user) => user.id.toString() === id)
    if (!user) {
        redirect("/")
    } else {
        console.log(user)
    }
    return (
        <div>
            <Dashboard user={user.name} />
        </div>
    )
}
