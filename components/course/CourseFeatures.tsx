"use client"
import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Rating from "@mui/material/Rating"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import ShareIcon from "@mui/icons-material/Share"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import { featuredCourses } from "@/data"
import { mobile, ipad } from "@/responsive"

const Top = styled.div`
    border-width: 1px;
    background-color: #f4f4f5;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 8px 8px 0 0;
    margin-left: 10px;
`
const Price = styled.h2``
const Button = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        background: #0056b3;
    }
`
const Middle = styled.div`
    background-color: #fff;
    border: 1px solid #eee;
    padding: 10px;
    margin-left: 10px;
    border-radius: 0 0 8px 8px;
`
const FeaturesTitle = styled.p`
    font-weight: bold;
`
const FeatureList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 15px;
`
const FeatureItem = styled.li`
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 15px;
    span {
        margin-right: 10px;
    }
    svg {
        margin-right: 8px;
        color: #555;
    }
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
        color: #666;

        &:hover {
            color: black;
        }

        svg {
            margin-right: 5px;
        }
    }
`
const Bottom = styled.div`
    background: #fcfcfd;
    border-width: 1px;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 8px;
    margin: 20px 0 10px 10px;
`
const Facilitator = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    gap: 10px;
`
const FacilitatorImage = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #ddd;
`
const FacilitatorInfo = styled.h3`
    text-align: left;
    margin: 0;
    font-weight: bold;
`
const FacilitatorRight = styled.div`
    display: flex;
    padding: 10px 0 30px;
    background: #fcfcfd;
`
const FacilitatorName = styled.p`
    font-weight: bold;
    font-size: 14px;
    margin-left: 15px;
`

interface CourseProps {
    price: string
    facilitator: string
    facilitatorImage: string
    lessons: number
    hours: number
    minutes: number
    students: number
    rating: number
}

export default function CourseFeatures({
    price,
    facilitator,
    facilitatorImage,
    lessons,
    hours,
    minutes,
    students,
    rating,
}: CourseProps) {
    return (
        <div>
            <Actions>
                <button>
                    <BookmarkBorderIcon /> Wishlist
                </button>
                <button>
                    <ShareIcon /> Share
                </button>
            </Actions>
            <Top>
                <Price>{price}</Price>
                <Button>Buy Now</Button>
            </Top>
            {/* Course Features */}
            <Middle>
                <FeaturesTitle>Course Features</FeaturesTitle>
                <FeatureList>
                    <FeatureItem>
                        <span>📚</span> {lessons} Lessons ({hours}:{minutes} Hours)
                    </FeatureItem>
                    <FeatureItem>
                        <span>👨‍🎓</span> {students} Students
                    </FeatureItem>
                    <FeatureItem>
                        <span>🔒</span> Lifetime access to course
                    </FeatureItem>
                    <FeatureItem>
                        <span>📜</span> Certificate of Completion
                    </FeatureItem>
                    <FeatureItem>
                        <span>📈</span> Skill Level: All Levels
                    </FeatureItem>
                    <FeatureItem>
                        <StarBorderIcon /> Rated: {rating}
                    </FeatureItem>
                </FeatureList>
            </Middle>
            <Bottom>
                <Facilitator>
                    <FacilitatorInfo>A course by</FacilitatorInfo>
                    <FacilitatorRight>
                        <FacilitatorImage>
                            <Image
                                src={facilitatorImage}
                                alt={facilitator}
                                layout="fill"
                                objectFit="cover"
                            />
                        </FacilitatorImage>
                        <FacilitatorName>{facilitator}</FacilitatorName>
                    </FacilitatorRight>
                </Facilitator>
            </Bottom>
        </div>
    )
}
