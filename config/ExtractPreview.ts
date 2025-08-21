import { Course, Module, Lesson, Review } from "@/types"

export default function extractPreviewVideo(modules: (Module & { lessons: Lesson[] })[]): string {
    if (modules?.length > 0 && modules[0]?.lessons?.length > 0) {
        // console.log("This is preview url:... ", modules[0].lessons[0].videoUrl)
        return modules[0].lessons[0].videoUrl || ""
    }
    return ""
}
