"use client"
import React, { useState, SyntheticEvent } from "react"
import styled from "styled-components"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import CourseModules from "@/components/course/CourseModules"
import CertificateVerifier from "@/components/course/CertificateVerifier"
import { CourseWithExtras } from "@/types"

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 10px auto 0px;
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

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}
interface CourseProps {
    course: CourseWithExtras
    enrolled: boolean
    completedVideos: string[]
    handleSelectVideo: (index: number) => void
    user: any
    completed: boolean
    id: any
    desc: any
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
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    )
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

export default function CourseTabs({
    course,
    user,
    completed,
    enrolled,
    completedVideos,
    handleSelectVideo,
    desc,
    id,
}: CourseProps) {
    const [value, setValue] = useState(0)

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Container>
            <TabContainer>
                <TabsItem value={value} onChange={handleChange} aria-label="basic tabs example">
                    <TabLabel label="Modules" {...a11yProps(0)} />
                    <TabLabel label="Course detail" {...a11yProps(1)} />
                    <TabLabel label="Certificate" {...a11yProps(2)} />
                </TabsItem>
            </TabContainer>
            {/* Course detail section */}
            <CustomTabPanel value={value} index={0}>
                <SectionTitle>Course Modules</SectionTitle>
                <CourseModules
                    handleSelectVideo={handleSelectVideo}
                    enrolled={enrolled}
                    course={course}
                    completedVideos={completedVideos}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <SectionTitle>About Course</SectionTitle>
                <p>{course.courseDesc}</p>
                <SectionTitle>What will you Learn?</SectionTitle>
                {course.whatYoullLearn.map((item, index) => (
                    <BulletList key={index}>
                        <BulletListLi>{item}</BulletListLi>
                    </BulletList>
                ))}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <CertificateVerifier
                    user={user}
                    completed={completed}
                    title={course.title}
                    id={id}
                    duration={course.duration.hours}
                    desc={course.shortDesc}
                />
            </CustomTabPanel>
        </Container>
    )
}
