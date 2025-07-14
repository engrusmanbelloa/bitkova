import { CourseType } from "@/types"
import { featuredCourses } from "@/data"

const getCourseDetailsById = (courseId: number): CourseType | undefined => {
    return featuredCourses.find((course) => course._id === courseId)
}

// Represents user-specific progress for a course
export interface UserCourseProgress {
    course: CourseType
    completedLessons: number
    progress: number // Percentage (0-100)
    status: "completed" | "in-progress" | "archived" | "wishlist" | "cart"
}

export interface Users {
    id: string
    name: string
    email: string
    role: "student" | "instructor" | "admin" | "guest"
    username: string
    phoneNumber: string
    skill: string
    bio: string
    registrationDate: string
    enrolledCourses: UserCourseProgress[]
    completedCourses: UserCourseProgress[]
    archivedCourses: UserCourseProgress[]
    wishList: UserCourseProgress[]
    cart: UserCourseProgress[]
}
export interface User {
    id: string // Firebase UID
    name: string
    email: string
    role: "guest" | "student" | "instructor" | "admin"
    username: string
    bio: string
    skill: string
    phoneNumber: string
    registrationDate: string // Can use Timestamp in Firestore
}
export interface EnrolledCourse {
    id: string // Optional: custom ID like `${userId}_${courseId}`
    userId: string // UID from Firebase Auth
    courseId: string // Document ID from the `courses` collection
    completedLessons: number
    progress: number // e.g. 0 to 100
    status: "in progress" | "completed"
    enrolledAt: Date
    updatedAt: Date
}
export interface WishListItem {
    id: string // `${userId}_${courseId}`
    userId: string
    courseId: string
    addedAt: Date
}
export interface ArchivedCourse {
    id: string // `${userId}_${courseId}`
    userId: string
    courseId: string
    archivedAt: Date
    reason?: string
}
export interface Certificate {
    id: string // `${userId}_${courseId}`
    userId: string
    courseId: string
    issuedAt: Date
}
export interface Cart {
    courseId: string
    // courseTitle: string
    // priceAtTime: number
    addedAt: Date
}
export interface CompletedCourse {
    id: string
    userId: string
    courseId: string
    completedAt: Date
    // any other fields you store
}

export const users: Users[] = [
    {
        id: "user1",
        name: "Usman Bello Abdullahi",
        email: "usman@example.com",
        role: "student",
        username: "usmanbello",
        phoneNumber: "+234 80361 00001",
        skill: "Blockchain Developer",
        bio: "Passionate about blockchain and web3 development.",
        registrationDate: "February 15, 2024 10:45am",
        enrolledCourses: [
            {
                course: getCourseDetailsById(1)!,
                completedLessons: 14,
                progress: 70,
                status: "in-progress",
            },
            {
                course: getCourseDetailsById(2)!,
                completedLessons: 5,
                progress: 30,
                status: "in-progress",
            },
        ],
        completedCourses: [
            {
                course: getCourseDetailsById(1)!,
                completedLessons: 25,
                progress: 100,
                status: "completed",
            },
        ],
        archivedCourses: [],
        wishList: [
            {
                course: getCourseDetailsById(3)!,
                completedLessons: 0,
                progress: 0,
                status: "wishlist",
            },
        ],
        cart: [],
    },

    {
        id: "user2",
        name: "Mahmoud Muhammad Sardauna",
        email: "abudanbwai@bitkova.com",
        role: "instructor",
        username: "Abudanbwai",
        phoneNumber: "+234 80361 07361",
        skill: "Danbaiwa",
        bio: "UX/UI Designer in the Morning. Danbaiwa in the Night.",
        registrationDate: "March 25, 2024 12:32pm",
        enrolledCourses: [],
        completedCourses: [],
        archivedCourses: [],
        wishList: [],
        cart: [],
    },
]
