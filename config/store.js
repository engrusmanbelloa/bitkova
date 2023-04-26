import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as localforage from 'localforage' // Importing 'localforage' library

// Create a localforage instance
const localforageInstance = localforage.createInstance({
  name: 'bitkova', // Set a unique name for your app
})



const useStore = create(
  persist(
    (set, get) => ({
     // cart and enrolled courses arrays, active courses, completed courses
      cart: [],
      enrolledCourses: [],
      activeCourse: [],
      completedCourses: [],
      wishlist: [],
      ownCourses: [],
      points: 0,
      lessonSteps: null,
      
      // set state of system functions
      serverState: async () => {
        try {
          const response = await fetch("/api/profile/getUser", {
            method: "GET",
          })
          if (response.ok) {
            const data = await response.json()
            set({
              enrolledCourses: data.enrolledCourses,
              activeCourse: data.activeCourse,
              completedCourses: data.completedCourses,
              wishlist: data.wishlist,
              ownCourses: data.ownCourses,
            })
            // console.log("the user enrolled courses: ", data.enrolledCourses)
          }
        } catch (error) {
          console.log(error)
        }
      },
      
      addToCart: (course) => set((state) => ({ cart: [...state.cart, course] })),
      addToEnrolledCourses: (courseId) => set((state) => ({ enrolledCourses: [...state.enrolledCourses, courseId] })),
      addToActiveCourse: (courseId) => set((state) => ({ activeCourse: [...state.activeCourse, courseId] })),
      addToWishlist: (courseId) => set((state) => ({ wishlist: [...state.wishlist, courseId] })),
      addToOwnCourses: (courseId) => set((state) => ({ ownCourses: [...state.ownCourses, courseId] })),

      addToCompletedCourses: (courseId) => {
        const completedCourses = get().completedCourses
        if (!completedCourses.includes(courseId)) {
          // If this is the first course completed by the user
          set((state) => ({
            points: (state.points || 0) + 10,
            activeCourse: state.activeCourse.filter((c) => c !== courseId),
            completedCourses: [...state.completedCourses, courseId],
          }))
        }
      },
      // remove from cart function
      removeFromCart: (course) => set((state) => ({
          cart: state.cart.filter((c) => c._id !== course._id),
        })),

      clearCart: () =>  set({ cart: [] }),
      
      // Hydration setup
      _hasHydrated: false,
      setHasHydrated: (state) => {
      set({ _hasHydrated: state})
      },
    }),
    {
      // state storage goes here
      name: 'course-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => (localforage)),
      ssr: true,
    },
    {
      onRehydrateStorage: () => (state) => {
      state.setHasHydrated(true)
      }, 
    },
  )
)

export default useStore