// course.ts
export interface CourseType {
    _id: number
    image: string
    duration: {
        hours: number
        minutes: number
    }
    category: string
    facilitator: string
    facilitatorImage: string
    title: string
    shortDesc: string
    students: number
    skillLevel: string
    rating: number
    price: number
    onDemandVideos: number
    downloadableFiles?: number
    courseDesc: string
    about?: string
    whatYoullLearn: string[]
    courseContent?: string[]
    modules: {
        id: number
        title: string
        content: string[]
        links: Record<string, string>
    }[]
    review: {
        id: number
        stars: number
        comment: string
        Name: string
    }[]
}
export interface Facilitator {
    id: string // Firestore document ID
    name: string
    bio: string
    email: string
    profileUrl?: string
    expertise: string[] // e.g. ["Blockchain", "Web3"]
    createdAt: string
    courses: string[] // Array of course IDs
}

export interface VideoSelectionProps {
    url: string
    title: string
    setSelectedVideo: (url: string) => void
    setSelectedTitle: (title: string) => void
}
export interface Course {
    id: string
    title: string
    category: string
    skillLevel: string
    facilitatorEmail: string // link to a facilitator
    rating: number
    image: string
    about: string
    shortDesc: string
    courseDesc: string
    students: number
    price: number
    onDemandVideos: number
    downloadableFiles?: number
    whatYoullLearn: string[]
}
export interface Module {
    id: string
    title: string
    position: number // order of module in course
}
export interface Lesson {
    id: string
    title: string
    videoUrl: string
    content: string
    position: number // order of lesson in module
    durationMinutes: number
    resources?: string[] // optional links or files
}
export interface Review {
    id: string // Firestore document ID (can be same as `${userId}_${courseId}`)
    userId: string
    name: string
    courseId: string
    stars: number // 1 to 5
    comment: string
    createdAt: string // ISO string or Firestore Timestamp
}

export type CourseWithExtras = Course & {
    modules: (Module & { lessons: Lesson[] })[]
    reviews: Review[]
    duration: {
        hours: number
        minutes: number
    }
}
