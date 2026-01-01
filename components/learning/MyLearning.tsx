// components/learning/MyLearning.tsx
"use client"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import { useAuthReady } from "@/hooks/useAuthReady"
import InProgressCourses from "@/components/course/InProgressCourses"
import CircularProgress from "@mui/material/CircularProgress"

const Container = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0 auto;
    padding: ${(props) => props.theme.paddings.pagePadding};
    ${ipad({ marginLeft: 0 })}
    ${ipad(
        (props: any) => `
            display: block;
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: ${props.theme.widths.mobileWidth};
        `,
    )}
`
const Heading = styled.p`
    margin: 2% 0 0 0;
    line-height: 1.5;
    font-size: 25px;
    ${mobile({ fontSize: 18 })}
`

export default function MyLearning(props: any) {
    const { user, authReady } = useAuthReady()
    const { limit } = props

    if (!authReady) return <CircularProgress />
    if (!user) return <p>Please log in to view your learning progress.</p>

    return (
        <Container>
            <Heading>My Learning</Heading>
            <InProgressCourses userData={user} limit={limit} />
        </Container>
    )
}
