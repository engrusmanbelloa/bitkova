import { doc, getDoc, collection, getDocs, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { useUserStore } from "@/lib/store/useUserStore"
import { EnrolledCourse, CompletedCourse, ArchivedCourse } from "@/userType"

export const syncUserStore = async (userId: string) => {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
        const userData = userSnap.data()
        useUserStore.getState().setWishlist(userData.wishList || [])
        useUserStore.getState().setCart(userData.cart || [])
    }

    // Get enrolledCourses subcollection
    // const enrolledCoursesRef = collection(db, "users", userId, "enrolledCourses")
    // const enrolledSnap = await getDocs(enrolledCoursesRef)

    // const enrolledList: EnrolledCourse[] = enrolledSnap.docs.map((docSnap) => {
    //     const data = docSnap.data() as Omit<EnrolledCourse, "enrolledAt" | "updatedAt"> & {
    //         enrolledAt: Timestamp
    //         updatedAt: Timestamp
    //     }

    //     return {
    //         ...data,
    //         enrolledAt: data.enrolledAt.toDate(),
    //         updatedAt: data.updatedAt.toDate(),
    //     }
    // })

    // const fetchCourses = async (subPath: string) => {
    //     const ref = collection(db, "users", userId, subPath)
    //     const snap = await getDocs(ref)
    //     return snap.docs.map((d) => {
    //         const c = d.data()
    //         return {
    //             ...c,
    //             enrolledAt: c.enrolledAt?.toDate(),
    //             updatedAt: c.updatedAt?.toDate(),
    //         }
    //     })
    // }
    // const fetchCourses = async (subPath: string) => {
    //     const ref = collection(db, "users", userId, subPath)
    //     const snap = await getDocs(ref)
    //     return snap.docs.map((d) => {
    //         const c = d.data()
    //         return {
    //             ...c,
    //             enrolledAt: c.enrolledAt?.toDate(),
    //             archivedAt: c.archivedAt?.toDate(),
    //             userId: userId,
    //             courseId: c.courseId || "",
    //             completedLessons: c.completedLessons || 0,
    //             progress: c.progress || 0,
    //             status: c.status || "",
    //         }
    //     })
    // }

    // useUserStore.getState().setEnrolledCourses(await fetchCourses("enrolledCourses"))
    // useUserStore.getState().setCompletedCourses(await fetchCourses("completedCourses"))
    // useUserStore.getState().setArchivedCourses(await fetchCourses("archivedCourses"))

    // useUserStore.getState().setEnrolledCourses(enrolledList)

    // --- Enrolled Courses ---

    // --- Enrolled Courses ---
    const enrolledSnap = await getDocs(collection(db, "users", userId, "enrolledCourses"))
    const enrolledList: EnrolledCourse[] = enrolledSnap.docs.map((docSnap) => {
        const data = docSnap.data() as any
        return {
            ...data,
            enrolledAt: data.enrolledAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
        }
    })
    useUserStore.getState().setEnrolledCourses(enrolledList)

    // --- Completed Courses ---
    const completedSnap = await getDocs(collection(db, "users", userId, "completedCourses"))
    const completedList: CompletedCourse[] = completedSnap.docs.map((docSnap) => {
        const data = docSnap.data() as any
        return {
            ...data,
            completedAt: data.completedAt?.toDate(),
        }
    })
    useUserStore.getState().setCompletedCourses(completedList)

    // --- Archived Courses ---
    const archivedSnap = await getDocs(collection(db, "users", userId, "archivedCourses"))
    const archivedList: ArchivedCourse[] = archivedSnap.docs.map((docSnap) => {
        const data = docSnap.data() as any
        return {
            ...data,
            archivedAt: data.archivedAt?.toDate(),
        }
    })
    useUserStore.getState().setArchivedCourses(archivedList)
}
