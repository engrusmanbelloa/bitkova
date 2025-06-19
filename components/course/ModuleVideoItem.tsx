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
const Playbtn = styled(PlayArrowIcon)`
    color: ${(props) => props.theme.mobile.offWhite};
`

type Lessons = {
    id: number
    content: string[]
    links: Record<string, string>
    title: string
    url: string
    enrolled: boolean
    onSelect: (url: string, title: string) => void
}

export default function ModuleVideoItem({ title, url, enrolled, onSelect }: Lessons) {
    return (
        <AccordionDetails>
            <ModuleContent onClick={() => enrolled && onSelect(url, title)}>
                {enrolled ? <Playbtn /> : <LockIcon />}
                {title}
            </ModuleContent>
        </AccordionDetails>
    )
}
