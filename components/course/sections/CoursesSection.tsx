import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import { useCourseFilters } from "@/hooks/courses/useCourseFilters"
import styled from "styled-components"
import CourseCardSkeleton from "@/components/course/CourseCardSkeleton"
import { mobile } from "@/responsive"
import HotCoursesSection from "@/components/course/sections/HotCourses"
import RecommendedCoursesSection from "@/components/course/sections/RecommendedCourses"
import NewCoursesSection from "@/components/course/sections/NewCourses"
import { ShortCoursesSection } from "@/components/course/sections/ShortCourses"

const PageContainer = styled.div`
    max-width: ${(props) => props.theme.widths.heroWidth};
    ${mobile``}
`
const SkeletonBox = styled.div`
    margin: 5px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    padding: 0 10px;
`

export default function CoursesSection() {
    const { data: courses, isLoading, isError } = useFetchCourses()
    const filteredCourses = useCourseFilters(courses)

    if (isLoading) {
        return (
            <PageContainer>
                <SkeletonBox>
                    {[...Array(3)].map((_, i) => (
                        <CourseCardSkeleton key={i} />
                    ))}
                </SkeletonBox>
            </PageContainer>
        )
    }

    if (isError) {
        return (
            <PageContainer>
                <p>Error loading courses.</p>
            </PageContainer>
        )
    }

    if (!filteredCourses) return null

    return (
        <PageContainer>
            <HotCoursesSection courses={filteredCourses.hotCourses} />
            <RecommendedCoursesSection courses={filteredCourses.recommendedCourses} />
            <NewCoursesSection courses={filteredCourses.newCourses} />
            <ShortCoursesSection courses={filteredCourses.shortCourses} />
        </PageContainer>
    )
}
