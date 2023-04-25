import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as localforage from 'localforage' // Importing 'localforage' library

// Create a localforage instance
const localforageInstance = localforage.createInstance({
  name: 'bitkova', // Set a unique name for your app
})

// // Add the purchased course to the user's record in the database
// await db.collection('users').updateOne(
//   { _id: req.session.userId },
//   { $addToSet: { purchasedCourses: courseId } }
// )

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
      points: null,
      lessonSteps: null,
      // add  to cart function
      addToCart: (course) => set((state) => ({ cart: [...state.cart, course] })),
      // add  to enrolled courses function
      addToEnrolledCourses: (courseId) => set((state) => ({ enrolledCourses: [...state.enrolledCourses, courseId] })),
      addToActiveCourse: (courseId) => set((state) => ({ activeCourse: [...state.activeCourse, courseId] })),
      addToCompletedCourses: (courseId) => set((state) => ({ completedCourses: [...state.completedCourses, courseId] })),
      addToWishlist: (courseId) => set((state) => ({ wishlist: [...state.wishlist, courseId] })),
      addToOwnCourses: (courseId) => set((state) => ({ ownCourses: [...state.ownCourses, courseId] })),
      // addToPoints: (courseId) => set((state) => ({ points: [...state.points, courseId] })),
      // remove from cart function
      removeFromCart: (course) => set((state) => ({
          cart: state.cart.filter((c) => c._id !== course._id),
        })),

      clearCart: () =>  set({ cart: [] }),
      
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