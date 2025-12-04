import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Pagination } from "swiper/modules"
import styled from "styled-components"
import { Card, Box, Typography, Button, Avatar } from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import "swiper/css"
import "swiper/css/pagination"
import { mobile, ipad } from "@/responsive"

// Styled Components
const SectionContainer = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    padding: 0;
    margin: 0 auto 30px;
    box-sizing: border-box;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: 100%;
            max-width: ${props.theme.widths.mobileWidth};
        `,
    )}
`

const SwiperContainer = styled.div`
    width: 100%;
    height: 350px;
    margin-top: 0px;
    border-sizing: border-box;

    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper-pagination-bullet {
        background: #356df1;
        opacity: 0.5;
    }

    .swiper-pagination-bullet-active {
        opacity: 1;
    }
`

const TeamCard = styled(Card)`
    width: 100%;
    padding: 40px;
    background: white;
    border-radius: 12px;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.mobile.horizontalrule};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const MemberAvatar = styled(Avatar)`
    && {
        width: 120px;
        height: 120px;
        margin: 0 auto 20px;
        border: 4px solid #eaf3fb;
    }
`

const MemberName = styled(Typography)`
    && {
        font-weight: 600;
        font-size: 20px;
        color: #000000b2;
        margin-bottom: 8px;
    }
`

const MemberRole = styled(Typography)`
    && {
        color: #356df1;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
    }
`

const MemberTitle = styled(Typography)`
    && {
        color: #666;
        font-size: 13px;
    }
`
const SectionTitle = styled.h2`
    margin: 0 0 10px 0;
    color: ${(props) => props.theme.palette.common.black};
    display: flex;
    align-items: center;
    gap: 10px;
    ${mobile({ marginBottom: "20px" })}
`

// Team members data
const teamMembers = [
    {
        id: 1,
        name: "Mahmoud Muhammad Sardauna",
        role: "Founder & CEO",
        title: "Professional Trader",
        avatar: "/team/mahmoud.jpg",
    },
    {
        id: 2,
        name: "Usmanu Bello A",
        role: "Co-Founder, COO",
        title: "Blockchain Software Engineer",
        avatar: "/team/usman.jpg",
    },
    {
        id: 3,
        name: "Muhammad Sageer Muhammad",
        role: "Co-Founder, Marketing Director",
        title: "Web3 Marketing Specialist",
        avatar: "/team/msageer.jpg",
    },
    {
        id: 4,
        name: "Ameer Bashir Lawan",
        role: "Lead Instructor Kano",
        title: "Professional Trader",
        avatar: "/team/amir.jpg",
    },
    {
        id: 5,
        name: "Haruna Usman",
        role: "Lead Instructor Bauchi",
        title: "Professional Trader",
        avatar: "/team/haruna.jpg",
    },
    {
        id: 6,
        name: "Aminu Muhammad Aliyu",
        role: "Assistant Tutor Gombe",
        title: "Web3 Specialist",
        avatar: "/team/aminu.jpg",
    },
    {
        id: 7,
        name: "Mustapha Yahaya Ethaskary",
        role: "Assistant Tutor Gombe",
        title: "Web3 Specialist",
        avatar: "/team/ethaskary.jpg",
    },
    {
        id: 8,
        name: "Abdulrahim Salisu",
        role: "Lead Instructor",
        title: "Web3 Specialist",
        avatar: "/team/abdulrahim.jpg",
    },
    {
        id: 9,
        name: "Aliyu Mustapha",
        role: "Lead Instructor",
        title: "Web3 Specialist",
        avatar: "/team/aliyu.jpg",
    },
    {
        id: 10,
        name: "Muhammad Salisu",
        role: "Lead Instructor",
        title: "Web3 Specialist",
        avatar: "/team/salisu.jpg",
    },
    {
        id: 11,
        name: "Mahmoud Abdu",
        role: "Lead Instructor",
        title: "Web3 Specialist",
        avatar: "/team/abdu.jpg",
    },
    {
        id: 12,
        name: "Aishatu Muhammad Sani",
        role: "Advisory Board Member",
        title: "Web3 Specialist",
        avatar: "/team/aishatu.jpg",
    },
    {
        id: 13,
        name: "Khadija Abdullahi Madara",
        role: "Assistant Tutor Gombe",
        title: "Web3 Specialist",
        avatar: "/team/khadija.jpg",
    },
    {
        id: 14,
        name: "Salim Abubakar",
        role: "Assistant Tutor Gombe",
        title: "Web3 Specialist",
        avatar: "/team/salim.jpg",
    },
    {
        id: 15,
        name: "Nafisa Garba",
        role: "UIUX Tutor TG",
        title: "UIUX Specialist",
        avatar: "/team/nafisa.jpg",
    },
    {
        id: 16,
        name: "Nauwas Zubairu",
        role: "Assistant Tutor Jos",
        title: "Web3 Specialist",
        avatar: "/team/nauwas.jpg",
    },
]

export default function TeamTutorsSwiper() {
    // const TeamTutorsSwiper: React.FC = () => {
    return (
        <>
            <SectionTitle>
                <SchoolIcon sx={{ color: "#356DF1" }} />
                Our Team & Tutors
            </SectionTitle>
            <SectionContainer>
                <SwiperContainer>
                    <Swiper
                        direction="vertical"
                        slidesPerView={1}
                        spaceBetween={30}
                        mousewheel={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Mousewheel, Pagination]}
                    >
                        {teamMembers.map((member) => (
                            <SwiperSlide key={member.id}>
                                <TeamCard>
                                    <MemberAvatar src={member.avatar} alt={member.name} />

                                    <MemberName>{member.name}</MemberName>

                                    <MemberRole>{member.role}</MemberRole>

                                    <MemberTitle>{member.title}</MemberTitle>
                                </TeamCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </SwiperContainer>
            </SectionContainer>
        </>
    )
}
