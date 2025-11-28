import { z } from "zod"

const TITLE_MAX_WORDS = 5
const SHORT_DESC_MAX_WORDS = 17

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length

export const lessonSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Lesson title is required"),
    videoUrl: z.string().url("Invalid video URL"),
    content: z.string().optional(),
    durationMinutes: z.number().min(0, "Duration must be positive"),
    position: z.number().optional(),
})

export const moduleSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Module title is required"),
    position: z.number(),
    lessons: z.array(lessonSchema).min(1, "At least one lesson is required"),
})

export const courseSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .refine((val) => {
            const words = countWords(val)
            return words >= 4 && words <= TITLE_MAX_WORDS
        }, `Title must be 2-${TITLE_MAX_WORDS} words`),

    shortDesc: z
        .string()
        .min(1, "Short description is required")
        .refine((val) => {
            const words = countWords(val)
            return words >= 15 && words <= SHORT_DESC_MAX_WORDS
        }, `Short description must be 15-${SHORT_DESC_MAX_WORDS} words`),

    category: z.string().min(1, "Category is required"),
    skillLevel: z.string().min(1, "Skill level is required"),
    facilitatorEmail: z.string().email("Invalid email address"),
    image: z.string().url("Invalid image URL"),
    about: z.string().min(20, "About section must be at least 20 characters"),
    courseDesc: z.string().min(50, "Course description must be at least 50 characters"),
    price: z.number().min(0, "Price must be positive"),
    onDemandVideos: z.number().min(0, "Number of videos must be positive"),
    downloadableFiles: z.number().min(0).optional(),
    whatYoullLearn: z.array(z.string()).min(1, "Add at least one learning outcome"),
})

export type CourseFormData = z.infer<typeof courseSchema>
export type ModuleFormData = z.infer<typeof moduleSchema>
export type LessonFormData = z.infer<typeof lessonSchema>
