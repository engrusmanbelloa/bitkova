// app/pay/telegram/[cohortId]/page.tsx
"use client"
import { use } from "react"
import UnifiedCheckout from "@/components/payments/UnifiedCheckout"
import { useQuery } from "@tanstack/react-query"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { TelegramClass, Cohort } from "@/types/classTypes"
import { useAuthReady } from "@/hooks/useAuthReady"
import { toast } from "sonner"
import { enrollTelegramClass } from "@/lib/firebase/uploads/enrollTelegramClass"

export default function Page({ params }: { params: Promise<{ cohortId: string }> }) {
    const successMessage =
        "Payment successful! You will receive your Telegram access shortly via the email or the bot."
    const { cohortId } = use(params)
    const { user } = useAuthReady()

    const { data: cohort, isLoading: cohortLoading } = useQuery({
        queryKey: ["cohort", cohortId],
        queryFn: async () => {
            const cohortDoc = await getDoc(doc(db, "cohorts", cohortId))
            if (!cohortDoc.exists()) throw new Error("Cohort not found")
            return { id: cohortDoc.id, ...cohortDoc.data() } as Cohort
        },
    })

    const { data: telegramClass, isLoading: classLoading } = useQuery({
        queryKey: ["telegramClass", cohortId],
        queryFn: async () => {
            const q = query(collection(db, "telegramClasses"), where("cohortId", "==", cohortId))
            const snapshot = await getDocs(q)
            if (snapshot.empty) throw new Error("Telegram class not found")
            const doc = snapshot.docs[0]
            return { id: doc.id, ...doc.data() } as TelegramClass
        },
        enabled: !!cohortId,
    })

    if (!user) throw new Error("You are not authenticated")

    if (cohortLoading || classLoading) return <div>Loading...</div>

    if (!cohort || !telegramClass) return <div>Class not found</div>

    // Check registration window
    const now = new Date()
    const regOpen = new Date(cohort.registrationOpen)
    const regClose = new Date(cohort.registrationClose)

    if (now < regOpen) {
        return (
            <div style={{ padding: 40, textAlign: "center" }}>
                <h2>Registration Opens Soon</h2>
                <p>
                    Registration for {cohort.name} opens on {regOpen.toLocaleDateString()}
                </p>
            </div>
        )
    }

    if (now > regClose) {
        return (
            <div style={{ padding: 40, textAlign: "center" }}>
                <h2>Registration Closed</h2>
                <p>
                    Registration for {cohort.name} closed on {regClose.toLocaleDateString()}
                </p>
            </div>
        )
    }

    const checkoutItems = [
        {
            id: telegramClass.id,
            title: `${cohort.name} - Telegram Online Class`,
            price: telegramClass.price,
            details: {
                Cohort: cohort.name,
                Duration: `${new Date(cohort.startDate).toLocaleDateString()} - ${new Date(cohort.endDate).toLocaleDateString()}`,
                Modules: telegramClass.modules.join(", "),
                Platform: "Telegram (Live Classes)",
            },
        },
    ]

    return (
        <UnifiedCheckout
            items={checkoutItems}
            classType="telegram_class"
            className={telegramClass.name}
            successMessage={successMessage}
            successRedirect="/dashboard"
            metadata={{
                cohortId: cohort.id,
                telegramGroupId: telegramClass.telegramGroupId,
            }}
        />
    )
}
