export function trimName(fullName: string) {
    if (!fullName) return ""

    const parts = fullName.trim().split(/\s+/)

    if (parts.length <= 2) {
        return parts.join(" ")
    }

    return `${parts[0]} ${parts[1]} ${parts[2][0].toUpperCase()}.`
}
