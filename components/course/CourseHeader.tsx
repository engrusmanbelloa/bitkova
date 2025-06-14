"use client"
import React, { useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import Rating from "@mui/material/Rating"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import ShareIcon from "@mui/icons-material/Share"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import ReactPlayer from "react-player/lazy"
import CourseFeatures from "@/components/course/CourseFeatures"
import CourseTabs from "@/components/course/CourseTabs"
import extractPreviewVideo from "@/config/ExtractPreview"
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
const Player = styled(ReactPlayer)`
    position: absolute;
    top: 0;
    left: 0;
`
const PlayerBtn = styled(PlayCircleIcon)`
    position: absolute;
    color: #fff;
    left: 45%;
    top: 40%;
    font-size: 90px;
    cursor: pointer;
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
    course: CourseType
}

export default function CourseHeader({ course }: CourseProps) {
    const [showPlayer, setShowPlayer] = useState(false)
    const courses = featuredCourses
    const limit = 8
    const url = "https://youtu.be/-_nqpMFcvls?si=tITKisr4HegPLH2b"
    const previewVideoUrl = extractPreviewVideo(course.modules)

    const urls = {
        Lesson1: "https://youtu.be/ut7-hKybwHI",
        lesson2: "https://youtu.be/kl1lgnbjUX8",
        lesson3: "https://youtu.be/bptUgdcUbic",
        lesson4: "https://youtu.be/lg7CrwBAYmM",
        Lesson5: "https://youtu.be/TmplpLQ3d0M",
    }

    const handlePlay = () => setShowPlayer(true)
    return (
        <>
            <HeaderContainer>
                <Left>
                    <Rating
                        name="half-rating-read"
                        defaultValue={course.rating}
                        precision={1}
                        readOnly
                    />
                    <Title>{course.title}</Title>
                    <ActionsDiv>
                        <Category>
                            Categories: <span>{course.category}</span>
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
                    {!showPlayer ? (
                        <CourseImage>
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill={true}
                                priority={true}
                            />
                            <PlayerBtn onClick={handlePlay} />
                        </CourseImage>
                    ) : (
                        <CourseImage>
                            <Player
                                config={{
                                    youtube: {
                                        playerVars: {
                                            modestbranding: 1,
                                            rel: 0,
                                            iv_load_policy: 3,
                                            disablekb: 1,
                                            showinfo: 0,
                                            controls: 1,
                                        },
                                    },
                                }}
                                url={previewVideoUrl}
                                controls
                                playing
                                width="100%"
                                height="100%"
                            />
                        </CourseImage>
                    )}
                    <CourseTabs
                        courseDesc={course.courseDesc}
                        whatYoullLearn={course.whatYoullLearn}
                        modules={course.modules}
                        review={course.review}
                    />
                </Left>
                <Right>
                    <CourseFeatures course={course} handlePlay={handlePlay} />
                </Right>
            </HeaderContainer>
        </>
    )
}
