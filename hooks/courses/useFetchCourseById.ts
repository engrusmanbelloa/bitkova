import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { Course, Review, Module, Lesson, CourseWithExtras, Facilitator } from "@/types/courseType"

// fetchCourses by course id
const fetchCourseById = async (courseId: string): Promise<CourseWithExtras> => {
    // serialize data ready for the client side
    function serializeDoc<T extends object>(data: T): any {
        return JSON.parse(
            JSON.stringify(data, (_key, value) => {
                if (value?.toDate instanceof Function) {
                    return value.toDate().toISOString()
                }
                return value
            }),
        )
    }

    const docRef = doc(db, "courses", courseId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) throw new Error("Course not found")

    const courseData = docSnap.data()

    // Fetch facilitator by email
    const facilitatorSnap = await getDocs(
        query(collection(db, "users"), where("email", "==", courseData.facilitatorEmail)),
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
              createdAt: new Date().toISOString(),
              courses: [],
          }

    // Fetch related modules and lessons
    const modulesSnap = await getDocs(
        query(collection(db, "courseModules"), where("courseId", "==", courseId)),
    )

    let totalMinutes = 0

    const modules = await Promise.all(
        modulesSnap.docs.map(async (moduleDoc) => {
            const module = { id: moduleDoc.id, ...moduleDoc.data() } as Module
            const lessonsSnap = await getDocs(
                query(collection(db, "courseLessons"), where("moduleId", "==", module.id)),
            )
            const lessons = lessonsSnap.docs.map((d) => {
                const lesson = { id: d.id, ...d.data() } as Lesson
                totalMinutes += lesson.durationMinutes || 0
                return lesson
            })
            // console.log("Lessons... ", module, lessons)
            return { ...module, lessons }
        }),
    )

    // Fetch reviews
    const reviewsSnap = await getDocs(
        query(collection(db, "reviews"), where("courseId", "==", courseId)),
    )
    const reviews = reviewsSnap.docs.map((d) => ({ id: d.id, ...d.data() }))

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    // console.log("Modules for this course: ", modules)
    // console.log("Duration of this course: ", hours)
    // console.log("Data of this course: ", courseData)
    // console.log("Lessons of this course: ", lesson)
    return serializeDoc({
        id: docSnap.id,
        ...(courseData as any),
        modules,
        reviews,
        duration: { hours, minutes },
        facilitator,
    })
}

export function useCourseById(courseId: string) {
    return useQuery({
        queryKey: ["course", courseId],
        queryFn: () => fetchCourseById(courseId),
        enabled: !!courseId, // ensures query runs only when courseId is defined
    })
}
