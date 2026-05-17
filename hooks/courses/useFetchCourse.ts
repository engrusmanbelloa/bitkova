import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { Course, Review, Module, Lesson, CourseWithExtras, Facilitator } from "@/types/courseType"
import { useQuery } from "@tanstack/react-query"
import { toDate } from "@/utils/formatDate"

const fetchCourses = async (): Promise<CourseWithExtras[]> => {
    const courseSnap = await getDocs(collection(db!, "courses"))
    if (courseSnap.empty) {
        return []
    }

    const courses = await Promise.all(
        courseSnap.docs.map(async (docSnap) => {
            const courseId = docSnap.id
            const courseData = docSnap.data()

            // Fetch facilitator
            const facilitatorSnap = await getDocs(
                query(collection(db!, "users"), where("email", "==", courseData.facilitatorEmail)),
            )

            const facilitator: Facilitator = facilitatorSnap.docs.length
                ? {
                      ...(facilitatorSnap.docs[0].data() as Facilitator),
                  }
                : {
                      id: "default",
                      name: courseData.facilitatorEmail.split("@")[0],
                      bio: "",
                      email: courseData.facilitatorEmail,
                      profileUrl: "",
                      expertise: [],
                      createdAt: toDate(courseData.createdAt) ?? new Date(),
                      courses: [],
                  }

            // Fetch modules and lessons
            const modulesSnap = await getDocs(
                query(collection(db!, "courseModules"), where("courseId", "==", courseId)),
            )

            let totalMinutes = 0

            const modules = await Promise.all(
                modulesSnap.docs.map(async (moduleDoc) => {
                    const module = { id: moduleDoc.id, ...moduleDoc.data() } as Module

                    const lessonsSnap = await getDocs(
                        query(collection(db!, "courseLessons"), where("moduleId", "==", module.id)),
                    )

                    const lessons = lessonsSnap.docs.map((lessonDoc) => {
                        const lesson = { id: lessonDoc.id, ...lessonDoc.data() } as Lesson
                        totalMinutes += lesson.durationMinutes || 0
                        return lesson
                    })

                    return { ...module, lessons }
                }),
            )

            // Fetch reviews
            const reviewsSnap = await getDocs(
                query(collection(db!, "reviews"), where("courseId", "==", courseId)),
            )
            const reviews = reviewsSnap.docs.map((d) => ({ id: d.id, ...d.data() }))

            const hours = Math.floor(totalMinutes / 60)
            const minutes = totalMinutes % 60

            return {
                id: courseId,
                ...(courseData as any),
                modules,
                reviews,
                duration: { hours, minutes },
                facilitator,
            }
        }),
    )

    return courses
}

// export const useFetchCourses = () =>
//     useQuery({
//         queryKey: ["courses"],
//         queryFn: fetchCourses,
//     })

export const useFetchCourses = () =>
    useQuery<CourseWithExtras[], unknown>({
        queryKey: ["courses"],
        queryFn: fetchCourses,
    })
