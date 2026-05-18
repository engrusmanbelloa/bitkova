// hooks/classes/useFetchCohorts.ts
import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, query, where, writeBatch, Timestamp, doc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { Cohort } from "@/types/classTypes"

// Helper function to safely convert Firestore data
function convertFirestoreDoc(doc: any): Cohort {
    const data = doc.data()

    // Helper to convert Firestore Timestamp to Date
    const toDate = (field: any): Date => {
        if (!field) return new Date()
        if (field instanceof Date) return field
        if (field?.toDate) return field.toDate()
        if (typeof field === "string") return new Date(field)
        return new Date()
    }

    return {
        id: doc.id,
        name: data.name || "",
        quarter: data.quarter || "Q1",
        year: data.year || new Date().getFullYear(),
        startDate: toDate(data.startDate),
        endDate: toDate(data.endDate),
        registrationOpen: toDate(data.registrationOpen),
        registrationClose: toDate(data.registrationClose),
        status: data.status || "upcoming",
        telegramGroupId: data.telegramGroupId,
    }
}

export function useFetchCohorts() {
    return useQuery({
        queryKey: ["allCohorts"],
        queryFn: async () => {
            // console.log("Fetching all cohorts...")

            try {
                const snapshot = await getDocs(collection(db!, "cohorts"))

                // console.log("Total cohorts found:", snapshot.size)

                if (snapshot.empty) {
                    // console.warn("No cohorts in database")
                    return []
                }

                const cohorts = snapshot.docs.map(convertFirestoreDoc)

                // Sort by year and quarter
                cohorts.sort((a, b) => {
                    if (b.year !== a.year) return b.year - a.year
                    const quarterOrder = { Q4: 4, Q3: 3, Q2: 2, Q1: 1 }
                    return quarterOrder[b.quarter] - quarterOrder[a.quarter]
                })

                // console.log("Cohorts loaded:", cohorts.length)
                return cohorts
            } catch (error) {
                console.error("Error fetching cohorts:", error)
                throw error
            }
        },
        retry: 2,
        staleTime: 5 * 60 * 1000,
    })
}

export function useFetchActiveCohort() {
    return useQuery({
        queryKey: ["activeCohort"],
        queryFn: async () => {
            // console.log("Fetching active cohort...")

            try {
                // Simple query - just get active cohorts
                const q = query(collection(db!, "cohorts"), where("status", "==", "active"))

                const snapshot = await getDocs(q)

                // console.log(" Active cohorts found:", snapshot.size)

                if (snapshot.empty) {
                    console.warn("No active cohort")
                    return null
                }

                const now = new Date()
                const batch = writeBatch(db!)
                let hasUpdates = false

                // Get all active cohorts and filter in JS
                // const cohorts = snapshot.docs.map(convertFirestoreDoc)
                const cohorts = snapshot.docs.map((docSnap) => {
                    const cohort = convertFirestoreDoc(docSnap)

                    // Auto-close if endDate has passed and status isn't already closed
                    if (cohort.endDate < now && cohort.status !== "closed") {
                        batch.update(doc(db!, "cohorts", docSnap.id), { status: "closed" })
                        hasUpdates = true
                        return { ...cohort, status: "closed" as const }
                    }

                    return cohort
                })

                // Write all status updates in one batch
                if (hasUpdates) await batch.commit()

                // Filter by registration close date
                // const now = new Date()
                const validCohorts = cohorts.filter((cohort) => cohort.registrationClose > now)

                if (validCohorts.length === 0) {
                    console.warn("No cohorts with open registration")
                    return null
                }

                // Return the first valid one
                const activeCohort = validCohorts[0]
                // console.log("Active cohort:", activeCohort.name)

                return activeCohort
            } catch (error) {
                console.error("Error fetching active cohort:", error)
                throw error
            }
        },
        retry: 2,
        staleTime: 2 * 60 * 1000, // 2 minutes
        networkMode: "offlineFirst",
    })
}
