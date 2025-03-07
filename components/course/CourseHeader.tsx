"use client"
import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Rating from "@mui/material/Rating"
import CourseFeatures from "@/components/course/CourseFeatures"
import { featuredCourses } from "@/data"
import { mobile, ipad } from "@/responsive"

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0 auto;
    border-radius: 10px;
    margin-bottom: 20px;
    gap: 20px;
    ${ipad(
        (props: any) => `
        flex-direction: column;
        width: ${props.theme.widths.ipadWidth};
    `,
    )}
    ${mobile(
        (props: any) => `
    `,
    )}
`
const Left = styled.div`
    flex: 3;
`
const Title = styled.h2`
    margin-bottom: 5px;
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
`
const Right = styled.div`
    flex: 1;
    margin-top: 100px;
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
}: CourseProps) {
    const courses = featuredCourses
    const limit = 8
    return (
        <>
            <HeaderContainer>
                <Left>
                    <Rating name="half-rating-read" defaultValue={rating} precision={1} readOnly />
                    <Title>{title}</Title>
                    <Category>
                        Categories: <span>{category}</span>
                    </Category>
                    <CourseImage>
                        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
                    </CourseImage>
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
