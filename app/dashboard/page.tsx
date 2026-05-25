// app/dashboard/page.tsx
"use client"
import dynamic from "next/dynamic"

// const DashboardDynamic = dynamic(() => import("@/components/dashboard/Dashboard"), { ssr: false })
const Dashboard = dynamic(() => import("@/components/dashboard/Dashoard"), { ssr: false })

export default function page() {
    return (
        <div>
            <Dashboard />
        </div>
    )
}
