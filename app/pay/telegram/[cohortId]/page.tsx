// app/pay/telegram/[cohortId]/page.tsx
"use client"
import { use } from "react"
import styled from "styled-components"
import dynamic from "next/dynamic"
import { useQuery } from "@tanstack/react-query"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { TelegramClass, Cohort } from "@/types/classTypes"
import { useAuthReady } from "@/hooks/useAuthReady"
import { toast } from "sonner"
import { enrollTelegramClass } from "@/lib/firebase/uploads/enrollTelegramClass"
import AuthMessage from "@/components/AuthMessage"
import { mobile, ipad } from "@/responsive"
import IsLoading from "@/components/IsLoading"

const UnifiedCheckout = dynamic(() => import("@/components/payments/UnifiedCheckout"), {
    ssr: false,
})

const Container = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    ${ipad((props: any) => `width: ${props.theme.widths.ipadWidth};`)}
    ${mobile(
        (props: any) =>
            `width: 100%; max-width: ${props.theme.widths.mobileWidth}; padding: 0 10px;`,
    )}
`
export default function Page({ params }: { params: Promise<{ cohortId: string }> }) {
    const successMessage =
        "Payment successful! You will receive your Telegram access shortly via the email or the bot."
    const { cohortId } = use(params)
    // console.log("Cohort id", cohortId)
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

    if (cohortLoading || classLoading) return <IsLoading />

    if (!user) return <AuthMessage message="Authentication required" />

    if (!cohort || !telegramClass) return <AuthMessage message="Class not found" />

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
                Platform: "Telegram (Live Classes)",
            },
        },
    ]

    return (
        <UnifiedCheckout
            items={checkoutItems}
            classType="telegram_class"
            className={telegramClass.name}
            cohortName={cohort.name}
            successMessage={successMessage}
            successRedirect="/dashboard"
            metadata={{
                cohortId: cohort.id,
                telegramGroupId: telegramClass.telegramGroupId,
            }}
        />
    )
}
