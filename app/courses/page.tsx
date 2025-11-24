"use client"
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import CoursesList from "@/components/course/CoursesList"
import Link from "next/link"
import { mobile, ipad } from "@/responsive"
import Testimonials from "@/components/nav/Testimonials"
import Newsletter from "@/components/home/Newsletter"
import Button from "@/components/Button"
import Slider from "@/components/course/Slider"
import HeadRow from "@/components/course/HeadRow"
import ExploreCourses from "@/components/course/ExploreCourses"
import JoinPhysicalClass from "@/components/course/JoinPhysical"

const Container = styled.section`
    width: ${(props) => props.theme.widths.heroWidth};
    margin: 30px auto 0px;
    ${ipad(
        (props: any) => `
        width: ${props.theme.widths.ipadWidth};
    `,
    )}
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
    `,
    )}
`
const Wrapper = styled.section`
    border-top: 1px solid ${(props) => props.theme.mobile.offWhite};
    border-bottom: 1px solid ${(props) => props.theme.mobile.offWhite};
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 605px;
    margin: 0px;
    padding: 0px;
    ${ipad(
        (props: any) => `
        display: block;
        width: ${props.theme.widths.ipadWidth};
        height: 100%;
    `,
    )}
    ${mobile(
        (props: any) => `
      width: ${props.theme.widths.mobileWidth};
  `,
    )}
`
const CoursesContainer = styled.section`
    width: ${(props) => props.theme.widths.heroWidth};
    margin: auto;
    margin-top: -20px;
    ${ipad(
        (props: any) => `
        width: ${props.theme.widths.ipadWidth};
    `,
    )}
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
    `,
    )}
`
const ImageContainer = styled.div`
    flex: 1;
    margin: 0 auto;
    flex-direction: column;
    width: 100%;
    height: 600px;
    padding: 0;
    ${ipad(
        (props: any) => `
        height: 350px;
    `,
    )}
`
const Image = styled.img`
    width: 100%;
    height: 600px;
    animation: pulse;
    animation-duration: 2s;
    margin: 0 auto;
    border-radius: 20px;
    ${ipad(
        (props: any) => `
        width: 100%;
        height: 300px;
    `,
    )};
    ${mobile({ display: "none" })}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 10px 0px 0px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ textAlign: "justify" })}
`
const Title = styled.h2`
    font-size: 32px;
    margin: 0;
    ${ipad(
        (props: any) => `
        font-size: 28px;
        text-align: left;
        line-height: 1.2;
    `,
    )}
`
const Desc = styled.p`
    margin: 15px auto;
    font-weight: 400;
`
const TestimonialsTitle = styled.h2`
    margin: 50px auto 0;
    color: ${(props) => props.theme.palette.primary.main};
`
export default function Courses() {
    const [skip, setSkip] = useState(0)
    const limit = 8

    return (
        <Container>
            <InfoContainer>
                <Title>
                    Welcome to <span style={{ color: "#356DF1" }}>Bitkova Academy</span>
                </Title>
                <Desc>
                    At Bitkova, our primary aim is to equip you with core digital skills needed to
                    navigate through the job market and advance in your career.
                </Desc>
            </InfoContainer>
            <Wrapper>
                <ImageContainer>
                    <Slider />
                </ImageContainer>
            </Wrapper>
            <TestimonialsTitle>Find your perfect Course</TestimonialsTitle>
            <HeadRow title="Recomended Courses" />
            <CoursesContainer id="courses">
                <CoursesList title="Featured courses" coursesPg={false} limit={limit} />
            </CoursesContainer>
            <ExploreCourses />
            <JoinPhysicalClass />
            <TestimonialsTitle>Hear what they say about us</TestimonialsTitle>
            <Testimonials />
            <Newsletter />
        </Container>
    )
}
