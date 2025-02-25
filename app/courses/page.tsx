"use client"
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import "animate.css/animate.min.css"
import CoursesList from "@/components/course/CoursesList"
import Link from "next/link"
import { mobile, ipad } from "@/responsive"
import Testimonials from "@/components/Testimonials"
import Newsletter from "@/components/Newsletter"
import { featuredCourses } from "@/data"
import Button from "@/components/Button"

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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 310px;
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

const ImageContainer = styled.div`
    flex: 1;
    margin: 0 auto;
    padding: 0;
    ${ipad(
        (props: any) => `
        margin-top: 20px;
    `,
    )}
`
const Image = styled.img`
    width: 100%;
    height: 300px;
    animation: pulse;
    animation-duration: 2s;
    margin: 0 auto;
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
const Title = styled.h1`
    margin: 0;
`
const Desc = styled.p`
    margin: 15px auto;
`

const SetUpdate = styled.div`
    font-size: 18px;
    margin: 10px auto;
    font-weight: 400;
    color: #fff;
    width: 10%;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid;
    box-shadow: 5px 5px #cddeff;
    text-align: center;
    background: rgba(28, 56, 121, 1);
    ${ipad({ width: "80%" })}
    ${mobile({})}
`

export default function Courses(href: any) {
    //  const [courses, setCourses] = useState([])
    const [count, setCount] = useState(0)
    const [skip, setSkip] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    //  useEffect(() => {
    //      setIsLoading(true)
    //      async function fetchCourses() {
    //          const response = await fetch("/api/courses/getCourses")
    //          const data = await response.json()
    //          setCourses(data)
    //          setCount(data.count)
    //          setIsLoading(false)
    //      }
    //      fetchCourses()
    //  }, [])
    const courses = featuredCourses
    const limit = 8

    if (isLoading) {
        return <SetUpdate>Loading....</SetUpdate>
    }

    return (
        <Container>
            <Wrapper>
                <InfoContainer>
                    <Title>Courses</Title>
                    <Desc>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra tristique
                        consectetur adipiscing elit. Viverra tristique laoreet ut elementum cras
                        cursuslaoreet ut elementum cras consectetur adipiscing elit. Viverra
                        tristique laoreet ut elementum cras cursus cursus consectetur adipiscing
                        elit. Viverra tristique laoreet ut elementum cras cursus. Viverra tristique
                        laoreet ut elementum cras cursus Morbi morbi at diam.
                    </Desc>
                    <Link href="#courses" passHref legacyBehavior>
                        <Button $main={true} title="View courses" />
                    </Link>
                </InfoContainer>
                <ImageContainer>
                    <Image src="/chd.jpg" alt="courses image" />
                </ImageContainer>
            </Wrapper>
            <div id="courses">
                <CoursesList
                    title="Featured courses"
                    coursesPg={false}
                    courses={courses}
                    limit={limit}
                />
            </div>
            <Testimonials />
            <Newsletter />
        </Container>
    )
}
