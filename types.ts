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
    }[]
    review: {
        id: number
        stars: number
        comment: string
        Name: string
    }[]
}
