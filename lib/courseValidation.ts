export const VALIDATION_RULES = {
    TITLE_MAX_WORDS: 5,
    SHORT_DESC_MAX_WORDS: 17,
    TITLE_MIN_WORDS: 5,
    SHORT_DESC_MIN_WORDS: 17,
}

export function countWords(text: string): number {
    return text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
}

export function validateTitle(title: string): { isValid: boolean; error?: string } {
    const wordCount = countWords(title)

    if (!title.trim()) {
        return { isValid: false, error: "Title is required" }
    }

    if (wordCount < VALIDATION_RULES.TITLE_MIN_WORDS) {
        return {
            isValid: false,
            error: `Title must be at least ${VALIDATION_RULES.TITLE_MIN_WORDS} words`,
        }
    }

    if (wordCount > VALIDATION_RULES.TITLE_MAX_WORDS) {
        return {
            isValid: false,
            error: `Title cannot exceed ${VALIDATION_RULES.TITLE_MAX_WORDS} words`,
        }
    }

    return { isValid: true }
}

export function validateShortDescription(description: string): {
    isValid: boolean
    error?: string
} {
    const wordCount = countWords(description)

    if (!description.trim()) {
        return { isValid: false, error: "Short description is required" }
    }

    if (wordCount < VALIDATION_RULES.SHORT_DESC_MIN_WORDS) {
        return {
            isValid: false,
            error: `Short description must be at least ${VALIDATION_RULES.SHORT_DESC_MIN_WORDS} words`,
        }
    }

    if (wordCount > VALIDATION_RULES.SHORT_DESC_MAX_WORDS) {
        return {
            isValid: false,
            error: `Short description cannot exceed ${VALIDATION_RULES.SHORT_DESC_MAX_WORDS} words`,
        }
    }

    return { isValid: true }
}

export function truncateText(text: string, maxWords: number): string {
    const words = text.trim().split(/\s+/)
    if (words.length <= maxWords) return text
    return words.slice(0, maxWords).join(" ") + "..."
}
