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
      wishlist: [],
      points: null,
      completedCourses: [],
      ownCourses: [],
      activeCourse: [],
      lessonSteps: null,
      // add  to cart function
      addToCart: (course) => set((state) => ({ cart: [...state.cart, course] })),
      // add  to enrolled courses function
      addToEnrolledCourses: (courseId) => set((state) => ({ enrolledCourses: [...state.enrolledCourses, courseId] })),
      // remove from cart function
      removeFromCart: (course) => set((state) => ({
          cart: state.cart.filter((c) => c._id !== course._id),
        })),
      // Hydration setup
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({ _hasHydrated: state})
      },
    }),
    {
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true)
      },
      // state storage goes here
      name: 'course-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => (localforage)),
      ssr: true,
    },
    {
      
    },
  )
)

export default useStore