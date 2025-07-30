import { useQuery } from "@tanstack/react-query"
import { fetchCourseById } from "@/lib/firebase/queries/courses"

export function useCourse(courseId: string) {
    return useQuery({
        queryKey: ["course", courseId],
        queryFn: () => fetchCourseById(courseId),
        enabled: !!courseId, // ensures query runs only when courseId is defined
    })
}
