import { collection, doc, setDoc, writeBatch, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { CourseWithExtras, Course, Module, Lesson, Facilitator, Review } from "@/types"

interface UploadCourseInput {
    course: Course
    modules: (Module & { lessons: Lesson[] })[]
    reviews: Review[]
}

export async function uploadNewCourse({ course, modules, reviews }: UploadCourseInput) {
    const batch = writeBatch(db)

    // Create the course document
    const courseRef = doc(db, "courses", course.id)
    batch.set(courseRef, {
        ...course,
        createdAt: serverTimestamp(),
    })

    // Upload modules and nested lessons
    for (const module of modules) {
        const moduleRef = doc(db, "courseModules", `${course.id}_module_${module.id}`)
        batch.set(moduleRef, {
            id: module.id,
            courseId: course.id,
            title: module.title,
            position: module.position,
        })

        for (const lesson of module.lessons) {
            const lessonRef = doc(
                db,
                "courseLessons",
                `${course.id}_module_${module.id}_lesson_${lesson.id}`,
            )
            batch.set(lessonRef, {
                ...lesson,
                courseId: course.id,
                moduleId: module.id,
            })
        }
    }

    // Upload reviews
    for (const review of reviews) {
        const reviewRef = doc(db, "courseReviews", review.id)
        batch.set(reviewRef, {
            ...review,
            createdAt: review.createdAt || serverTimestamp(),
        })
    }

    // Commit all batched writes
    try {
        await batch.commit()
        console.log(" Course uploaded successfully")
    } catch (error) {
        console.error("Failed to upload course:", error)
        throw error
    }
}
