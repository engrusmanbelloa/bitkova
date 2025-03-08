"use client"
import React, { useState, SyntheticEvent } from "react"
import styled from "styled-components"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import LockIcon from "@mui/icons-material/Lock"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import QuizIcon from "@mui/icons-material/Quiz"

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 20px auto 0px;
    padding: 0px;
`
const TabContainer = styled(Box)`
    border-bottom: 1px solid ${(props) => props.theme.mobile.horizontalrule};
`
const TabsItem = styled(Tabs)`
    padding: 0px;
`
const TabLabel = styled(Tab)`
    font-size: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.common.black};
    text-transform: capitalize;
`
const SectionTitle = styled.h2`
    margin-bottom: 15px;
`
const BulletList = styled.ul`
    list-style-type: disc;
    padding-left: 20px;
    margin-bottom: 20px;
`
const BulletListLi = styled.li`
    list-style-type: disc;
    padding-left: 0px;
    margin-bottom: 20px;
`
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

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

interface CourseProps {
    courseDesc: string
    whatYoullLearn: string[]
    modules: {
        title: string
        content: string[]
    }[]
    review: {
        id: number
        stars: number
        comment: string
        Name: string
    }[]
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

export default function BasicTabs({ courseDesc, whatYoullLearn, modules, review }: CourseProps) {
    const [value, setValue] = useState(0)

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Container>
            <TabContainer>
                <TabsItem value={value} onChange={handleChange} aria-label="basic tabs example">
                    <TabLabel label="Course detail" {...a11yProps(0)} />
                    <TabLabel label="Student Reviews" {...a11yProps(1)} />
                </TabsItem>
            </TabContainer>
            {/* Course detail section */}
            <CustomTabPanel value={value} index={0}>
                <SectionTitle>About Course</SectionTitle>
                <p>{courseDesc}</p>
                <SectionTitle>What will you Learn?</SectionTitle>
                {whatYoullLearn.map((item, index) => (
                    <BulletList key={index}>
                        <BulletListLi>{item}</BulletListLi>
                    </BulletList>
                ))}
                <SectionTitle>Course Content</SectionTitle>
                {modules.map((module, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <ModuleHeader>{module.title}</ModuleHeader>
                        </AccordionSummary>
                        {module.content.map((item, i) => (
                            <AccordionDetails key={i}>
                                <ModuleContent>
                                    <LockIcon /> {item}
                                </ModuleContent>
                            </AccordionDetails>
                        ))}
                    </Accordion>
                ))}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {review.map((item, i) => (
                    <div key={i}>
                        <p>
                            <strong>{item.Name}</strong> - {item.stars} stars
                        </p>
                        <p>{item.comment}</p>
                    </div>
                ))}
            </CustomTabPanel>
        </Container>
    )
}
