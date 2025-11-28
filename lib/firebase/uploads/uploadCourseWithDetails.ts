// import { collection, doc, setDoc, writeBatch, serverTimestamp } from "firebase/firestore"
// import { db } from "@/lib/firebase/firebaseConfig"
// import { Course, Module, Lesson, Review } from "@/types"

// interface UploadCourseInput {
//     course: Course
//     modules: (Module & { lessons: Lesson[] })[]
//     reviews: Review[]
// }
// // Validation constants
// const MAX_TITLE_WORDS = 5
// const MAX_SHORT_DESC_WORDS = 17
// const MAX_SHORT_DESC_CHARS = 200

// // Validation helper
// function validateCourse(course: Course): string[] {
//     const errors: string[] = []

//     if (!course.title?.trim()) errors.push("Course title is required")
//     if (!course.category) errors.push("Category is required")
//     if (!course.skillLevel) errors.push("Skill level is required")
//     if (!course.facilitatorEmail?.trim()) errors.push("Facilitator email is required")
//     if (!course.image?.trim()) errors.push("Course image URL is required")
//     if (!course.about?.trim()) errors.push("Course about section is required")
//     if (!course.shortDesc?.trim()) errors.push("Short description is required")
//     if (!course.courseDesc?.trim()) errors.push("Full description is required")
//     // if (!course.price || course.price < 0) errors.push("Valid price is required")

//     // Validate short description length
//     if (course.shortDesc) {
//         const wordCount = course.shortDesc.trim().split(/\s+/).length
//         if (wordCount > MAX_SHORT_DESC_WORDS) {
//             errors.push(
//                 `Short description must be ${MAX_SHORT_DESC_WORDS} words or less (currently ${wordCount} words)`,
//             )
//         }
//         if (course.shortDesc.length > MAX_SHORT_DESC_CHARS) {
//             errors.push(`Short description must be ${MAX_SHORT_DESC_CHARS} characters or less`)
//         }
//     }

//     // Validate short description length
//     if (course.title) {
//         const wordCount = course.title.trim().split(/\s+/).length
//         if (wordCount > MAX_TITLE_WORDS) {
//             errors.push(
//                 `Course Title must be ${MAX_TITLE_WORDS} words or less (currently ${wordCount} words)`,
//             )
//         }
//     }

//     return errors
// }

// function validateModules(modules: (Module & { lessons: Lesson[] })[]): string[] {
//     const errors: string[] = []

//     if (!modules || modules.length === 0) {
//         errors.push("At least one module is required")
//         return errors
//     }

//     modules.forEach((module, index) => {
//         if (!module.title?.trim()) {
//             errors.push(`Module ${index + 1}: Title is required`)
//         }
//         if (module.position === undefined || module.position < 0) {
//             errors.push(`Module ${index + 1}: Valid position is required`)
//         }
//         if (!module.lessons || module.lessons.length === 0) {
//             errors.push(`Module ${index + 1}: At least one lesson is required`)
//         }

//         module.lessons.forEach((lesson, lessonIndex) => {
//             if (!lesson.title?.trim()) {
//                 errors.push(`Module ${index + 1}, Lesson ${lessonIndex + 1}: Title is required`)
//             }
//             if (!lesson.videoUrl?.trim()) {
//                 errors.push(`Module ${index + 1}, Lesson ${lessonIndex + 1}: Video URL is required`)
//             }
//             if (lesson.position === undefined || lesson.position < 0) {
//                 errors.push(
//                     `Module ${index + 1}, Lesson ${lessonIndex + 1}: Valid position is required`,
//                 )
//             }
//         })
//     })

//     return errors
// }

// export async function uploadNewCourse({ course, modules, reviews }: UploadCourseInput) {
//     // Validate input
//     const courseErrors = validateCourse(course)
//     const moduleErrors = validateModules(modules)
//     const allErrors = [...courseErrors, ...moduleErrors]

//     if (allErrors.length > 0) {
//         throw new Error(`Validation failed:\n${allErrors.join("\n")}`)
//     }

//     const batch = writeBatch(db)

//     try {
//         // Create the course document
//         const courseRef = doc(db, "courses", course.id)
//         batch.set(courseRef, {
//             ...course,
//             createdAt: serverTimestamp(),
//             updatedAt: serverTimestamp(),
//         })

//         // Upload modules and nested lessons
//         for (const module of modules) {
//             const moduleRef = doc(db, "courseModules", `${course.id}_module_${module.id}`)
//             batch.set(moduleRef, {
//                 id: module.id,
//                 courseId: course.id,
//                 title: module.title,
//                 position: module.position,
//                 createdAt: serverTimestamp(),
//             })

//             for (const lesson of module.lessons) {
//                 const lessonRef = doc(
//                     db,
//                     "courseLessons",
//                     `${course.id}_module_${module.id}_lesson_${lesson.id}`,
//                 )
//                 batch.set(lessonRef, {
//                     ...lesson,
//                     courseId: course.id,
//                     moduleId: module.id,
//                     createdAt: serverTimestamp(),
//                 })
//             }
//         }

//         // Upload reviews
//         // for (const review of reviews) {
//         //     const reviewRef = doc(db, "courseReviews", review.id)
//         //     batch.set(reviewRef, {
//         //         ...review,
//         //         createdAt: review.createdAt || serverTimestamp(),
//         //     })
//         // }
//         if (reviews && reviews.length > 0) {
//             for (const review of reviews) {
//                 const reviewRef = doc(db, "courseReviews", review.id)
//                 batch.set(reviewRef, {
//                     ...review,
//                     createdAt: review.createdAt || serverTimestamp(),
//                 })
//             }
//         }

//         // Commit all batched writes
//         // try {
//         //     await batch.commit()
//         //     console.log(" Course uploaded successfully")
//         // } catch (error) {
//         //     console.error("Failed to upload course:", error)
//         //     throw error
//         // }
//         // Commit all batched writes
//         await batch.commit()

//         return {
//             success: true,
//             message: "Course uploaded successfully",
//             courseId: course.id,
//         }
//     } catch (error) {
//         console.error("Failed to upload course:", error)

//         if (error instanceof Error) {
//             throw new Error(`Upload failed: ${error.message}`)
//         }
//         throw new Error("Failed to upload course. Please try again.")
//     }
// }

import { collection, doc, setDoc, writeBatch, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { Course, Module, Lesson, Review } from "@/types"

interface UploadCourseInput {
    course: Course
    modules: (Module & { lessons: Lesson[] })[]
    reviews: Review[]
}

export async function uploadNewCourse({ course, modules, reviews }: UploadCourseInput) {
    try {
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
    } catch (error) {
        console.log("Failed to upload course:", error)
        // Provide specific error messages
        if (error instanceof Error) {
            if (error.message.includes("permission")) {
                throw new Error("You don't have permission to upload courses")
            } else if (error.message.includes("network")) {
                throw new Error("Network error. Please check your connection")
            } else {
                throw new Error(`Upload failed: ${error.message}`)
            }
        }

        throw new Error("An unexpected error occurred during upload")
    }
}
