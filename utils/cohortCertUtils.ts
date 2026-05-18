// utils / cohortCertUtils.ts

import { Timestamp } from "firebase/firestore"
import { Cohort } from "@/types/classTypes"

export function deriveCertificateFields(cohort: Cohort) {
    const regClose =
        cohort.registrationClose instanceof Date
            ? cohort.registrationClose
            : new Date((cohort.registrationClose as any).toMillis())

    const endDate =
        cohort.endDate instanceof Date
            ? cohort.endDate
            : new Date((cohort.endDate as any).toMillis())

    const msPerWeek = 7 * 24 * 60 * 60 * 1000
    const weeks = Math.round((endDate.getTime() - regClose.getTime()) / msPerWeek)
    const duration = weeks * 6

    const issuedAt = Timestamp.fromDate(new Date(endDate.getTime() - msPerWeek))

    const now = Date.now()
    const oneWeekBefore = endDate.getTime() - msPerWeek
    const completed = now >= oneWeekBefore

    // const completed = true

    return { duration, issuedAt, completed }
}
