// components/home/Home.tsx
"use client"
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import Card from "@mui/material/Card"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import HandshakeIcon from "@mui/icons-material/Handshake"
import CodeIcon from "@mui/icons-material/Code"
import RequestQuoteIcon from "@mui/icons-material/RequestQuote"
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
import LearningPaths from "./LearningPaths"

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
        margin: 0;
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
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
        padding: 0;
    `,
    )}
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
const ServicesGrid = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    margin: 0px auto 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
            grid-template-columns: repeat(2, 1fr); gap: 12px;
        `,
    )}
    ${mobile(
        (props: any) => `
            width: ${props.theme.widths.mobileWidth};
            grid-template-columns: 1fr;
        `,
    )}
`
const ServicesCard = styled(Card)`
    border: 0.93px solid #abd0ed;
    border-radius: 12px;
    padding: 24px 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    cursor: pointer;
    transition:
        transform 0.18s,
        box-shadow 0.18s;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.09);
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
    ${ipad(
        (props: any) => `
        width: ${props.theme.widths.ipadWidth};
        height: 370px;
        margin-top: 50px;
    `,
    )};
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
        height: 250px;
    `,
    )};
`
const ShortClip = styled(Image)`
    width: ${(props) => props.theme.widths.heroWidth};
    height: 460px;
    margin: 30px auto 0;
    ${ipad(
        (props: any) => `
        width: ${props.theme.widths.ipadWidth};
        height: 315px;
    `,
    )};
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
        height: 200px;
    `,
    )};
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
    const welcome = "Welcome to"
    const title = "Bitkova Academy"
    const heroHeader = "Unlock the future:"
    const master = "Master a"
    const headerSpan = "digital skill"
    const heroText =
        "Build the tech skills you need for your dream job. We offer affordable courses for everyone, from beginners to developers, designers and entrepreneurs. Here At Bitkova Academy, our classes are designed to accommodate your current level matched with our unique learning process."

    const servicesData = [
        {
            icon: HandshakeIcon,
            title: "Host Events With Us",
            desc: "Partner with Bitkova to host financial literacy programs, corporate blockchain training, digital skills workshops, and youth empowerment events.",
            href: "/partnership#host-events",
            color: "#34296B",
            background: "#D5CDFF",
            cta: "Explore partnership →",
        },
        {
            icon: CodeIcon,
            title: "Hire Bitkova",
            desc: "Need custom software, blockchain development, or UI/UX design? Our expert team delivers professional tech solutions tailored to your business.",
            href: "/partnership#hire-bitkova",
            color: "#1565c0",
            background: "#e8f4fd",
            cta: "See our services →",
        },
        {
            icon: RequestQuoteIcon,
            title: "Request a Quote",
            desc: "Tell us about your project. We'll get back to you with a tailored proposal covering scope, timeline, and pricing.",
            href: "/partnership#request-quote",
            color: "#00796b",
            background: "#e8fdf4",
            cta: "Get a quote →",
        },
    ]

    return (
        <Container>
            <HomeHero
                home={true}
                welcome={welcome}
                title={title}
                heroHeader={heroHeader}
                master={master}
                headerSpan={headerSpan}
                heroText={heroText}
            />
            {/* introduction to bitkova section */}
            {/* <Intro>
                <Title>Here At Bitkova Academy,</Title>
                <Description>
                    Our classes are designed to accommodate your current level matched with our
                    unique learning process.
                </Description>
            </Intro> */}
            <LearningPaths />
            {/* servces offered by bitkova */}
            {/* // Replace the current <Intro> before ServicesGrid with: */}
            <Intro>
                <Title>More Than Just Courses</Title>
                <Description>
                    We build technology, host events, and partner with organizations to drive
                    digital growth.
                </Description>
            </Intro>
            <ServicesGrid>
                {servicesData.map((boxData, index) => (
                    <ServicesCard key={index} variant="elevation" elevation={0}>
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
                            <ServicesDesc
                                style={{ color: boxData.color, fontWeight: 600, marginTop: 12 }}
                            >
                                {boxData.cta}
                            </ServicesDesc>
                        </ServicesInnerBox>
                    </ServicesCard>
                ))}
            </ServicesGrid>
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
                <ShortClip width={450} height={450} src="/shortclip.png" alt="Short Clip" />
                <PlayCircle />
            </Recomendations>
            <Testimonials />
            <StatsSection />
            <CarrierCard />
        </Container>
    )
}
