import styled from "styled-components"
import StarIcon from "@mui/icons-material/Star"
import Rating from "@mui/material/Rating"

const Container = styled.div`
    margin-top: 20px;
`
const Title = styled.h2`
    font-size: 20px;
    margin-bottom: 10px;
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
`
const CourseImage = styled.img`
    width: 300px;
    height: 200px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 15px;
`
const CourseInfo = styled.div`
    flex: 1;
    padding-top: 20px;
`
const CourseTitle = styled.h3`
    margin-top: 20px;
    color: #333;
`
const ProgressText = styled.p`
    font-size: 14px;
    color: #666;
    margin-top: 20px auto;
`
const ProgressContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 30px;
    span {
        font-size: 10px;
        margin: 0px;
        padding-left: 10px;
    }
`
const ProgressBarContainer = styled.div`
    width: 80%;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
`
const ProgressBar = styled.div<{ $progress: number }>`
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background: #3b82f6;
`

export default function InProgressCourses() {
    const courses = [
        {
            id: 1,
            title: "Cryptocurrency Trading for BEGINNERS",
            image: "/courses/crypto-trading.png",
            rating: 5.0,
            completedLessons: 5,
            totalLessons: 25,
            progress: 20,
        },
        {
            id: 2,
            title: "Cryptocurrency Trading for BEGINNERS",
            image: "/courses/crypto.png",
            rating: 5.0,
            completedLessons: 5,
            totalLessons: 25,
            progress: 20,
        },
    ]

    return (
        <Container>
            <Title>In Progress Courses</Title>
            <CourseList>
                {courses.map((course) => (
                    <CourseCard key={course.id}>
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
                                Completed Lessons: {course.completedLessons} of{" "}
                                {course.totalLessons}
                            </ProgressText>
                            <ProgressContainer>
                                <ProgressBarContainer>
                                    <ProgressBar $progress={course.progress} />
                                </ProgressBarContainer>
                                <span>{course.progress}% completed</span>
                            </ProgressContainer>
                        </CourseInfo>
                    </CourseCard>
                ))}
            </CourseList>
        </Container>
    )
}
