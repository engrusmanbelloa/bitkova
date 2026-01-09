import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Pagination } from "swiper/modules"
import styled from "styled-components"
import { Card, Button, Chip } from "@mui/material"
import EventIcon from "@mui/icons-material/Event"
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
const SwiperContainer = styled.div<{ height: string }>`
    width: 100%;
    height: ${(props) => props.height};
    margin-top: 0px;

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
const SectionTitle = styled.h2`
    margin: 0 0 10px 0;
    color: ${(props) => props.theme.palette.common.black};
    display: flex;
    align-items: center;
    gap: 10px;
    ${mobile({ marginBottom: "20px" })}
`
const SectionDesc = styled.h3`
    margin: 0 0 30px 0px;
    color: ${(props) => props.theme.mobile.orange};
    ${mobile({ marginBottom: "20px" })}
`
const EventCard = styled(Card)`
    width: 100%;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 10px 10px ${(props) => props.theme.mobile.orangeShadow};
`
const EventType = styled.span`
    font-weight: 600;
    text-transform: capitalize;
    background-color: ${(props) => props.theme.mobile.orangeShadow};
    margin-bottom: 20px;
    padding: 4px 8px;
    border-radius: 8px;
    display: inline-block;
    color: #000000b2;
`
const EventTitle = styled.h4`
    margin: 0 0 20px 0;
    color: ${(props) => props.theme.palette.common.black};
`
const EventDescription = styled.p`
    margin: 0 0 16px 0;
    color: #666;
    font-size: 14px;
    line-height: 1.6;
`
const EventDetail = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0;
    color: #666;
    font-size: 14px;
`
const RegisterButton = styled(Button)`
    && {
        background: ${(props) => props.theme.mobile.orange};
        color: white;
        width: 100%;
        padding: 12px;
        margin-top: 20px;
        text-transform: none;
        font-weight: 600;

        &:hover {
            background: ${(props) => props.theme.mobile.orangeDark};
        }
    }
    ${ipad(
        (props: any) => `
        margi-topn: 10px;
        height: 40px;
        `,
    )}
    ${mobile(
        (props: any) => `
        `,
    )}
`

// Event data
const upcomingEvents = [
    {
        id: 1,
        type: "Conference",
        typeColor: "#FFE4D6",
        title: "Blockchain & Web3 Summit",
        date: "December 25, 2025",
        location: "Geneva HQ",
        description: "Join industry leaders for insights into the future of blockchain technology",
    },
    {
        id: 2,
        type: "Workshop",
        typeColor: "#FFE4D6",
        title: "Financial Literacy Workshop",
        date: "January 5, 2026",
        location: "Abuja Center",
        description: "Learn smart money management and investment basics",
    },
]

const pastEvents = [
    {
        id: 1,
        type: "Training",
        typeColor: "#F5F5F5",
        title: "Crypto Trading Masterclass",
        date: "September 20, 2021 - 6:00 PM HQ",
    },
    {
        id: 2,
        type: "Webinar",
        typeColor: "#F5F5F5",
        title: "DeFi Deep Dive",
        date: "September 16, 2025 - Virtual",
    },
]

interface EventsSwiperProps {
    type: "upcoming" | "past"
}

export default function EventsSwiper({ type }: EventsSwiperProps) {
    const events = type === "upcoming" ? upcomingEvents : pastEvents
    const isUpcoming = type === "upcoming"

    return (
        <>
            {isUpcoming ? (
                <>
                    <SectionTitle>
                        <EventIcon sx={{ color: "#FF6B35" }} />
                        Events
                    </SectionTitle>
                    <SectionDesc>Upcoming Events</SectionDesc>
                </>
            ) : (
                <SectionDesc>Past Events</SectionDesc>
            )}
            <SectionContainer>
                <SwiperContainer height={isUpcoming ? "310px" : "190px"}>
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
                        {events.map((event: any) => (
                            <SwiperSlide key={event.id}>
                                <EventCard>
                                    <EventType>{event.type}</EventType>
                                    <EventTitle>{event.title}</EventTitle>
                                    <EventDetail>📅 {event.date}</EventDetail>
                                    {isUpcoming && "location" in event && (
                                        <>
                                            <EventDetail>📍 {event.location}</EventDetail>

                                            {"description" in event && (
                                                <EventDescription>
                                                    {event.description}
                                                </EventDescription>
                                            )}

                                            <RegisterButton>Register For Event</RegisterButton>
                                        </>
                                    )}
                                </EventCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </SwiperContainer>
            </SectionContainer>
        </>
    )
}
