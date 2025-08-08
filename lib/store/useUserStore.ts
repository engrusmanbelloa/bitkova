import { create } from "zustand"
import { EnrolledCourse } from "@/userType"

type UserStore = {
    cart: string[]
    wishlist: string[]
    enrolledCourses: EnrolledCourse[]

    setCart: (cart: string[]) => void
    setWishlist: (wishlist: string[]) => void
    setEnrolledCourses: (courses: EnrolledCourse[]) => void

    addToCart: (courseId: string) => void
    removeFromCart: (courseId: string) => void

    addToWishlist: (courseId: string) => void
    removeFromWishlist: (courseId: string) => void

    addToEnrolledCourses: (course: EnrolledCourse) => void
    // addToEnrolledCourses: (course: EnrolledCourse[]) => void
    removeFromEnrolledCourses: (courseId: string) => void

    isInCart: (courseId: string) => boolean
    isInWishlist: (courseId: string) => boolean
    isEnrolled: (courseId: string) => boolean
}

export const useUserStore = create<UserStore>((set, get) => ({
    cart: [],
    wishlist: [],
    enrolledCourses: [],

    setCart: (cart) => set({ cart }),
    setWishlist: (wishlist) => set({ wishlist }),
    setEnrolledCourses: (courses) => set({ enrolledCourses: courses }),

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

    // addToEnrolledCourses: (course: EnrolledCourse[]) => {
    //     const { enrolledCourses } = get()
    //     const unique = course.filter(
    //         (course) => !enrolledCourses.some((c) => c.courseId === course.courseId),
    //     )
    //     if (unique.length > 0) {
    //         set(() => ({ enrolledCourses: [...enrolledCourses, ...unique] }))
    //     }
    // },

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

    isInCart: (courseId) => get().cart.includes(courseId),
    isInWishlist: (courseId) => get().wishlist.includes(courseId),
    isEnrolled: (courseId) => get().enrolledCourses.some((course) => course.courseId === courseId),
}))
