"use client"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Image from "next/image"
import Rating from "@mui/material/Rating"
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
import WishlistButton from "@/components/payments/WishlistButton"
import { useAuthReady } from "@/hooks/useAuthReady"
import IsLoading from "@/components/IsLoading"
import { useCourseById } from "@/hooks/courses/useFetchCourseById"
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { useUserStore } from "@/lib/store/useUserStore"
import { EnrolledCourse, CompletedCourse, ArchivedCourse } from "@/userType"
import { createCertificate } from "@/lib/firebase/uploads/createCertificate"
import { useCourseCompletion } from "@/hooks/courses/useCourseCompletion"
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

interface CourseId {
    courseId: string
}

export default function CourseHeader({ courseId }: CourseId) {
    const { user, firebaseUser, authReady, isLoadingUserDoc } = useAuthReady()
    const [showPlayer, setShowPlayer] = useState(false)
    const [enrolled, setEnrolled] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState<string>("")
    const [selectedTitle, setSelectedTitle] = useState<string>("")
    // const [completedVideos, setCompletedVideos] = useState<string[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    // const [certificateReady, setCertificateReady] = useState(true)
    const { data: course, isLoading, error } = useCourseById(courseId)

    // All course videos array
    const videoList =
        course?.modules?.flatMap((module) =>
            module.lessons.map((lesson) => ({
                title: lesson.title,
                url: lesson.videoUrl,
            })),
        ) || []

    const previewVideoUrl = course && extractPreviewVideo(course.modules) // Course preview url

    // Player functions play, next video, prev video and video selection logics
    const handlePlay = () => {
        setShowPlayer(true)
        // console.log(previewVideoUrl)
    }
    const handleSelectVideo = (index: number) => {
        const selected = videoList && videoList[index]
        // console.log("Videos list: ", selected)
        if (selected) {
            setSelectedVideo(selected.url)
            setSelectedTitle(selected.title)
            setSelectedIndex(index)
            setShowPlayer(true)
        }
    }
    const handleNext = () => {
        if (selectedIndex !== null && selectedIndex < (videoList?.length ?? 0) - 1) {
            handleSelectVideo(selectedIndex + 1)
        }
    }
    const handlePrev = () => {
        if (selectedIndex !== null && selectedIndex > 0) {
            handleSelectVideo(selectedIndex - 1)
        }
    }
    // const handleCompletedVideos = async () => {
    //     if (!completedVideos.includes(selectedTitle)) {
    //         const updatedList = [...completedVideos, selectedTitle]
    //         setCompletedVideos(updatedList)

    //         const userId = firebaseUser?.uid
    //         if (!userId) return

    //         // Sync videos watched to Firestore
    //         const courseRef = doc(db, "users", userId, "enrolledCourses", courseId)
    //         // await updateDoc(courseRef, { completedLessons: updatedList.length })
    //         await updateDoc(courseRef, {
    //             completedLessons: updatedList.length,
    //             completedVideos: updatedList,
    //         })

    //         // Ensure enrolled status in Zustand
    //         if (!useUserStore.getState().isEnrolled(courseId)) {
    //             useUserStore.getState().addToEnrolledCourses({
    //                 userId,
    //                 courseId,
    //                 completedLessons: updatedList.length,
    //                 progress: (updatedList.length / videoList.length) * 100,
    //                 status: "in progress",
    //                 enrolledAt: new Date(),
    //             })
    //         }

    //         // If completed all videos
    //         if (updatedList.length === videoList.length) {
    //             const completedCourse: CompletedCourse = {
    //                 userId,
    //                 courseId,
    //                 completedAt: new Date(),
    //             }
    //             await setDoc(
    //                 doc(db, "users", userId, "completedCourses", courseId),
    //                 completedCourse,
    //             )
    //             useUserStore.getState().addToCompletedCourses(completedCourse)
    //             setCertificateReady(true)
    //         }
    //     }
    // }

    const { completedVideos, certificateReady, handleCompletedVideos, certificateId, issuedAt } =
        useCourseCompletion({
            courseId,
            firebaseUser,
            course,
            videoList,
            selectedTitle,
        })

    useEffect(() => {
        // const fetchCompletedVideos = async () => {
        //     if (!firebaseUser?.uid || !courseId) return

        //     const courseRef = doc(db, "users", firebaseUser.uid, "enrolledCourses", courseId)
        //     const snap = await getDoc(courseRef)

        //     if (snap.exists()) {
        //         const data = snap.data()

        //         if (data.completedVideos && Array.isArray(data.completedVideos)) {
        //             setCompletedVideos(data.completedVideos)
        //         } else {
        //             setCompletedVideos([]) // no saved progress
        //         }
        //     }
        // }

        if (course) {
            const isEnrolled = useUserStore.getState().isEnrolled(course.id.toString())
            const isCompleted = useUserStore.getState().isCompleted(course.id.toString())
            setEnrolled(isEnrolled)

            // if (isEnrolled) {
            //     fetchCompletedVideos()
            // }
            // if (isCompleted) {
            //     setCertificateReady(true)
            // }
            // console.log("Is enrolled: ", isEnrolled)
            // console.log("Is Certifcate ready: ", isCompleted)
            // console.log("Complete lessons: ", completedVideos)
        }
    }, [course, firebaseUser, courseId])

    if (isLoadingUserDoc || isLoading || !authReady) return <IsLoading />
    if (error || !course) return <p>Something went wrong or course not found.</p>

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
                            {authReady && user && !enrolled && (
                                <WishlistButton courseId={course.id.toString()} />
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
                    {enrolled && user ? (
                        <CourseTabs
                            desc={course.shortDesc}
                            handleSelectVideo={handleSelectVideo}
                            enrolled={enrolled}
                            course={course}
                            completedVideos={completedVideos}
                            user={user.name}
                            completed={certificateReady}
                            id={certificateId}
                            issuedAt={issuedAt}
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
                    {!enrolled && user ? (
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
