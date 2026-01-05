// app/pay/physical/[classId]/page.tsx
"use client"
import { use } from "react"
import dynamic from "next/dynamic"
// import UnifiedCheckout from "@/components/payments/UnifiedCheckout"
import { useQuery } from "@tanstack/react-query"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { PhysicalClass, Cohort } from "@/types/classTypes"
import { useAuthReady } from "@/hooks/useAuthReady"
import { enrollPhysicalClass } from "@/lib/firebase/uploads/enrollPhysicalClass"
import AuthMessage from "@/components/AuthMessage"

const UnifiedCheckout = dynamic(() => import("@/components/payments/UnifiedCheckout"), {
    ssr: false,
})

export default function Page({ params }: { params: Promise<{ classId: string }> }) {
    const successMessage = "Physical class payment successful! Courses added."
    const { classId } = use(params)
    console.log("Cohort id", classId)
    const { user } = useAuthReady()

    const { data: classData, isLoading } = useQuery({
        queryKey: ["physicalClass", classId],
        queryFn: async () => {
            const classDoc = await getDoc(doc(db, "physicalClasses", classId))
            if (!classDoc.exists()) throw new Error("Class not found")
            return { id: classDoc.id, ...classDoc.data() } as PhysicalClass
        },
    })

    const { data: cohort, isLoading: cohortLoading } = useQuery<Cohort | null>({
        queryKey: ["cohort", classData?.cohortId],
        queryFn: async () => {
            if (!classData?.cohortId) return null

            const cohortDoc = await getDoc(doc(db, "cohorts", classData.cohortId))
            if (!cohortDoc.exists()) return null

            return {
                id: cohortDoc.id,
                ...cohortDoc.data(),
            } as Cohort
        },
        enabled: !!classData?.cohortId,
    })

    if (isLoading || cohortLoading) return <div>Loading...</div>

    if (!classData || !cohort) return <div>Class not found</div>

    if (!user) return <AuthMessage message="Authentication required" />

    // Check if registration is open
    if (cohort) {
        const now = new Date()
        const regOpen = new Date(cohort.registrationOpen)
        const regClose = new Date(cohort.registrationClose)

        if (now < regOpen) {
            console.log("Registration is not opened")
            return <div>Registration opens on {regOpen.toLocaleDateString()}</div>
        }

        if (now > regClose) {
            return <div>Registration closed on {regClose.toLocaleDateString()}</div>
        }
    }

    const checkoutItems = [
        {
            id: classData.id,
            title: `${classData.name} - Physical Class`,
            price: classData.price,
            details: {
                Location: classData.location,
                Cohort: cohort?.name || "N/A",
                Schedule: `${classData.schedule.slots.join(", ")}`,
                Instructors: classData.instructors.join(", "),
            },
        },
    ]

    return (
        <UnifiedCheckout
            items={checkoutItems}
            className={classData.name}
            cohortName={cohort.name}
            classType="physical_class"
            successMessage={successMessage}
            successRedirect="/success"
            metadata={{
                cohortId: classData.cohortId,
                classLocation: classData.location,
            }}
        />
    )
}
