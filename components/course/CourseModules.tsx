import React, { useState } from "react"
import styled from "styled-components"
import LockIcon from "@mui/icons-material/Lock"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { CourseType } from "@/types"
import { mobile, ipad } from "@/responsive"
import { boolean } from "zod"

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
const RoundCheckBox = styled(RadioButtonUncheckedIcon)`
    color: ${(props) => props.theme.mobile.offWhite};
    position: absolute;
    right: 15px;
    cursor: pointer;
`
const Playbtn = styled(PlayArrowIcon)`
    color: ${(props) => props.theme.mobile.offWhite};
    font-size: 30px;
    cursor: pointer;
`
interface CourseProps {
    course: CourseType
    enrolled: boolean
    setSelectedVideo: (url: string) => void
    setSelectedTitle: (title: string) => void
}

export default function CourseModules({
    course,
    setSelectedTitle,
    setSelectedVideo,
    enrolled,
}: CourseProps) {
    const handleSelectVideo = (url: string, title: string) => {
        setSelectedVideo(url)
        setSelectedTitle(title)

        console.log("Selected:", title, url)
    }
    return (
        <div>
            {course.modules.map((module, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <ModuleHeader>{module.title}</ModuleHeader>
                    </AccordionSummary>
                    {module.links &&
                        Object.entries(module.links).map(([title, url], subIndex) => (
                            <AccordionDetails key={subIndex}>
                                <ModuleContent>
                                    {!enrolled ? (
                                        <LockIcon />
                                    ) : (
                                        <Playbtn
                                            onClick={() => {
                                                if (enrolled) {
                                                    setSelectedVideo(url)
                                                    setSelectedTitle(title)
                                                    console.log()
                                                }
                                            }}
                                        />
                                    )}
                                    {title}
                                    <RoundCheckBox />
                                </ModuleContent>
                            </AccordionDetails>
                        ))}
                </Accordion>
            ))}
        </div>
    )
}
