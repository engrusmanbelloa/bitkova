interface Course {
    id: string
    title: string
    progress: number // Percentage (0-100)
    status: "completed" | "in-progress" | "archived" | "wishlist" | "cart"
}

export interface User {
    id: string
    name: string
    email: string
    type: "student" | "instructor" | "admin"
    username: string
    phoneNumber: string
    skill: string
    bio: string
    registrationDate: string
    enrolledCourses: Course[]
    completedCourses: Course[]
    archivedCourses: Course[]
    wishList: Course[]
    cart: Course[]
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
                id: "course1",
                title: "Blockchain Fundamentals",
                progress: 70,
                status: "in-progress",
            },
            { id: "course2", title: "AI for Telecom", progress: 30, status: "in-progress" },
        ],
        completedCourses: [
            { id: "course3", title: "Intro to 5G", progress: 100, status: "completed" },
        ],
        archivedCourses: [],
        wishList: [
            { id: "course4", title: "Quantum Cryptography", progress: 0, status: "wishlist" },
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
