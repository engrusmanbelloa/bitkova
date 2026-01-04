// components/course/InProgressCourses.tsx
import styled from "styled-components"
import Rating from "@mui/material/Rating"
import { useRouter } from "next/navigation"
import NoDataAvailable from "@/components/dashboard/NoData"
import { mobile, ipad } from "@/responsive"
import { Enrollment, User } from "@/types/userType"
import CircularProgress from "@mui/material/CircularProgress"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import { useUserStore } from "@/lib/store/useUserStore"
import { useAuthReady } from "@/hooks/useAuthReady"

const Container = styled.div`
    margin-top: 20px;
`
const CourseList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`
const CourseCard = styled.div`
    display: flex;
    padding: 0px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    ${mobile(
        (props: any) => `
        flex-direction: column;
    `,
    )}
`
const CourseImage = styled.img`
    width: 300px;
    height: 200px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 15px;
    ${mobile(
        (props: any) => `
        width: 100%;
    `,
    )}
`
const CourseInfo = styled.div`
    flex: 1;
    padding-top: 20px;
    ${mobile(
        (props: any) => `
        margin: 5px;
        padding-top: 10px;
    `,
    )}
`
const CourseTitle = styled.h3`
    margin-top: 20px;
    color: ${(props) => props.theme.palette.common.black};
    ${mobile(
        (props: any) => `
        margin-to: 5px;
    `,
    )}
`
const ProgressText = styled.p`
    font-size: 14px;
    margin-top: 20px;
    color: ${(props) => props.theme.palette.common.black};
    ${mobile(
        (props: any) => `
        margin-top: 0px;
    `,
    )}
`
const ProgressContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 30px;
    span {
        font-size: 12px;
        margin: 0px;
        padding-left: 10px;
    }
    ${mobile(
        (props: any) => `
        margin-top: 5px;
    `,
    )}
`
const ProgressBarContainer = styled.div`
    width: 80%;
    height: 6px;
    border-radius: 3px;
    overflow: hidden;
    background: ${(props) => props.theme.palette.action.hover};
    ${mobile(
        (props: any) => `
        width: 65%;
    `,
    )}
`
const ProgressBar = styled.div<{ $progress: number }>`
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background: ${(props) => props.theme.palette.primary.main};
`

interface DashboardProps {
    userData: User
    limit?: number
}

export default function InProgressCourses({ userData, limit }: DashboardProps) {
    const router = useRouter()
    const { user, authReady } = useAuthReady()
    const { data: courses, isLoading, error } = useFetchCourses()
    const { enrollments } = useUserStore()

    if (!authReady || isLoading) return <CircularProgress />
    if (!user) return <p>Please log in to view your learning progress.</p>
    if (error) return <p>Failed to load courses.</p>

    // get async course enrollments only
    const asyncEnrollments = enrollments.filter((e) => e.itemType === "async_course")
    const enrolledCount = enrollments.length

    // match enrollments with courses
    const coursesToDisplay = (courses ?? [])
        .filter((course) => asyncEnrollments.some((e) => e.itemId === course.id))
        .slice(0, limit ?? asyncEnrollments.length)

    // const coursesToDisplay = (courses ?? [])
    //     .filter((course) => enrolledCourses.some((ec) => ec.courseId === course.id))
    //     .slice(0, limit ?? enrolledCourses.length)

    return (
        <Container>
            <CourseList>
                {coursesToDisplay.length > 0 &&
                    coursesToDisplay.map((course) => {
                        // Find matching enrollment data
                        const enrollment = asyncEnrollments.find(
                            (ec) => ec.itemId === course.id,
                        ) as Enrollment | undefined

                        // Fallbacks in case of missing data
                        const completedLessons = enrollment?.completedLessons ?? 0
                        const totalLessons = course.onDemandVideos ?? 0
                        const progress =
                            totalLessons > 0
                                ? Math.round((completedLessons / totalLessons) * 100)
                                : 0

                        return (
                            <CourseCard
                                key={course.id}
                                onClick={() => router.push(`/courses/${course.id}`)}
                            >
                                <CourseImage src={course.image} alt={course.title} />
                                <CourseInfo>
                                    <Rating
                                        name="half-rating-read"
                                        defaultValue={course.rating}
                                        precision={1}
                                        readOnly
                                    />
                                    <CourseTitle>{course.title}</CourseTitle>

                                    <ProgressText>
                                        Completed Lessons: {completedLessons} of {totalLessons}
                                    </ProgressText>
                                    <ProgressContainer>
                                        <ProgressBarContainer>
                                            <ProgressBar $progress={progress} />
                                        </ProgressBarContainer>
                                        <span>{progress}% completed</span>
                                    </ProgressContainer>
                                </CourseInfo>
                            </CourseCard>
                        )
                    })}
                {enrolledCount === 0 && (
                    <NoDataAvailable comment={`${user.name} sir, you have no enrolled courses`} />
                )}
            </CourseList>
        </Container>
    )
}
