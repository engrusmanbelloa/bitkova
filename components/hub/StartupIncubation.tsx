import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Pagination } from "swiper/modules"
import styled from "styled-components"
import { Box, Typography } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection"
import BusinessIcon from "@mui/icons-material/Business"
import "swiper/css"
import "swiper/css/pagination"
import { mobile, ipad } from "@/responsive"

// Styled Components

const SectionContainer = styled(Card)`
    width: ${(props) => props.theme.widths.heroWidth};
    height: 300px;
    overflow: hidden;
    margin: 0 auto 30px;
    padding: 0;
    border: 1px solid ${({ theme }) => theme.mobile.horizontalrule};
    border-left: 5px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
    height: 100%;

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
        background: ${(props) => props.theme.palette.primary.main};
        opacity: 0.5;
    }

    .swiper-pagination-bullet-active {
        opacity: 1;
    }
`

const ProgramCard = styled.div`
    width: 100%;
    padding: 40px;
    border-radius: 8px;
`

const IconContainer = styled.div<{ bgcolor: string }>`
    width: 56px;
    height: 56px;
    background: ${(props) => props.bgcolor};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`

const LearnMoreLink = styled.a`
    color: ${(props) => props.theme.palette.primary.main};
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    margin-top: 16px;
    display: inline-block;

    &:hover {
        text-decoration: underline;
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

// Program data
const programs = [
    {
        id: 1,
        icon: "🚀",
        bgcolor: "#E3F2FD",
        title: "Early Stage Support",
        description: "Mentorship and funding for pre-seed and seed stage startups",
    },
    {
        id: 2,
        icon: "👥",
        bgcolor: "#F3E5F5",
        title: "Network Access",
        description: "Connect with investors, mentors, and industry experts",
    },
    {
        id: 3,
        icon: "📈",
        bgcolor: "#E8F5E9",
        title: "Growth Acceleration",
        description: "Strategic guidance to scale your business effectively",
    },
    {
        id: 4,
        icon: "💡",
        bgcolor: "#FFF3E0",
        title: "Innovation Labs",
        description: "Access to workspace, resources, and technical infrastructure",
    },
]
export default function StartupIncubationSwiper() {
    return (
        <>
            <SectionTitle>
                <BusinessIcon sx={{ color: "#356DF1" }} />
                Startup Incubation Programs
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
                        {programs.map((program) => (
                            <SwiperSlide key={program.id}>
                                <ProgramCard>
                                    <IconContainer bgcolor={program.bgcolor}>
                                        <span style={{ fontSize: "24px" }}>{program.icon}</span>
                                    </IconContainer>

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 2,
                                            color: "#000000B2",
                                        }}
                                    >
                                        {program.title}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "#666",
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {program.description}
                                    </Typography>

                                    <LearnMoreLink href="#">Learn More</LearnMoreLink>
                                </ProgramCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </SwiperContainer>
            </SectionContainer>
        </>
    )
}
