"use client"
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import Card from "@mui/material/Card"
import BarChartIcon from "@mui/icons-material/BarChart"
import ComputerIcon from "@mui/icons-material/Computer"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import { mobile, ipad } from "@/responsive"
import HomeHero from "@/components/home/HomeHero"
import CoursesList from "@/components/course/CoursesList"
import Testimonials from "@/components/home/Testimonials"
import StatsSection from "@/components/home/StatsSection"
import CarrierCard from "@/components/home/CarrierCard"
import HotCoursesSection from "@/components/course/sections/HotCourses"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import { useCourseFilters } from "@/hooks/courses/useCourseFilters"
import CourseCardSkeleton from "@/components/course/CourseCardSkeleton"

const Container = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0 auto;
    z-index: 1;
    padding: ${(props) => props.theme.paddings.pagePadding};
    ${ipad(
        (props: any) => `
        padding: 5px 0;
        width: ${props.theme.widths.ipadWidth};
    `,
    )};
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
        padding: 0;
    `,
    )};
`
const Intro = styled.section`
    margin: 70px auto 0;
    width: 520px;
    height: 110px;
    text-align: center;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({})};
    ${mobile({ width: "360px", padding: 0 })};
`
const Title = styled.h2`
    margin: 0;
    color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.common.black};
`
const Description = styled.p`
    margin: 10px auto 0;
    color: ${(props) => props.theme.palette.common.black};
`
const Services = styled.section`
    width: ${(props) => props.theme.widths.heroWidth};
    height: 315px;
    margin: 50px auto 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ width: "665px", height: 650, padding: "5px 0", marginTop: 20 })}
    ${mobile({
        width: "360px",
        padding: 0,
        flexDirection: "column",
        flexWrap: "nowrap",
        height: 800,
    })}
`
const ServicesBox = styled(Card)`
    width: 350px;
    height: 315px;
    display: flex;
    flex-direction: column;
    border: 0.93px solid #abd0ed;
    border-radius: 8px;
    ${ipad({ width: 325, height: 305, padding: "5px 0", marginBottom: 10 })};
    ${mobile({ width: "360px", padding: 0 })}
    &:hover {
        background: ${(props) => props.theme.palette.action.hover};
        animation: pulse;
        animation-duration: 1s;
    }
`
const ServicesInnerBox = styled(Link)`
    text-decoration: none;
    width: 260px;
    margin: auto;
    cursor: pointer;
    &::first-letter {
        text-transform: uppercase;
    }
`
const ServicesIconBox = styled.div`
    width: 90px;
    height: 90px;
    margin: 0;
    padding: 0;
    border-radius: 50px;
`
const ServicesTitle = styled.h3`
    margin: 10px 0;
    line-height: 1.4;
    color: ${(props) => props.theme.palette.common.black};
    &::first-letter {
        text-transform: uppercase;
    }
`
const ServicesDesc = styled.p`
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.palette.common.black};
    &::first-letter {
        text-transform: uppercase;
    }
`
const Recomendations = styled.section`
    width: ${(props) => props.theme.widths.heroWidth};
    height: 510px;
    padding: 0px 10px;
    margin: 50px auto 0;
    padding: 0px;
    border-radius: 8px;
    text-align: center;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ width: 665, height: 370, marginTop: 50 })};
    ${mobile({ width: 360, height: 250 })};
`
const ShortClip = styled(Image)`
    width: ${(props) => props.theme.widths.heroWidth};
    height: 460px;
    margin: 30px auto 0;
    ${ipad({ width: 665, height: 315 })};
    ${mobile({ width: 360, height: 200 })};
`
const PlayCircle = styled(PlayCircleIcon)`
    position: relative;
    font-size: 50px;
    margin: auto;
    bottom: 250px;
    color: ${(props) => props.theme.palette.primary.main};
    &:hover {
        color: ${(props) => props.theme.mobile.offWhite};
        animation: pulse;
        animation-duration: 1s;
    }
    ${ipad({ bottom: 180 })};
    ${mobile({ bottom: 130 })};
`
const SkeletonBox = styled.div`
    margin: 5px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    padding: 0 10px;
`
const HotCourses = () => {
    const { data: courses, isLoading, isError } = useFetchCourses()
    const filteredCourses = useCourseFilters(courses)

    if (isLoading) {
        return (
            <Container>
                <SkeletonBox>
                    {[...Array(3)].map((_, i) => (
                        <CourseCardSkeleton key={i} />
                    ))}
                </SkeletonBox>
            </Container>
        )
    }

    if (isError) {
        return (
            <Container>
                <p>Error loading courses.</p>
            </Container>
        )
    }

    if (!filteredCourses) return null

    return <HotCoursesSection courses={filteredCourses.hotCourses} />
}
export default function HomeComponent() {
    const servicesData = [
        {
            icon: BarChartIcon,
            title: "In-depth training and mentorship",
            desc: "Let’s accelerate your journey into tech with our immersive training program. ",
            href: "#",
            color: "#34296B",
            background: "#D5CDFF",
        },
        {
            icon: ComputerIcon,
            title: "Internship placement & job oppoopportunities ",
            desc: "At the end of the training, you would be placed into an internship program to use your new skills.",
            href: "#",
            color: "#F3D400",
            background: "#FEF3AE",
        },
        {
            icon: LocalFireDepartmentIcon,
            title: "Supportive community online and offline",
            desc: "A fun & interactive community of like minds from all over the world, committed to helping each other grow",
            href: "#",
            color: "#FF9CAE",
            background: "#FFCED7",
        },
    ]

    return (
        <Container>
            <HomeHero />
            {/* introduction to bitkova section */}
            <Intro>
                <Title>Here At Bitkova Academy,</Title>
                <Description>
                    Our classes are designed to accommodate your current level matched with our
                    unique learning process.
                </Description>
            </Intro>
            {/* servces offered by bitkova */}
            <Services>
                {servicesData.map((boxData, index) => (
                    <ServicesBox key={index} variant="elevation" elevation={0}>
                        <ServicesInnerBox href={boxData.href}>
                            <ServicesIconBox
                                style={{ background: boxData.background, opacity: 0.8 }}
                            >
                                <boxData.icon
                                    sx={{ color: boxData.color, fontSize: 40, margin: "25px" }}
                                />
                            </ServicesIconBox>
                            <ServicesTitle>{boxData.title}</ServicesTitle>
                            <ServicesDesc>{boxData.desc}</ServicesDesc>
                        </ServicesInnerBox>
                    </ServicesBox>
                ))}
            </Services>
            <Intro>
                <Title>Find your perfect Course</Title>
                <Description>
                    Learn by doing, our courses are perfect for everyone from beginners to
                    experienced learners.
                </Description>
            </Intro>
            <HotCourses />
            <Recomendations>
                <Title>Hear what they say about us</Title>
                <ShortClip width={500} height={500} src="/shortclip.png" alt="Short Clip" />
                <PlayCircle />
            </Recomendations>
            <Testimonials />
            <StatsSection />
            <CarrierCard />
        </Container>
    )
}
