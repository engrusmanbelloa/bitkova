"use client"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Image from "next/image"
import Rating from "@mui/material/Rating"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import ShareIcon from "@mui/icons-material/Share"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ReactPlayer from "react-player/lazy"
import CourseFeatures from "@/components/course/CourseFeatures"
import CourseTabs from "@/components/course/CourseTabs"
import GuestCourseTabs from "@/components/course/GuestCourseTab"
import CourseModules from "@/components/course/CourseModules"
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
    margin: auto;
    padding: 0;
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
        height: 200px;
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
    font-size: 60px;
    cursor: pointer;
    ${mobile(
        (props: any) => `
        font-size: 50px;
    `,
    )}
`
const NextBtn = styled(ArrowForwardIosIcon)`
    position: absolute;
    color: #fff;
    right: 2%;
    top: 45%;
    font-size: 40px;
    cursor: pointer;
    z-index: 99;
    ${mobile(
        (props: any) => `
        font-size: 20px;
    `,
    )}
`
const PrevBtn = styled(ArrowBackIosIcon)`
    position: absolute;
    color: #fff;
    left: 2%;
    top: 45%;
    font-size: 40px;
    cursor: pointer;
    ${mobile(
        (props: any) => `
        font-size: 20px;
    `,
    )}
`
const DeskTabs = styled.div`
    display: block;
    margin: 0;
    padding: 0;
    ${ipad(
        (props: any) => `
        display: none;
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
    course: CourseType
}

export default function CourseHeader({ course }: CourseProps) {
    const [showPlayer, setShowPlayer] = useState(false)
    const [enrolled, setEnrolled] = useState(true)
    const [selectedVideo, setSelectedVideo] = useState<string>("")
    const [selectedTitle, setSelectedTitle] = useState<string>("")
    const [completedVideos, setCompletedVideos] = useState<string[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [certificateReady, setCertificateReady] = useState(true)
    // All course videos array
    const videoList = course.modules.flatMap((module) =>
        Object.entries(module.links || {}).map(([title, url]) => ({ title, url })),
    )
    const courses = featuredCourses
    const limit = 8
    const previewVideoUrl = extractPreviewVideo(course.modules) // Course preview url

    // Player functions play, next video, prev video and video selection logics
    const handlePlay = () => {
        setShowPlayer(true)
        // console.log(previewVideoUrl)
    }
    const handleSelectVideo = (index: number) => {
        const selected = videoList[index]
        // console.log("Videos list: ", selected)
        if (selected) {
            setSelectedVideo(selected.url)
            setSelectedTitle(selected.title)
            setSelectedIndex(index)
            setShowPlayer(true)
        }
    }
    const handleNext = () => {
        if (selectedIndex !== null && selectedIndex < videoList.length - 1) {
            handleSelectVideo(selectedIndex + 1)
        }
    }
    const handlePrev = () => {
        if (selectedIndex !== null && selectedIndex > 0) {
            handleSelectVideo(selectedIndex - 1)
        }
    }
    const handleCompletedVideos = () => {
        if (!completedVideos.includes(selectedTitle)) {
            setCompletedVideos((prev) => [...prev, selectedTitle])
        }
        // console.log("Completed video titles: ", completedVideos)
        console.log("Completed videos", completedVideos.length)
        console.log("Completed videos", videoList.length)
    }

    useEffect(() => {
        if (completedVideos.length === videoList.length) {
            setCertificateReady(true)
        }
        console.log("Completed videos", completedVideos.length)
        console.log("Completed videos", videoList.length)
    }, [completedVideos])

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
                            {!enrolled && (
                                <button>
                                    <BookmarkBorderIcon /> Wishlist
                                </button>
                            )}
                            <button>
                                <ShareIcon /> Share
                            </button>
                        </Actions>
                    </ActionsDiv>
                    <CourseImage>
                        {!showPlayer ? (
                            <>
                                <Image src={course.image} alt={course.title} fill priority />
                                <PlayerBtn onClick={handlePlay} />
                            </>
                        ) : selectedVideo ? (
                            <Player
                                url={selectedVideo}
                                playing
                                controls
                                width="100%"
                                height="100%"
                                onEnded={() => {
                                    handleCompletedVideos()
                                    handleNext()
                                }}
                                config={{
                                    youtube: {
                                        playerVars: {
                                            modestbranding: 1,
                                            rel: 0,
                                            iv_load_policy: 3,
                                        },
                                    },
                                }}
                            />
                        ) : previewVideoUrl ? (
                            <Player
                                url={previewVideoUrl}
                                playing
                                controls
                                width="100%"
                                height="100%"
                                config={{
                                    youtube: {
                                        playerVars: {
                                            modestbranding: 1,
                                            rel: 0,
                                            iv_load_policy: 3,
                                        },
                                    },
                                }}
                            />
                        ) : (
                            <div style={{ padding: "20px", textAlign: "center" }}>
                                No preview video available.
                            </div>
                        )}
                        {selectedVideo && (
                            <>
                                <NextBtn onClick={handleNext} />
                                <PrevBtn onClick={handlePrev} />
                            </>
                        )}
                    </CourseImage>
                    {enrolled ? (
                        <CourseTabs
                            handleSelectVideo={handleSelectVideo}
                            enrolled={enrolled}
                            course={course}
                            completedVideos={completedVideos}
                            user={"Usman Bello Abdullahi"}
                            completed={certificateReady}
                            id={1234567}
                        />
                    ) : (
                        <GuestCourseTabs
                            handleSelectVideo={handleSelectVideo}
                            enrolled={enrolled}
                            course={course}
                            completedVideos={completedVideos}
                        />
                    )}
                </Left>
                <Right>
                    {!enrolled ? (
                        <CourseFeatures course={course} handlePlay={handlePlay} />
                    ) : (
                        <DeskTabs>
                            <CourseModules
                                handleSelectVideo={handleSelectVideo}
                                enrolled={enrolled}
                                course={course}
                                completedVideos={completedVideos}
                            />
                        </DeskTabs>
                    )}
                </Right>
            </HeaderContainer>
        </>
    )
}
