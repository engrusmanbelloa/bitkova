"use client"
import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Rating from "@mui/material/Rating"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import { formatPrice } from "@/config/FormatPrice"
import { mobile, ipad } from "@/responsive"
import { CourseType } from "@/types"

const Top = styled.div`
    border-width: 1px;
    background-color: #f4f4f5;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 8px 8px 0 0;
    margin-left: 10px;
`
const Price = styled.h2``
const Button = styled.button<{ $color?: string; $background?: string }>`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: ${(props) => props.$background || props.theme.palette.primary.main};
    color: ${(props) => props.$color || props.theme.palette.common.white};
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background: ${(props) => props.theme.palette.primary.main};
    }
`
const Middle = styled.div`
    background-color: ${(props) => props.theme.palette.common.white};
    border: 1px solid ${(props) => props.theme.mobile.horizontalrule};
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
        color: ${(props) => props.theme.palette.common.black};
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
        color: ${(props) => props.theme.palette.common.black};

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
    border: 2px solid ${(props) => props.theme.mobile.horizontalrule};
`
const FacilitatorInfo = styled.h3`
    text-align: left;
    margin: 0;
    font-weight: bold;
`
const FacilitatorRight = styled.div`
    display: flex;
    padding: 10px 0 30px;
`
const FacilitatorName = styled.p`
    font-weight: bold;
    font-size: 14px;
    margin-left: 15px;
`
const BottomBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

interface CourseProps {
    course: CourseType
    handlePlay: () => void
}

export default function CourseFeatures({ course, handlePlay }: CourseProps) {
    return (
        <>
            <Top>
                {/* <Price>{course.price}</Price> */}
                <Price>{formatPrice(course.price)}</Price>
                <Button>Buy Now</Button>
            </Top>
            {/* Course Features */}
            <Middle>
                <FeaturesTitle>Course Features</FeaturesTitle>
                <FeatureList>
                    <FeatureItem>
                        <span>📚</span> {course.onDemandVideos} Lessons ({course.duration.hours}:
                        {course.duration.minutes} Hours)
                    </FeatureItem>
                    <FeatureItem>
                        <span>👨‍🎓</span> {course.students} Students
                    </FeatureItem>
                    <FeatureItem>
                        <span>🔒</span> Lifetime access to course
                    </FeatureItem>
                    <FeatureItem>
                        <span>📜</span> Certificate of Completion
                    </FeatureItem>
                    <FeatureItem>
                        <span>📈</span> Skill Level: {course.skillLevel}
                    </FeatureItem>
                    <FeatureItem>
                        <StarBorderIcon /> Rated: {course.rating}
                    </FeatureItem>
                </FeatureList>
                {/* Actions */}

                <Button $background="#fdb913">
                    <BottomBtn>
                        <AddShoppingCartIcon /> Add to Cart
                    </BottomBtn>
                </Button>

                <Button $background="#eee" $color="#000">
                    <BottomBtn onClick={handlePlay}>
                        <PlayCircleIcon /> Watch Preview
                    </BottomBtn>
                </Button>
            </Middle>
            <Bottom>
                <Facilitator>
                    <FacilitatorInfo>A course by</FacilitatorInfo>
                    <FacilitatorRight>
                        <FacilitatorImage>
                            <Image
                                src={course.facilitatorImage}
                                alt={course.facilitator}
                                fill={true}
                            />
                        </FacilitatorImage>
                        <FacilitatorName>{course.facilitator}</FacilitatorName>
                    </FacilitatorRight>
                </Facilitator>
            </Bottom>
        </>
    )
}
