// lib/store/useUserStore.ts
import { create } from "zustand"
import { EnrolledCourse, CompletedCourse, ArchivedCourse } from "@/types/userType"
import { ClassEnrollment } from "@/types/classTypes"

type UserStore = {
    // State
    cart: string[]
    wishlist: string[]
    enrolledCourses: EnrolledCourse[]
    completedCourses: CompletedCourse[]
    archivedCourses: ArchivedCourse[]
    classEnrollments: ClassEnrollment[]

    // Setters
    setCart: (cart: string[]) => void
    setWishlist: (wishlist: string[]) => void
    setEnrolledCourses: (courses: EnrolledCourse[]) => void
    setCompletedCourses: (courses: CompletedCourse[]) => void
    setArchivedCourses: (courses: ArchivedCourse[]) => void
    // Class enrollment actions
    setClassEnrollments: (enrollments: ClassEnrollment[]) => void

    // Cart actions
    addToCart: (courseId: string) => void
    removeFromCart: (courseId: string) => void

    // Wishlist actions
    addToWishlist: (courseId: string) => void
    removeFromWishlist: (courseId: string) => void

    // Enrolled courses actions
    addToEnrolledCourses: (course: EnrolledCourse) => void
    removeFromEnrolledCourses: (courseId: string) => void

    // Completed courses actions
    addToCompletedCourses: (course: CompletedCourse) => void
    removeFromCompletedCourses: (courseId: string) => void

    // Archived courses actions
    addToArchivedCourses: (course: ArchivedCourse) => void
    removeFromArchivedCourses: (courseId: string) => void

    // Class enrollment actions
    addClassEnrollment: (enrollment: ClassEnrollment) => void
    removeClassEnrollment: (enrollmentId: string) => void

    // Query helpers
    isInCart: (courseId: string) => boolean
    isInWishlist: (courseId: string) => boolean
    isEnrolled: (courseId: string) => boolean
    isCompleted: (courseId: string) => boolean
    isArchived: (courseId: string) => boolean
    isEnrolledInClass: (itemId: string) => boolean
}

export const useUserStore = create<UserStore>((set, get) => ({
    // Initial state
    cart: [],
    wishlist: [],
    enrolledCourses: [],
    completedCourses: [],
    archivedCourses: [],
    classEnrollments: [],

    // Setters
    setCart: (cart) => set({ cart }),
    setWishlist: (wishlist) => set({ wishlist }),
    setEnrolledCourses: (courses) => set({ enrolledCourses: courses }),
    setCompletedCourses: (courses) => set({ completedCourses: courses }),
    setArchivedCourses: (courses) => set({ archivedCourses: courses }),
    setClassEnrollments: (enrollments) => set({ classEnrollments: enrollments }),

    // Class enrollment actions
    addClassEnrollment: (enrollment) => {
        const { classEnrollments } = get()
        if (!classEnrollments.some((e) => e.id === enrollment.id)) {
            set({ classEnrollments: [...classEnrollments, enrollment] })
        }
    },

    removeClassEnrollment: (enrollmentId) => {
        set({
            classEnrollments: get().classEnrollments.filter((e) => e.id !== enrollmentId),
        })
    },

    isEnrolledInClass: (itemId) => {
        return get().classEnrollments.some((e) => e.itemId === itemId)
    },

    // Cart actions
    addToCart: (courseId) => {
        const cart = get().cart
        if (!cart.includes(courseId)) {
            set({ cart: [...cart, courseId] })
        }
    },

    removeFromCart: (courseId) => {
        const cart = get().cart.filter((id) => id !== courseId)
        set({ cart })
    },

    // Wishlist actions
    addToWishlist: (courseId) => {
        const wishlist = get().wishlist
        if (!wishlist.includes(courseId)) {
            set({ wishlist: [...wishlist, courseId] })
        }
    },
    removeFromWishlist: (courseId) => {
        const wishlist = get().wishlist.filter((id) => id !== courseId)
        set({ wishlist })
    },
    // Enrolled courses actions
    addToEnrolledCourses: (course: EnrolledCourse) => {
        const { enrolledCourses } = get()
        if (!enrolledCourses.some((c) => c.courseId === course.courseId)) {
            set(() => ({ enrolledCourses: [...enrolledCourses, course] }))
        }
    },
    removeFromEnrolledCourses: (courseId: string) => {
        const enrolledCourses = get().enrolledCourses.filter(
            (course) => course.courseId !== courseId,
        )
        set({ enrolledCourses })
    },

    // Completed courses actions
    addToCompletedCourses: (course) => {
        if (!get().isCompleted(course.courseId)) {
            set({ completedCourses: [...get().completedCourses, course] })
        }
    },
    removeFromCompletedCourses: (courseId) => {
        set({ completedCourses: get().completedCourses.filter((c) => c.courseId !== courseId) })
    },
    // Archived courses actions
    addToArchivedCourses: (course) => {
        if (!get().isArchived(course.courseId)) {
            set({ archivedCourses: [...get().archivedCourses, course] })
        }
    },
    removeFromArchivedCourses: (courseId) => {
        set({ archivedCourses: get().archivedCourses.filter((c) => c.courseId !== courseId) })
    },

    isInCart: (courseId) => get().cart.includes(courseId),
    isInWishlist: (courseId) => get().wishlist.includes(courseId),
    isEnrolled: (courseId) => get().enrolledCourses.some((course) => course.courseId === courseId),
    isCompleted: (courseId) => get().completedCourses.some((c) => c.courseId === courseId),
    isArchived: (courseId) => get().archivedCourses.some((c) => c.courseId === courseId),
}))
