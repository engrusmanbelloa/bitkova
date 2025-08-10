"use client"
import * as React from "react"
import styled from "styled-components"
import { Progress } from "rsuite"
import { useState, useEffect } from "react"
import { mobile, ipad } from "@/responsive"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import { useUserStore } from "@/lib/store/useUserStore"
import { useAuthReady } from "@/hooks/useAuthReady"
import InProgressCourses from "@/components/course/InProgressCourses"
import CircularProgress from "@mui/material/CircularProgress"

const Container = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0 auto;
    padding: ${(props) => props.theme.paddings.pagePadding};
    ${ipad({ marginLeft: 0 })}
`
const Title = styled.h1`
    margin: 2% 0 0 0;
    line-height: 1.5;
    ${ipad({ fontSize: 18 })}
`
const Heading = styled.p`
    margin: 2% 0 0 0;
    line-height: 1.5;
    font-size: 25px;
    ${mobile({ fontSize: 18 })}
`
const DashBox = styled.div<{ $display?: string }>`
    margin: ${(props) => (props.$display === "grid" ? "0 100px" : "0 0 0 100px")};
    display: ${(props) => (props.$display === "grid" ? "grid" : "flex")};
    grid-template-columns: auto auto auto auto;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;
    ${ipad(
        (props: any) => `
        width: ${props.theme.widths.ipadWidth};
        padding: 5px 0;
        grid-template-columns: ${props.$display === "grid" ? "auto auto" : "none"};
        margin-left: 10;
        justify-content: "flex-start";
        overflow: ${props.$display === "grid" ? "none" : "scroll"}; 
    `,
    )}
    ${mobile(
        (props: any) => `
        grid-template-columns: ${props.$display === "grid" ? "auto" : "none"};
        width: ${props.theme.widths.mobileWidth};
        margin: ${props.$display === "grid" ? "auto" : "0px"};
    `,
    )}
`
const DashItemsBox = styled.div`
    margin-right: 10px;
    border: 1px solid #cddeff;
    height: 100%;
    width: 300px;
    flex: 1;
    position: relative;
    top: 10px;
    left: -100px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    background: rgba(28, 56, 121, 1);
    color: #fff;
    &:hover {
        background-color: #cddeff;
        color: rgba(28, 56, 121, 1);
    }
    ${ipad({ left: 0, marginRight: 5 })}
    ${ipad({ left: 0, top: 0, marginRight: 5 })}
`
const ImageBox = styled.img`
    width: 100%;
    height: 200px;
    ${ipad(
        (props: any) => `
        width:  ${props.$display === "grid" ? "100%" : "240px"};
    `,
    )}
`
const Box = styled.div`
    margin-bottom: 10px;
`
const Paragraph = styled.div`
    margin: 10px;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 1.5;
`
const EnrollBtn = styled.button`
    height: 30px;
    width: 200px;
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 600;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
    background: #cddeff;
    color: rgba(28, 56, 121, 1);
    ${ipad({ fontSize: 18, fontWeight: 400 })}
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
