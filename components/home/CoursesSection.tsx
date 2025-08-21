import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import styled from "styled-components"
import CoursesList from "@/components/course/CoursesList"
import CourseCardSkeleton from "@/components/course/CourseCardSkeleton"
import { mobile, ipad } from "@/responsive"
import { Course, Review, Module, Lesson, CourseWithExtras, Facilitator } from "@/types"

const PageContainer = styled.div`
    width: 95%;
    max-width: ${(props) => props.theme.widths.heroWidth};
    margin: 0 auto;
    ${mobile`
        width: 100%;
        padding: 0 10px;
    `}
`
const SectionWrapper = styled.section`
    margin-bottom: 40px;
`
const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 20px;
`
const SectionTitle = styled.h3`
    color: ${(props) => props.theme.palette.primary.main};
    font-weight: 600;
`
const ViewAllLink = styled.a`
    color: ${(props) => props.theme.palette.secondary.main};
    text-decoration: none;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`
const CourseGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    ${mobile`
        grid-auto-flow: column;
        overflow-x: auto;
        padding-bottom: 10px;
        scroll-snap-type: x mandatory;
        & > * {
            scroll-snap-align: start;
        }
    `}
`
const CourseCard = styled.div`
    // Your card styles from the designs
    // e.g., border, box-shadow, padding
`
const Box = styled.div`
    margin: 5px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`
interface SectionProps {
    title: string
    courses: CourseWithExtras[]
}

const Section = ({ title }: SectionProps) => (
    <SectionWrapper>
        <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
            <ViewAllLink>View All</ViewAllLink>
        </SectionHeader>
        <CoursesList coursesPg={true} />
        {/* <CourseGrid>
            {courses?.map((course) => <CourseCard key={course.id} course={course} />)}
        </CourseGrid> */}
    </SectionWrapper>
)

export default function CoursesSection() {
    const { data: courses, isLoading, isError } = useFetchCourses()

    if (isLoading) {
        return (
            <>
                <Box>
                    {[...Array(3)].map((_, i) => (
                        <Box key={i}>
                            <CourseCardSkeleton />
                        </Box>
                    ))}
                </Box>
            </>
        )
    }

    if (isError) {
        return <p>Error loading courses.</p>
    }

    // Filter courses for different sections
    const shortCourses = courses && courses.filter((course) => course.onDemandVideos < 10)
    const newCourses = courses && courses.slice(0, 4) // Take the first 4 for example
    const recommendedCourses =
        courses && courses.filter((course) => course.category === "Cryptocurrency")

    return (
        <PageContainer>
            {/* <Section title="Recommended Courses" courses={recommendedCourses} />
            <Section title="Short Courses for You" courses={shortCourses} />
            <Section title="New Courses" courses={newCourses} />
            ... other sections based on your data ... */}
            {recommendedCourses && (
                <Section title="Recommended Courses" courses={recommendedCourses} />
            )}
            {shortCourses && <Section title="Short Courses for You" courses={shortCourses} />}
            {newCourses && <Section title="New Courses" courses={newCourses} />}
        </PageContainer>
    )
}
