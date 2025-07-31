import { create } from "zustand"

type UserStore = {
    cart: string[]
    wishlist: string[]
    setCart: (cart: string[]) => void
    setWishlist: (wishlist: string[]) => void
    addToCart: (courseId: string) => void
    removeFromCart: (courseId: string) => void
    addToWishlist: (courseId: string) => void
    removeFromWishlist: (courseId: string) => void
    isInCart: (courseId: string) => boolean
    isInWishlist: (courseId: string) => boolean
}

export const useUserStore = create<UserStore>((set, get) => ({
    cart: [],
    wishlist: [],

    setCart: (cart) => set({ cart }),
    setWishlist: (wishlist) => set({ wishlist }),

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

    isInCart: (courseId) => get().cart.includes(courseId),
    isInWishlist: (courseId) => get().wishlist.includes(courseId),
}))
