// utils/formatDate.ts

type AnyDate =
    | Date
    | string
    | number
    | { toDate(): Date }
    | { toMillis(): number }
    | null
    | undefined

export function toDate(value: AnyDate): Date | null {
    if (!value) return null
    if (value instanceof Date) return value
    if (typeof (value as any).toDate === "function") return (value as any).toDate()
    if (typeof (value as any).toMillis === "function") return new Date((value as any).toMillis())
    const parsed = new Date(value as any)
    return isNaN(parsed.getTime()) ? null : parsed
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
}

const SHORT_FORMAT: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
}

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
}

export function formatDate(value: AnyDate): string {
    const date = toDate(value)
    return date ? date.toLocaleDateString("en-US", DATE_FORMAT) : ""
}

export function formatShortDate(value: AnyDate): string {
    const date = toDate(value)
    return date ? date.toLocaleDateString("en-GB", SHORT_FORMAT) : ""
}

export function formatDateTime(value: AnyDate): string {
    const date = toDate(value)
    return date ? date.toLocaleString("en-US", TIME_FORMAT) : ""
}

export function formatRelative(value: AnyDate): string {
    const date = toDate(value)
    if (!date) return ""

    const now = Date.now()
    const diff = now - date.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    if (seconds < 60) return "just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    if (weeks < 5) return `${weeks}w ago`
    if (months < 12) return `${months}mo ago`
    return `${years}y ago`
}
