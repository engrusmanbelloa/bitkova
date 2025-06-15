import React from "react"
import styled from "styled-components"
import LockIcon from "@mui/icons-material/Lock"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { CourseType } from "@/types"

const ModuleHeader = styled.div`
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
`
const ModuleContent = styled.div`
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
`
interface CourseProps {
    course: CourseType
}

export default function CourseContent({ course }: CourseProps) {
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
                    {module.content.map((item: any, i: number) => (
                        <AccordionDetails key={i}>
                            <ModuleContent>
                                <LockIcon /> {item}
                            </ModuleContent>
                        </AccordionDetails>
                    ))}
                </Accordion>
            ))}
        </div>
    )
}
