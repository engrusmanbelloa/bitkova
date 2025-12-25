// hooks/useFullCourse.ts
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { useEffect, useState } from "react"
import { CourseWithExtras, Course, Module, Review, Lesson } from "@/types/course"

export function useFullCourse(courseId: string) {
    const [course, setCourse] = useState<CourseWithExtras | null>(null)
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     async function fetchCourseData() {
    //         try {
    //             const docSnap = await getDoc(doc(db, "courses", courseId))
    //             if (!docSnap.exists()) return

    //             const baseData = docSnap.data() as Course

    //             // Fetch Modules
    //             const modulesQuery = query(
    //                 collection(db, "courseModules"),
    //                 where("courseId", "==", courseId),
    //             )
    //             const modulesSnap = await getDocs(modulesQuery)
    //             const modules: (Module & { lessons: Lesson[] })[] = await Promise.all(
    //                 modulesSnap.docs.map(async (modDoc) => {
    //                     const modData = modDoc.data() as Module
    //                     const lessonQuery = query(
    //                         collection(db, "courseLessons"),
    //                         where("courseId", "==", courseId),
    //                         where("moduleId", "==", modData.id),
    //                     )
    //                     const lessonSnap = await getDocs(lessonQuery)
    //                     const lessons: Lesson[] = lessonSnap.docs.map((d) => d.data() as Lesson)

    //                     return {
    //                         ...modData,
    //                         lessons,
    //                     }
    //                 }),
    //             )
    //             // Fetch Reviews
    //             const reviewsQuery = query(
    //                 collection(db, "courseReviews"),
    //                 where("courseId", "==", courseId),
    //             )
    //             const reviewsSnap = await getDocs(reviewsQuery)
    //             const reviews: Review[] = reviewsSnap.docs.map((d) => d.data() as Review)

    //             setCourse({
    //                 ...baseData,
    //                 modules,
    //                 reviews,
    //                 duration: baseData.duration,
    //                 facilitator: baseData.facilitator,
    //             })
    //         } catch (err) {
    //             console.error("Failed to fetch full course:", err)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchCourseData()
    // }, [courseId])

    return { course, loading }
}
