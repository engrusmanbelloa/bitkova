import { useMemo } from "react"
import { CourseWithExtras } from "@/types/course"

export const useCourseFilters = (courses: CourseWithExtras[] | undefined) => {
    return useMemo(() => {
        if (!courses) return null

        // Hot Courses - based on student count and ratings
        const hotCourses = [...courses]
            .sort((a, b) => {
                const scoreA = (a.students || 0) * (a.rating || 0)
                const scoreB = (b.students || 0) * (b.rating || 0)
                return scoreB - scoreA
            })
            .slice(0, 10)

        // Short Courses - less than 10 videos
        const shortCourses = courses.filter((course) => course.onDemandVideos < 7).slice(0, 10)

        // New Courses - sort by creation date if available, otherwise just take first 10
        const newCourses = courses && courses.slice(0, 10)

        // Recommended Courses - based on category or popularity
        // You can make this smarter based on user preferences later
        const recommendedCourses = courses
            .filter((course) => (course.rating || 0) >= 4.0)
            .slice(0, 10)

        // You May Also Like - Random selection or based on user history
        const shuffled = [...courses].sort(() => 0.5 - Math.random())
        const youMayLikeCourses = shuffled.slice(0, 10)

        // Trending Courses - recently popular (can be enhanced with view tracking)
        const trendingCourses = [...courses]
            .filter((course) => course.students > 100) // Adjust threshold
            .sort((a, b) => (b.students || 0) - (a.students || 0))
            .slice(0, 10)

        return {
            hotCourses,
            shortCourses,
            newCourses,
            recommendedCourses,
            youMayLikeCourses,
            trendingCourses,
        }
    }, [courses])
}
