"use client"
import React from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Pagination } from "swiper/modules"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PeopleIcon from "@mui/icons-material/People"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import SchoolIcon from "@mui/icons-material/School"
import { mobile, ipad } from "@/responsive"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

const SwiperContainer = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    height: 65vh;
    overflow: hidden;
    margin: 0 auto 30px;
    padding: 0;
    ${ipad(
        (props: any) => `
            height: 70vh;
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: 100%;
            margin-top: 0;
            height: 80vh;
            max-width: ${props.theme.widths.mobileWidth};
        `,
    )}
    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper-pagination {
        right: 20px;
        left: auto;
        top: 50%;
        transform: translateY(-50%);
        width: auto;
    }

    .swiper-pagination-bullet {
        display: block;
        margin: 8px 0;
        background: ${(props) => props.theme.palette.primary.main};
        opacity: 0.3;
        width: 10px;
        height: 10px;
    }

    .swiper-pagination-bullet-active {
        opacity: 1;
        width: 12px;
        height: 12px;
    }
`
const SlideContent = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0 auto;
    height: 520px;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: 100%;
            max-width: ${props.theme.widths.mobileWidth};
            padding: 20px auto;
            height: 75vh;
            box-sizing: border-box;
        `,
    )}
`
const SectionTitle = styled.h2`
    margin: 0 0 10px 0;
    color: ${(props) => props.theme.palette.common.black};
    display: flex;
    align-items: center;
    gap: 10px;
    ${mobile({ fontSize: "24px", marginBottom: "20px" })}
`
const ClassCard = styled(Card)`
    width: 100%;
    margin: 0 auto;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    ${mobile({ maxWidth: "100%" })}
`
const ClassHeader = styled.div`
    padding: 20px;
    border-bottom: 1px solid #f0f0f0;
`
const ClassName = styled.h3`
    margin: 0 0 12px 0;
    color: ${(props) => props.theme.palette.primary.main};
    font-size: 24px;
    font-weight: 600;

    ${mobile({ fontSize: "20px" })}
`
const InfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 10px 0;
    color: ${(props) => props.theme.palette.common.black};
    font-size: 14px;

    svg {
        font-size: 18px;
        color: ${(props) => props.theme.palette.primary.main};
    }
`
const ClassBody = styled(CardContent)`
    padding: 20px;
`
const SectionLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 20px 0 10px;
    font-weight: 600;
    color: ${(props) => props.theme.palette.common.black};
    font-size: 14px;

    svg {
        font-size: 18px;
    }
`
const CourseList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    flex-direction: row;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: 100%;
            max-width: ${props.theme.widths.mobileWidth};
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
            gap: 0px 2px;
            max-height: calc(1.6em * 2 + 12px);
            overflow: hidden;
        `,
    )}
`
const InstructorList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    flex-direction: row;

    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: 100%;
            max-width: ${props.theme.widths.mobileWidth};
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
            gap: 0px 2px;
            max-height: calc(1.6em * 2 + 12px);
            overflow: hidden;
        `,
    )}
`
const CourseItem = styled.li`
    padding: 6px 0;
    color: ${(props) => props.theme.palette.common.black};
    font-size: 14px;
    line-height: 1.6;
`
const EnrollButton = styled(Button)`
    width: 100%;
    margin-top: 20px;
    background: ${(props) => props.theme.palette.primary.main};
    color: white;
    text-transform: none;
    font-weight: 500;
    padding: 12px;
    font-size: 16px;

    &:hover {
        background: ${(props) => props.theme.palette.primary.main};
        opacity: 0.9;
    }
`
const Price = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 28px;
    font-weight: 700;
    color: #10b981;
    margin-top: 16px;

    span {
        font-size: 18px;
        font-weight: 400;
    }
`

interface ClassData {
    id: string
    name: string
    location: string
    cohort: string
    nextClass: string
    time: string
    instructors: string[]
    courses: string[]
    price: string
}

const classesData: ClassData[] = [
    {
        id: "1",
        name: "Gombe HQ",
        location: "C6 Duwa Plaza Opp Old Bauchi Park, Gombe",
        cohort: "30+ cohort",
        nextClass: "Next Cohort: January 15, 2026",
        time: "Sarturday 2pm - 5pm, Sunday 2pm - 5pm",
        instructors: ["Mahmoud Sardauna", "Aminu Muhammad", "Mustapha Yaha"],
        courses: ["Cryptocurrency market analysis", "Crypto Trading", "Dafi Economics"],
        price: "₦ 25,000",
    },
    {
        id: "2",
        name: "Bauchi",
        location: "Reinsurance house,12 Ahmadu Bello Way, opposite Ministry Of Finance, Bauchi",
        cohort: "45,000+ cohort",
        nextClass: "Next Cohort: January 26, 2026",
        time: "Sarturday 10am - 1pm, sunday 10am - 1pm",
        instructors: ["Haruna Usman", "Usman Mukhtar"],
        courses: ["Cryptocurrency market analysis", "Trading Skills"],
        price: "₦ 20,000",
    },
    {
        id: "3",
        name: "Kano",
        location: "Atlas training institute, Opp Buk Main Gate Old Site, Kano",
        cohort: "30+ cohort",
        nextClass: "Next Cohort: February 10, 2026",
        time: "Sarturday 10am - 1pm, Sunday 10am - 1pm",
        instructors: ["Amir Bahir Lawa", "Zainab Salisu"],
        courses: ["Blockchain Technology", "Cryptocurrency market analysis"],
        price: "₦ 30,000",
    },
    {
        id: "4",
        name: "Kaduna",
        location: "Almara center, 32b kanta road Unguwan Rimi Kaduna",
        cohort: "50,000+ cohort",
        nextClass: "Next Cohort: January 30, 2026",
        time: "Sarturday 2pm - 5pm, sunday 10am - 1pm",
        instructors: ["Engr. Usman Bello A", "Musa Muhammad"],
        courses: [
            "Cryptocurrency market analysis",
            "Blockchain development",
            "software engineering",
        ],
        price: "₦ 22,000",
    },
]

export default function PhysicalClassesSwiper() {
    return (
        <SwiperContainer>
            <SectionTitle>
                <LocationOnIcon sx={{ color: "#356DF1" }} />
                Physical Classes
            </SectionTitle>
            <Swiper
                direction="vertical"
                slidesPerView={1}
                spaceBetween={0}
                mousewheel={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Mousewheel, Pagination]}
            >
                {classesData.map((classItem) => (
                    <SwiperSlide key={classItem.id}>
                        <SlideContent>
                            <ClassCard>
                                <ClassHeader>
                                    <ClassName>{classItem.name}</ClassName>
                                    <InfoRow>
                                        <LocationOnIcon />
                                        <span>{classItem.location}</span>
                                    </InfoRow>
                                    <InfoRow>
                                        <PeopleIcon />
                                        <span>{classItem.cohort}</span>
                                    </InfoRow>
                                    <InfoRow>
                                        <CalendarMonthIcon />
                                        <span>{classItem.nextClass}</span>
                                    </InfoRow>
                                    <InfoRow>
                                        <AccessTimeIcon />
                                        <span>{classItem.time}</span>
                                    </InfoRow>
                                </ClassHeader>

                                <ClassBody>
                                    <SectionLabel>
                                        <SchoolIcon />
                                        Instructors
                                    </SectionLabel>
                                    <InstructorList>
                                        {classItem.instructors.map((instructor, idx) => (
                                            <CourseItem key={idx}>{instructor}</CourseItem>
                                        ))}
                                    </InstructorList>

                                    <SectionLabel>
                                        <SchoolIcon />
                                        Courses
                                    </SectionLabel>
                                    <CourseList>
                                        {classItem.courses.map((course, idx) => (
                                            <CourseItem key={idx}>{course}</CourseItem>
                                        ))}
                                    </CourseList>

                                    <Price>
                                        <span>₦</span>
                                        {classItem.price.replace("₦ ", "")}
                                    </Price>

                                    <EnrollButton variant="contained">Enroll Now</EnrollButton>
                                </ClassBody>
                            </ClassCard>
                        </SlideContent>
                    </SwiperSlide>
                ))}
            </Swiper>
        </SwiperContainer>
    )
}
