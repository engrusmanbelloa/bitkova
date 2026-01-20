import { collection, doc, setDoc, writeBatch, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { Course, Module, Lesson, Review } from "@/types/courseType"

interface UploadCourseInput {
    course: Course
    modules: (Module & { lessons: Lesson[] })[]
    reviews: Review[]
}

export async function uploadNewCourse({ course, modules, reviews }: UploadCourseInput) {
    // try {
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
    await batch.commit()
    console.log(" Course uploaded successfully")
    // } catch (error) {
    //     console.log("Failed to upload course:", error)
    //     // Provide specific error messages
    //     if (error instanceof Error) {
    //         if (error.message.includes("permission")) {
    //             throw new Error("You don't have permission to upload courses")
    //         } else if (error.message.includes("network")) {
    //             throw new Error("Network error. Please check your connection")
    //         } else {
    //             throw new Error(`Upload failed: ${error.message}`)
    //         }
    //     }

    //     throw new Error("An unexpected error occurred during upload")
    // }
}
