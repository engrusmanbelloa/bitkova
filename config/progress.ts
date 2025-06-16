export const saveProgress = (courseId: number, lessonTitle: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(`progress-course-${courseId}`, lessonTitle)
    }
}

export const loadProgress = (courseId: number): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(`progress-course-${courseId}`)
    }
    return null
}
