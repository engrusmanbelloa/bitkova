// // lib/store/syncUserStore.ts
// import { doc, getDoc, collection, getDocs, onSnapshot, Timestamp } from "firebase/firestore"
// import { db } from "@/lib/firebase/firebaseConfig"
// import { useUserStore } from "@/lib/store/useUserStore"
// import { EnrolledCourse, CompletedCourse, ArchivedCourse } from "@/types/userType"

// export const syncUserStore = async (userId: string) => {
//     const userRef = doc(db, "users", userId)
//     const userSnap = await getDoc(userRef)
//     if (userSnap.exists()) {
//         const userData = userSnap.data()
//         useUserStore.getState().setWishlist(userData.wishList || [])
//         useUserStore.getState().setCart(userData.cart || [])
//     }

//     // Get enrolledCourses subcollection
//     // const enrolledCoursesRef = collection(db, "users", userId, "enrolledCourses")
//     // const enrolledSnap = await getDocs(enrolledCoursesRef)

//     // const enrolledList: EnrolledCourse[] = enrolledSnap.docs.map((docSnap) => {
//     //     const data = docSnap.data() as Omit<EnrolledCourse, "enrolledAt" | "updatedAt"> & {
//     //         enrolledAt: Timestamp
//     //         updatedAt: Timestamp
//     //     }

//     //     return {
//     //         ...data,
//     //         enrolledAt: data.enrolledAt.toDate(),
//     //         updatedAt: data.updatedAt.toDate(),
//     //     }
//     // })

//     // const fetchCourses = async (subPath: string) => {
//     //     const ref = collection(db, "users", userId, subPath)
//     //     const snap = await getDocs(ref)
//     //     return snap.docs.map((d) => {
//     //         const c = d.data()
//     //         return {
//     //             ...c,
//     //             enrolledAt: c.enrolledAt?.toDate(),
//     //             updatedAt: c.updatedAt?.toDate(),
//     //         }
//     //     })
//     // }
//     // const fetchCourses = async (subPath: string) => {
//     //     const ref = collection(db, "users", userId, subPath)
//     //     const snap = await getDocs(ref)
//     //     return snap.docs.map((d) => {
//     //         const c = d.data()
//     //         return {
//     //             ...c,
//     //             enrolledAt: c.enrolledAt?.toDate(),
//     //             archivedAt: c.archivedAt?.toDate(),
//     //             userId: userId,
//     //             courseId: c.courseId || "",
//     //             completedLessons: c.completedLessons || 0,
//     //             progress: c.progress || 0,
//     //             status: c.status || "",
//     //         }
//     //     })
//     // }

//     // useUserStore.getState().setEnrolledCourses(await fetchCourses("enrolledCourses"))
//     // useUserStore.getState().setCompletedCourses(await fetchCourses("completedCourses"))
//     // useUserStore.getState().setArchivedCourses(await fetchCourses("archivedCourses"))

//     // useUserStore.getState().setEnrolledCourses(enrolledList)

//     // --- Enrolled Courses ---

//     // --- Enrolled Courses ---
//     // const enrolledSnap = await getDocs(collection(db, "users", userId, "enrolledCourses"))
//     // const enrolledList: EnrolledCourse[] = enrolledSnap.docs.map((docSnap) => {
//     //     const data = docSnap.data() as any
//     //     return {
//     //         ...data,
//     //         enrolledAt: data.enrolledAt?.toDate(),
//     //         updatedAt: data.updatedAt?.toDate(),
//     //     }
//     // })
//     onSnapshot(collection(db, "users", userId, "enrolledCourses"), (snap) => {
//         const list: EnrolledCourse[] = snap.docs.map((docSnap) => {
//             const data = docSnap.data() as any
//             return {
//                 ...data,
//                 enrolledAt: data.enrolledAt?.toDate(),
//                 updatedAt: data.updatedAt?.toDate(),
//             }
//         })
//         useUserStore.getState().setEnrolledCourses(list)
//     })

//     // --- Completed Courses ---
//     const completedSnap = await getDocs(collection(db, "users", userId, "completedCourses"))
//     const completedList: CompletedCourse[] = completedSnap.docs.map((docSnap) => {
//         const data = docSnap.data() as any
//         return {
//             ...data,
//             completedAt: data.completedAt?.toDate(),
//         }
//     })
//     useUserStore.getState().setCompletedCourses(completedList)

//     // --- Archived Courses ---
//     const archivedSnap = await getDocs(collection(db, "users", userId, "archivedCourses"))
//     const archivedList: ArchivedCourse[] = archivedSnap.docs.map((docSnap) => {
//         const data = docSnap.data() as any
//         return {
//             ...data,
//             archivedAt: data.archivedAt?.toDate(),
//         }
//     })
//     useUserStore.getState().setArchivedCourses(archivedList)
// }

// lib/store/syncUserStore.ts
import { doc, getDoc, collection, getDocs, onSnapshot, Unsubscribe } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { useUserStore } from "@/lib/store/useUserStore"
import { EnrolledCourse, CompletedCourse, ArchivedCourse } from "@/types/userType"

/**
 * Helper to map Firestore timestamps to JS Dates
 */
const mapDoc = (docSnap: any) => {
    const data = docSnap.data()
    return {
        ...data,
        // Automatically handle any common timestamp fields
        enrolledAt: data.enrolledAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        completedAt: data.completedAt?.toDate(),
        archivedAt: data.archivedAt?.toDate(),
    }
}

export const syncUserStore = (userId: string): Unsubscribe => {
    const store = useUserStore.getState()

    // 1. Fetch Static/One-time Data (Cart, Wishlist, Completed, Archived)
    // We run these in parallel for maximum speed
    const initializeStaticData = async () => {
        try {
            const [userSnap, completedSnap, archivedSnap] = await Promise.all([
                getDoc(doc(db, "users", userId)),
                getDocs(collection(db, "users", userId, "completedCourses")),
                getDocs(collection(db, "users", userId, "archivedCourses")),
            ])

            // Set Wishlist & Cart
            if (userSnap.exists()) {
                const userData = userSnap.data()
                store.setWishlist(userData.wishList || [])
                store.setCart(userData.cart || [])
            }

            // Set Completed
            store.setCompletedCourses(completedSnap.docs.map(mapDoc) as CompletedCourse[])

            // Set Archived
            store.setArchivedCourses(archivedSnap.docs.map(mapDoc) as ArchivedCourse[])
        } catch (error) {
            console.error("Error initializing user data:", error)
        }
    }

    initializeStaticData()

    // 2. Setup Real-time Listener for Enrolled Courses
    // This is the only thing that needs to be "Live"
    const unsubscribe = onSnapshot(
        collection(db, "users", userId, "enrolledCourses"),
        (snap) => {
            const list = snap.docs.map(mapDoc) as EnrolledCourse[]
            store.setEnrolledCourses(list)
        },
        (err) => console.error("Enrollment listener error:", err),
    )

    // 3. Return unsubscribe so the hook can clean up
    return unsubscribe
}
