import React, { useState } from "react"
import styled from "styled-components"
import LockIcon from "@mui/icons-material/Lock"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import YouTubeIcon from "@mui/icons-material/YouTube"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { CourseType } from "@/types"
import { CourseWithExtras } from "@/types"
import { mobile, ipad } from "@/responsive"

const ModuleHeader = styled.div`
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
`
const ModuleContent = styled.div`
    padding: 2px;
    margin: 0px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
`
const RoundCheckBox = styled(CheckCircleIcon)`
    color: ${(props) => props.theme.mobile.offWhite};
    position: absolute;
    right: 15px;
    cursor: pointer;
`
const Playbtn = styled(YouTubeIcon)`
    color: ${(props) => props.theme.mobile.offWhite};
    font-size: 30px;
    cursor: pointer;
`
// interface CourseProps {
//     course: CourseType
//     enrolled: boolean
//     setSelectedVideo: (url: string) => void
//     setSelectedTitle: (title: string) => void
//     completedVideos: string[]
// }
interface CourseProps {
    course: CourseWithExtras
    enrolled: boolean
    completedVideos: string[]
    handleSelectVideo: (index: number) => void
}

export default function CourseModules({
    course,
    completedVideos,
    enrolled,
    handleSelectVideo,
}: CourseProps) {
    let globalIndex = 0 // Track flat video index across modules
    return (
        <div>
            {course.modules.map((module, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <ModuleHeader>{module.title}</ModuleHeader>
                    </AccordionSummary>
                    {module.lessons.map((lesson, subIndex) => {
                        const currentIndex = globalIndex
                        globalIndex++
                        // console.log("Mapped lesson : ", lesson.title)
                        return (
                            <AccordionDetails key={subIndex}>
                                <ModuleContent>
                                    {!enrolled ? (
                                        <LockIcon />
                                    ) : (
                                        <Playbtn onClick={() => handleSelectVideo(currentIndex)} />
                                    )}
                                    {lesson.title}
                                    {completedVideos.includes(lesson.title) ? (
                                        <RoundCheckBox style={{ color: "#0072ff" }} />
                                    ) : (
                                        <RoundCheckBox />
                                    )}
                                </ModuleContent>
                            </AccordionDetails>
                        )
                    })}
                </Accordion>
            ))}
        </div>
    )
}
