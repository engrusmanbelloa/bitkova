import React from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Dashboard from "@/components/dashboard/Dashoard"
import { users, User } from "@/userType"
import { getUserById } from "@/utils/ getUserById"
import { verifyIdToken } from "@/utils/verifySession"

export default async function page() {
    const id = "user1"
    const cookieStore = await cookies()
    // console.log("All cookies", cookieStore.getAll())
    const token = cookieStore.get("session")?.value
    // console.log("Session token from cookie:", token)
    if (!token) {
        console.log("User token does not exist")
        redirect("/")
    }
    const decodedToken = await verifyIdToken(token)
    if (!decodedToken) {
        redirect("/")
    }
    // const user = users.find((user) => user.id.toString() === id)
    const user = (await getUserById(decodedToken.uid)) as User
    if (!user) {
        console.log("User details does not exist")
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
