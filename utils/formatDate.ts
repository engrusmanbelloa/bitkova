// utils/formatDate.ts
export function formatDate(date: unknown): string {
    if (!date) return ""

    // Firestore Timestamp (has toMillis)
    if (typeof (date as any).toMillis === "function") {
        return new Date((date as any).toMillis()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    // Firestore Timestamp (has toDate)
    if (typeof (date as any).toDate === "function") {
        return (date as any).toDate().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    // Plain Date or anything new Date() can parse
    return new Date(date as any).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}
