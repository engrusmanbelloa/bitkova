// components/dashboard/DashboardOverview.tsx
"use client"
import styled from "styled-components"
import SchoolIcon from "@mui/icons-material/School"
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import CircularProgress from "@mui/material/CircularProgress"
import InProgressCourses from "@/components/course/InProgressCourses"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import { useUserStore } from "@/lib/store/useUserStore"
import { useAuthReady } from "@/hooks/useAuthReady"
import { mobile, ipad } from "@/responsive"
import { User } from "@/types/userType"

// containers section
const Container = styled.section`
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
    `,
    )}
`
const OverviewContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    ${mobile(
        (props: any) => `
            width: ${props.theme.widths.mobileWidth};
            `,
    )}
`
const OverviewBox = styled.div`
    flex: 1;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`
const IconWrapper = styled.div`
    font-size: 40px;
    color: ${({ color }) => color || "#333"};
    margin-bottom: 10px;
`
const Count = styled.h2`
    font-size: 24px;
    margin: 0;
    color: ${(props) => props.theme.palette.common.black};
`
const Label = styled.p`
    font-size: 16px;
    color: ${(props) => props.theme.palette.common.black};
`
const ProfileSetupContainer = styled.div`
    padding: 2px 20px;
    height: 50px;
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
    ${mobile(
        (props: any) => `
            height: 35px;
            width: ${props.theme.widths.mobileWidth};
            padding: 0;
            margin: 0;
        `,
    )}
`
const Text = styled.p`
    font-weight: 500;
    margin-left: 10px;
    color: ${(props) => props.theme.palette.common.black};
`
const Button = styled.button`
    background: ${(props) => props.theme.mobile.offWhite};
    color: ${(props) => props.theme.palette.primary.main};
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
    margin-right: 5px;
    &:hover {
        background: ${(props) => props.theme.mobile.horizontalrule};
    }
`
const Title = styled.h3`
    font-weight: 500;
    color: ${(props) => props.theme.palette.common.black};
`
interface DashboardProps {
    userData: User
    limit?: number
}

export default function DashboardOverview({ userData, limit }: DashboardProps) {
    const { data: courses, isLoading, error } = useFetchCourses()
    const { enrollments } = useUserStore()
    const { user, authReady } = useAuthReady()

    // const enrolledCourseIds = enrolledCourses.map((c) => c.courseId)
    // const coursesToDisplay = (courses ?? [])
    //     .filter((course) => enrolledCourseIds.includes(course.id))
    //     .slice(0, limit ?? enrolledCourseIds.length)

    const asyncEnrollments = enrollments.filter((e) => e.itemType === "async_course")

    // const enrolledCount = asyncEnrollments.length
    const enrolledCount = enrollments.length

    const activeCount = asyncEnrollments.filter((e) => e.status === "in progress").length

    const completedCount = asyncEnrollments.filter((e) => e.status === "completed").length
    if (isLoading || !authReady) return <CircularProgress />
    if (error) return <p>Failed to load dashboard data.</p>
    if (!user) return <p>Please log in to view your dashboard.</p>

    // console.log("Courses to display: ", coursesToDisplay)
    // console.log("Enrolled course ids to display: ", enrolledCourseIds)

    return (
        <Container>
            <ProfileSetupContainer>
                <Text>Set Your Profile</Text>
                <Button>Click Here</Button>
            </ProfileSetupContainer>
            <Title>Dashboard</Title>
            <OverviewContainer>
                <OverviewBox>
                    <IconWrapper color="#3b82f6">
                        <SchoolIcon fontSize="large" />
                    </IconWrapper>
                    <Count>{enrolledCount}</Count>
                    <Label>Enrolled Courses</Label>
                </OverviewBox>
                <OverviewBox>
                    <IconWrapper color="#10b981">
                        <PlayCircleFilledIcon fontSize="large" />
                    </IconWrapper>
                    <Count>{activeCount}</Count>
                    <Label>Active Courses</Label>
                </OverviewBox>
                <OverviewBox>
                    <IconWrapper color="#f59e0b">
                        <EmojiEventsIcon fontSize="large" />
                    </IconWrapper>
                    <Count>{completedCount}</Count>
                    <Label>Completed Courses</Label>
                </OverviewBox>
            </OverviewContainer>
            <InProgressCourses userData={userData} />
        </Container>
    )
}
