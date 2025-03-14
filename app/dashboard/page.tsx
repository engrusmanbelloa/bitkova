import React from "react"
import { redirect } from "next/navigation"
import Dashboard from "@/components/dashboard/Dashoard"
import { users } from "@/userType"

export default function page() {
    const id = "user1"

    const user = users.find((user) => user.id.toString() === id)
    if (!user) {
        redirect("/")
    } else {
        console.log(user)
    }
    return (
        <div>
            <Dashboard
                name={user.name}
                completedCourses={user.completedCourses}
                enrolledCourses={user.completedCourses}
                archivedCourses={user.archivedCourses}
            />
        </div>
    )
}
