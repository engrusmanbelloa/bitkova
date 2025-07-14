import { CourseType } from "@/types"
import { featuredCourses } from "@/data"
import { EnrolledCourse } from "@/userType"
const getCourseDetailsById = (courseId: number): CourseType | undefined => {
    return featuredCourses.find((course) => course._id === courseId)
}

const dummyCourses: CourseType[] = [getCourseDetailsById(1)!, getCourseDetailsById(2)!]

const enrolledCoursesMock: (EnrolledCourse & { course: CourseType })[] = [
    {
        id: "user1_1",
        userId: "user1",
        courseId: "1",
        completedLessons: 14,
        progress: 70,
        status: "in progress",
        enrolledAt: new Date("2024-02-15T10:45:00"),
        updatedAt: new Date(),
        course: dummyCourses[0],
    },
    {
        id: "user1_2",
        userId: "user1",
        courseId: "2",
        completedLessons: 5,
        progress: 30,
        status: "in progress",
        enrolledAt: new Date("2024-02-15T10:45:00"),
        updatedAt: new Date(),
        course: dummyCourses[1],
    },
]

export default function InProgressCoursesMock() {
    return (
        <div style={{ padding: 20 }}>
            <h2>📚 In Progress Courses (Mock)</h2>
            {enrolledCoursesMock.map((course) => (
                <div
                    key={course.id}
                    style={{
                        border: "1px solid #eee",
                        borderRadius: 8,
                        padding: 12,
                        marginBottom: 12,
                    }}
                >
                    <h4>{course.course.title}</h4>
                    <p>Progress: {course.progress}%</p>
                    <p>Completed Lessons: {course.completedLessons}</p>
                </div>
            ))}
        </div>
    )
}
