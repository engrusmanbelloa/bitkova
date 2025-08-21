import styled, { keyframes } from "styled-components"
import { useQuery } from "@tanstack/react-query"
import { fetchCourseReviews } from "@/lib/firebase/queries/courses"
import StarHalfIcon from "@mui/icons-material/StarHalf"
const Box = styled.div`
    margin: 5px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

export default function CourseRating({ courseId }: { courseId: string }) {
    const { data: reviews, isLoading } = useQuery({
        queryKey: ["reviews", courseId],
        queryFn: () => fetchCourseReviews(courseId),
    })

    if (isLoading) return <p>Loading rating...</p>

    const averageRating =
        reviews && reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)
            : "0.0"

    return (
        <Box>
            <StarHalfIcon />
            <span style={{ margin: "10px" }}>{averageRating}</span>
        </Box>
    )
}
