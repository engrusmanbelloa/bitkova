import styled from "styled-components"
import Rating from "@mui/material/Rating"
import NoDataAvailable from "@/components/dashboard/NoData"
import { mobile, ipad } from "@/responsive"
import { User } from "@/userType"

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
        width: 70%;
    `,
    )}
`
const ProgressBar = styled.div<{ $progress: number }>`
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background: ${(props) => props.theme.palette.primary.main};
`

interface DashboardProps {
    user: User
}
export default function InProgressCourses({ user }: DashboardProps) {
    // Filter only courses with status "in-progress"
    const inProgressCourses = user.enrolledCourses
    // console.log("Courses in progress", inProgressCourses)
    const comment = " you have no enrolled courses"

    return (
        <Container>
            <CourseList>
                {inProgressCourses.length > 0 ? (
                    inProgressCourses.map((userCourse: any) => (
                        <CourseCard key={userCourse.course._id}>
                            <CourseImage
                                src={userCourse.course.image}
                                alt={userCourse.course.title}
                            />
                            <CourseInfo>
                                <Rating
                                    name="half-rating-read"
                                    defaultValue={userCourse.course.rating}
                                    precision={1}
                                    readOnly
                                />
                                <CourseTitle>{userCourse.course.title}</CourseTitle>

                                <ProgressText>
                                    Completed Lessons: {userCourse.completedLessons} of
                                    {userCourse.course.onDemandVideos}
                                </ProgressText>
                                <ProgressContainer>
                                    <ProgressBarContainer>
                                        <ProgressBar $progress={userCourse.progress} />
                                    </ProgressBarContainer>
                                    <span>{userCourse.progress}% completed</span>
                                </ProgressContainer>
                            </CourseInfo>
                        </CourseCard>
                    ))
                ) : (
                    <NoDataAvailable comment={user.name + " " + "sir," + comment} />
                )}
            </CourseList>
        </Container>
    )
}
