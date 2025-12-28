import { create } from "zustand"
import { EnrolledCourse, CompletedCourse, ArchivedCourse } from "@/types/userType"
import { ClassEnrollment } from "@/types/classTypes"

type UserStore = {
    cart: string[]
    wishlist: string[]
    enrolledCourses: EnrolledCourse[]
    completedCourses: CompletedCourse[]
    archivedCourses: ArchivedCourse[]
    classEnrollments: ClassEnrollment[]

    setCart: (cart: string[]) => void
    setWishlist: (wishlist: string[]) => void
    setEnrolledCourses: (courses: EnrolledCourse[]) => void
    setCompletedCourses: (courses: CompletedCourse[]) => void
    setArchivedCourses: (courses: ArchivedCourse[]) => void
    // Class enrollment actions
    setClassEnrollments: (enrollments: ClassEnrollment[]) => void
    addClassEnrollment: (enrollment: ClassEnrollment) => void
    removeClassEnrollment: (enrollmentId: string) => void
    isEnrolledInClass: (itemId: string) => boolean

    addToCart: (courseId: string) => void
    removeFromCart: (courseId: string) => void

    addToWishlist: (courseId: string) => void
    removeFromWishlist: (courseId: string) => void

    addToEnrolledCourses: (course: EnrolledCourse) => void
    removeFromEnrolledCourses: (courseId: string) => void

    addToCompletedCourses: (course: CompletedCourse) => void
    removeFromCompletedCourses: (courseId: string) => void

    addToArchivedCourses: (course: ArchivedCourse) => void
    removeFromArchivedCourses: (courseId: string) => void

    isInCart: (courseId: string) => boolean
    isInWishlist: (courseId: string) => boolean
    isEnrolled: (courseId: string) => boolean
    isCompleted: (courseId: string) => boolean
    isArchived: (courseId: string) => boolean
}

export const useUserStore = create<UserStore>((set, get) => ({
    cart: [],
    wishlist: [],
    enrolledCourses: [],
    completedCourses: [],
    archivedCourses: [],
    classEnrollments: [],

    setCart: (cart) => set({ cart }),
    setWishlist: (wishlist) => set({ wishlist }),
    setEnrolledCourses: (courses) => set({ enrolledCourses: courses }),
    setCompletedCourses: (courses) => set({ completedCourses: courses }),
    setArchivedCourses: (courses) => set({ archivedCourses: courses }),
    // Class enrollment setters
    setClassEnrollments: (enrollments) => set({ classEnrollments: enrollments }),

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

    addToCompletedCourses: (course) => {
        if (!get().isCompleted(course.courseId)) {
            set({ completedCourses: [...get().completedCourses, course] })
        }
    },
    removeFromCompletedCourses: (courseId) => {
        set({ completedCourses: get().completedCourses.filter((c) => c.courseId !== courseId) })
    },

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
