"use cleint"
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Card from "@mui/material/Card"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import StarHalfIcon from "@mui/icons-material/StarHalf"
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo"
import "animate.css/animate.min.css"
import { featuredCourses } from "@/data"
import { CourseType } from "@/types"
import { mobile, ipad } from "@/responsive"
import Button from "@/components/Button"

const Container = styled.section`
    width: ${(props) => props.theme.widths.heroWidth};
    padding: 0px 10px;
    margin: 50px auto 0;
    padding: 0px;
    border-radius: 8px;
    ${ipad({ width: "665px", height: 1020, marginTop: 20 })};
    ${mobile({ width: "360px", height: 1460, marginTop: 20 })};
`
const Wrapper = styled.div<{ $display?: string }>`
    display: flex;
    margin: 0 auto;
    padding: 0;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 25px;
    ${ipad({ justifyContent: "flex-start", flexWrap: "wrap", gap: 15 })};
    ${mobile({ justifyContent: "center", gap: 0 })};
`
const Top = styled.div<{ $coursesPg?: boolean }>`
    display: ${(props) => (props.$coursesPg ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    margin: 50px auto 0;
    padding: 0;

    ${ipad({ marginTop: 50 })};
    ${mobile({})};
`
const StyledCard = styled(Card)`
    margin: 0px;
    padding: 0;
    width: 350px;
    height: 510px;
    color: #fff;
    border-radius: 5px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ margin: "0 auto", width: 325, height: 500 })}
    ${mobile({ width: 360, margin: 5, height: 480 })}
`
const CourseImg = styled.img`
    width: 100%;
    height: 215px;
`
const InfoContainer = styled.div`
    padding: 10px;
    height: 100%;
    color: ${(props) => props.theme.palette.common.black};
    text-align: start;
    background-color: ${(props) => props.theme.palette.common.white};
    borderradius: 3px;
`
const Title = styled.h3`
    font-weight: 700;
    margin: 0px;
    text-align: start;
    ${mobile({
        fontSize: "18px",
    })}
`
const Desc = styled.p`
    margin: 10px 0;
`
const DurationContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 0;
`
const Time = styled.p`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 5px 0 0;
    padding: 0;
    ${ipad({ margin: "0 15px 0 0" })};
    ${mobile({})};
`
const Price = styled.p`
    flex: 0.8;
    margin: 5px auto;
    font-weight: bold;
`
const Hr = styled.hr`
    margin: 15px 0;
    background: #000;
    width: 100%;
    height: 0.5px;
`
const Box = styled.div`
    margin: 5px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
const PriceBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
`
const PriceBtn = styled.button<{ $priceBtn?: string }>`
    flex: 1;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => (props.$priceBtn ? "16px" : "25px")};
    margin: 5px auto;
    color: ${(props) => props.theme.palette.common.white};
    background-color: ${(props) => props.theme.palette.primary.main};
    &::first-letter {
        text-transform: uppercase;
    }
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        background-color: ${(props) => props.theme.palette.action.hover};
        color: ${(props) => props.theme.palette.primary.main};
    }
    ${ipad({ height: 35 })};
`
const BtnLink = styled(Link)`
    text-decoration: none;
    color: ${(props) => props.theme.palette.common.white};
    font-weight: 400;
`
export default function CoursesList(props: {
    courses: CourseType[]
    limit: number
    title: string
    $display?: string
    priceBtn?: string
    coursesPg?: boolean
    onClick?: () => void
}) {
    const router = useRouter()
    const { courses, limit, title, coursesPg, $display } = props
    const [coursesToDisplay, setCoursesToDisplay] = useState([])
    const main = true

    return (
        <Container>
            <Wrapper>
                {featuredCourses &&
                    featuredCourses.map((course) => (
                        <div key={course._id}>
                            <StyledCard variant="elevation" elevation={1}>
                                <CourseImg src={course.image} alt={course.title} />
                                <InfoContainer>
                                    <Title>{course.title}</Title>
                                    <Desc>{course.shortDesc}</Desc>
                                    <DurationContainer>
                                        <Box>
                                            <Time>
                                                <OndemandVideoIcon />
                                                <span style={{ margin: "10px" }}>
                                                    {course.onDemandVideos > 0
                                                        ? `${course.onDemandVideos} Videos`
                                                        : 0}
                                                </span>
                                            </Time>
                                        </Box>
                                        <Box>
                                            <Time>
                                                <PeopleAltIcon />
                                                <span style={{ margin: "10px" }}>
                                                    {course.students} Students
                                                </span>
                                            </Time>
                                        </Box>
                                        <Box>
                                            <Time>
                                                <StarHalfIcon />
                                                <span style={{ margin: "10px" }}>
                                                    {course.review.length > 0
                                                        ? `${(
                                                              course.review.reduce(
                                                                  (total, review) =>
                                                                      total + review.stars,
                                                                  0,
                                                              ) / course.review.length
                                                          ).toFixed(1)}`
                                                        : "0"}
                                                </span>
                                            </Time>
                                        </Box>
                                    </DurationContainer>
                                    <Box>
                                        <Price>
                                            {course.price > 0 ? (
                                                <span>
                                                    Price: &#8358;
                                                    {course.price.toLocaleString("en-US")}
                                                </span>
                                            ) : (
                                                "Free"
                                            )}
                                        </Price>
                                        <PriceBtn
                                            $priceBtn="PriceBtn"
                                            type="button"
                                            onClick={
                                                () => router.push(`/courses/${course._id}`)
                                                // router.push(`/single-course/${course._id}
                                            }
                                        >
                                            Learn more
                                        </PriceBtn>
                                    </Box>
                                </InfoContainer>
                            </StyledCard>
                        </div>
                    ))}
            </Wrapper>
            <Top $coursesPg={coursesPg}>
                <Button
                    onClick={() => router.push("/courses")}
                    $main={main}
                    title="Browse all courses"
                />
            </Top>
        </Container>
    )
}
