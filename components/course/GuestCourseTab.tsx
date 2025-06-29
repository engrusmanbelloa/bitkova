"use client"
import React, { useState, SyntheticEvent } from "react"
import styled from "styled-components"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import CourseModules from "@/components/course/CourseModules"
import { formatPrice } from "@/config/FormatPrice"
import { CourseType } from "@/types"
import { mobile, ipad } from "@/responsive"

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 10px auto 0px;
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
const ModuleTabLabel = styled(Tab)`
    display: none;
    font-size: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.common.black};
    text-transform: capitalize;
    ${ipad(
        (props: any) => `
            display: inline;
        `,
    )}
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
interface CourseProps {
    course: CourseType
    enrolled: boolean
    // setSelectedVideo: (url: string) => void
    // setSelectedTitle: (title: string) => void
    completedVideos: string[]
    handleSelectVideo: (index: number) => void
}

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
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

export default function GuestCourseTab({
    course,
    // setSelectedTitle,
    // setSelectedVideo,
    handleSelectVideo,
    enrolled,
    completedVideos,
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
                    <TabLabel label="Reviews" {...a11yProps(2)} />
                </TabsItem>
            </TabContainer>
            {/* Course detail section */}
            <CustomTabPanel value={value} index={0}>
                <SectionTitle>Course Modules</SectionTitle>
                <CourseModules
                    // setSelectedTitle={setSelectedTitle}
                    // setSelectedVideo={setSelectedVideo}
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
                {course.review.map((item, i) => (
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
