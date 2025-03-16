"use client"
import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Rating from "@mui/material/Rating"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import ShareIcon from "@mui/icons-material/Share"
import CourseFeatures from "@/components/course/CourseFeatures"
import CourseTabs from "@/components/course/CourseTabs"
import { featuredCourses } from "@/data"
import { CourseType } from "@/types"
import { mobile, ipad } from "@/responsive"

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px 0px;
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0 auto;
    border-radius: 10px;
    margin-bottom: 20px;
    gap: 20px;
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
const Left = styled.div`
    flex: 3;
`
const ActionsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Title = styled.h2`
    margin-bottom: 5px;
    ${mobile(
        (props: any) => `
        line-height: 1.5;
        margin-bottom: 0px;
    `,
    )}
`
const Category = styled.p`
    span {
        font-weight: bold;
    }
`
const CourseImage = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    margin-top: 10px;
    border-radius: 10px;
    overflow: hidden;
    ${mobile(
        (props: any) => `
        height: 300px;
    `,
    )}
`
const Right = styled.div`
    flex: 1;
    margin-top: 100px;
    ${ipad(
        (props: any) => `
        margin-top: 10px;
        margin-letf: 0px;
        padding: 0 ;
    `,
    )};
`
const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    button {
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: ${(props) => props.theme.palette.common.black};

        &:hover {
            color: black;
        }

        svg {
            margin-right: 5px;
        }
    }
`

interface CourseProps {
    rating: number
    title: string
    category: string
    price: string
    imageUrl: string
    facilitator: string
    facilitatorImage: string
    lessons: number
    hours: number
    minutes: number
    students: number
    skillLevel: string
    courseDesc: string
    whatYoullLearn: string[]
    modules: {
        title: string
        content: string[]
    }[]
    review: {
        id: number
        stars: number
        comment: string
        Name: string
    }[]
}

export default function CourseHeader({
    rating,
    title,
    category,
    price,
    imageUrl,
    facilitator,
    facilitatorImage,
    lessons,
    hours,
    minutes,
    students,
    skillLevel,
    courseDesc,
    whatYoullLearn,
    modules,
    review,
}: CourseProps) {
    const courses = featuredCourses
    const limit = 8
    return (
        <>
            <HeaderContainer>
                <Left>
                    <Rating name="half-rating-read" defaultValue={rating} precision={1} readOnly />
                    <Title>{title}</Title>
                    <ActionsDiv>
                        <Category>
                            Categories: <span>{category}</span>
                        </Category>
                        <Actions>
                            <button>
                                <BookmarkBorderIcon /> Wishlist
                            </button>
                            <button>
                                <ShareIcon /> Share
                            </button>
                        </Actions>
                    </ActionsDiv>
                    <CourseImage>
                        <Image src={imageUrl} alt={title} fill={true} priority={true} />
                    </CourseImage>
                    <CourseTabs
                        courseDesc={courseDesc}
                        whatYoullLearn={whatYoullLearn}
                        modules={modules}
                        review={review}
                    />
                </Left>
                <Right>
                    <CourseFeatures
                        price={price}
                        facilitator={facilitator}
                        facilitatorImage={facilitatorImage}
                        lessons={lessons}
                        hours={hours}
                        minutes={minutes}
                        students={students}
                        rating={rating}
                        skillLevel={skillLevel}
                    />
                </Right>
            </HeaderContainer>
        </>
    )
}
