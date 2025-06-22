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

export interface User {
    id: string
    name: string
    email: string
    type: "student" | "instructor" | "admin" | "guest"
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

export const users: User[] = [
    {
        id: "user1",
        name: "Usman Bello Abdullahi",
        email: "usman@example.com",
        type: "student",
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
        type: "instructor",
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
