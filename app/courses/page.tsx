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
//     border-bottom: 1px solid ${(props) => props.theme.mobile.offWhite};
// border-radius: 20px;
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
        margin-top: 20px;
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
    font-weight: 500;
    margin: 0;
`
const Desc = styled.p`
    margin: 15px auto;
    font-weight: 400;
`
const TestimonialsTitle = styled.h2`
    margin: 50px auto 0;
    color: ${(props) => props.theme.main};
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
                {/* <Link href="#courses" passHref legacyBehavior>
                    <Button $main={true} title="View courses" />
                </Link> */}
            </InfoContainer>
            <Wrapper>
                <ImageContainer>
                    {/* <Image src="/chd.jpg" alt="courses image" /> */}
                    <Slider />
                </ImageContainer>
            </Wrapper>
            <CoursesContainer id="courses">
                <CoursesList title="Featured courses" coursesPg={false} limit={limit} />
            </CoursesContainer>
            <TestimonialsTitle>Hear what they say about us</TestimonialsTitle>
            <Testimonials />
            <Newsletter />
        </Container>
    )
}
