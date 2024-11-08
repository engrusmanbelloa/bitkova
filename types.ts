// course.ts

export interface CourseType {
    _id: number
    image?: string
    duration: {
        hours: number
        minutes: number
    }
    title: string
    shortDesc: string
    students: number
    rating: number
    price: number
    onDemandVideos: number
    downloadableFiles?: number
    courseDesc?: string
    about?: string
    whatYoullLearn?: string[]
    courseContent?: string[]
    review: {
        id: number
        stars: number
        comment: string
        Name: string
    }[]
}
