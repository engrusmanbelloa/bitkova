"use client"
import styled, { keyframes } from "styled-components"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Card from "@mui/material/Card"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo"
import PreviewIcon from "@mui/icons-material/Preview"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { formatPrice } from "@/config/FormatPrice"
import { mobile, ipad } from "@/responsive"
import Button from "@/components/Button"
import CourseRating from "@/components/course/Review"
import CourseCardSkeleton from "@/components/course/CourseCardSkeleton"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import "animate.css/animate.min.css"

const Container = styled.section`
    width: ${(props) => props.theme.widths.heroWidth};
    padding: 0px 10px;
    margin: 50px auto 0;
    padding: 0px;
    border-radius: 8px;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
            height: 100%;
            margin-top: 20px;
        `,
    )}
    ${mobile(
        (props: any) => `
            width: ${props.theme.widths.mobileWidth};
            
        `,
    )}
`
const Wrapper = styled.div<{ $display?: string }>`
    display: flex;
    margin: 0 auto;
    padding: 0;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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
    height: 515px;
    color: #fff;
    border-radius: 5px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ margin: "0 auto", width: 325, height: 510 })}
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
const TitleSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    ${mobile({})}
`
const Title = styled.h3`
    font-weight: 600;
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
    ${ipad({ margin: "0 0px 0 0" })};
    ${mobile({})};
`
const Price = styled.p`
    flex: 0.5;
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
    gap: 10px;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
            overflow: hidden;
        `,
    )}
    ${mobile(
        (props: any) => `
            width: ${props.theme.widths.mobileWidth};
            padding: 0px;
        `,
    )}
`
const BtnBox = styled.div`
    margin: 5px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    ${ipad(
        (props: any) => `
            overflow: hidden;
        `,
    )}
    ${mobile(
        (props: any) => `
        `,
    )}
`
const PreviewContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    background-color: ${(props) => props.theme.palette.primary.main};
    margin: 5px auto;
    ${ipad({ height: 35 })};
`
const PreviewBtn = styled.button<{ $priceBtn?: string }>`
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    font-size: ${(props) => (props.$priceBtn ? "16px" : "25px")};
    color: ${(props) => props.theme.palette.common.white};
    background-color: ${(props) => props.theme.palette.primary.main};
    &::first-letter {
        text-transform: uppercase;
    }
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        background-color: ${(props) => props.theme.palette.action.hover};
        color: ${(props) => props.theme.palette.common.white};
    }
    ${ipad({ height: 35 })};
`
const WhishlistContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    background-color: ${(props) => props.theme.palette.common.white};
    margin: 5px auto;
    ${ipad({ height: 35 })};
`
const WishlistBtn = styled.button<{ $priceBtn?: string }>`
    border: 1px;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    font-size: 16px;
    color: ${(props) => props.theme.palette.primary.main};
    background-color: ${(props) => props.theme.palette.common.white};
    &::first-letter {
        text-transform: uppercase;
    }
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        color: ${(props) => props.theme.palette.primary.main};
    }
    ${ipad({ height: 35 })};
`

interface CoursesListProps {
    limit?: number
    title?: string
    $display?: string
    priceBtn?: string
    coursesPg?: boolean
    onClick?: () => void
}
export default function CoursesList({ limit, coursesPg }: CoursesListProps) {
    const router = useRouter()
    const { data: courses, isLoading, error } = useFetchCourses()
    const main = true

    if (isLoading)
        return (
            <>
                <Box>
                    {[...Array(3)].map((_, i) => (
                        <Box key={i}>
                            <CourseCardSkeleton />
                        </Box>
                    ))}
                </Box>
            </>
        )
    if (error) return <Container>Failed to load courses</Container>
    return (
        <Container>
            <Wrapper>
                {courses?.slice(0, limit).map((course) => (
                    <div key={course.id}>
                        <StyledCard variant="elevation" elevation={1}>
                            <CourseImg src={course.image} alt={course.title} />
                            <InfoContainer>
                                <TitleSection>
                                    <Title>{course.title}</Title>
                                    <Price>{formatPrice(course.price)}</Price>
                                </TitleSection>
                                <Desc>{course.shortDesc}</Desc>
                                <DurationContainer>
                                    <Box>
                                        <Time>
                                            <OndemandVideoIcon />
                                            <span style={{ margin: "3px" }}>
                                                {course.onDemandVideos > 0
                                                    ? `${course.onDemandVideos} Videos`
                                                    : 0}
                                            </span>
                                        </Time>
                                    </Box>
                                    <Box>
                                        <Time>
                                            <PeopleAltIcon />
                                            <span style={{ margin: "3px" }}>
                                                {course.students} Students
                                            </span>
                                        </Time>
                                    </Box>
                                    <Box>
                                        <CourseRating courseId={course.id} />
                                    </Box>
                                </DurationContainer>
                                <BtnBox>
                                    <WhishlistContainer>
                                        <FavoriteBorderIcon sx={{ color: "#356DF1" }} />
                                        <WishlistBtn
                                            type="button"
                                            onClick={() => router.push(`/courses/${course.id}`)}
                                        >
                                            Wishlist
                                        </WishlistBtn>
                                    </WhishlistContainer>
                                    <PreviewContainer>
                                        <PreviewIcon sx={{ color: "white" }} />
                                        <PreviewBtn
                                            $priceBtn="PriceBtn"
                                            type="button"
                                            onClick={() => router.push(`/courses/${course.id}`)}
                                        >
                                            Preview
                                        </PreviewBtn>
                                    </PreviewContainer>
                                </BtnBox>
                            </InfoContainer>
                        </StyledCard>
                    </div>
                ))}
            </Wrapper>
        </Container>
    )
}
