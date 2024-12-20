import * as React from "react"
import Card from "@mui/material/Card"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import PlaceIcon from "@mui/icons-material/Place"
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled"
import styled from "styled-components"
import "animate.css/animate.min.css"
import { AnimationOnScroll } from "react-animation-on-scroll"
import { events } from "../data"
import { mobile, ipad } from "../responsive"

const Container = styled.section`
    margin: 40px 0px;
    padding: 0px 0px;
    background-color: #cddeff;
    border-radius: 10px;
    letter-spacing: 1px;
`

const Wrapper = styled.div`
    display: flex;
    margin: 20px;
    height: 100%;
    width: 100%;
    border-bottom: 0.5px solid rgba(28, 56, 121, 0.5);
    border-radius: 3px;
    &:hover {
        animation: pulse;
        animation-duration: 1s;
    }
    ${ipad({
        display: "block",
        margin: "10px",
        padding: "5px",
        border: "1px solid #CDDEFF",
        borderRadius: "5px",
    })}
    ${mobile({ width: "90%" })}
`

const EventContainer = styled.div`
    padding: 0;
    margin: 0;
    ${ipad({ display: "flex", justifyContent: "flex-start", overflow: "scroll" })}
`

const Button = styled.button`
    padding: 10px;
    background: rgba(28, 56, 121);
    color: #fff;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #cddeff;
        color: rgba(28, 56, 121);
    }
    ${ipad({ fontSize: "18px", padding: "2px" })}
`

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 0 10px;
`

const InfoContainer = styled.div`
    padding: 10px;
    margin: 15px;
    text-align: center;
    borderradius: 3px;
    ${ipad({ textAlign: "justify", margin: "0 auto", padding: "0" })}
`

const ImageBox = styled.img`
    width: 700px;
    height: 250px;
    ${ipad({ width: "350px" })}
    ${mobile({ width: "275px" })}
`

const Title = styled.h1`
    margin: 2px;
    ${mobile({ fontSize: "16px", textAlign: "left" })}
`

const Detail = styled.div`
    align-items: center;
`

const Paragraph = styled.p`
    margin: 5px;
    padding: 20p;
    font-size: 20px;
    ${mobile({ fontSize: "16px", textAlign: "left", fontWeight: "300" })}
`

const Hr = styled.hr`
    margin: 15px 0;
    width: 100%;
    height: 0.5px;
`

const ScheduleBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    ${mobile({ fontSize: "14px", fontWeight: "300", textAlign: "left" })}
`

const Events = () => {
    return (
        <Container>
            <Card variant="elevation" elevation={15} sx={{ m: 2, borderRadius: 2 }}>
                <Box>
                    <Title>LATEST EVENTS</Title>
                    <Button>See more</Button>
                </Box>
                <EventContainer>
                    {events.map((event) => (
                        <AnimationOnScroll
                            key={event.id}
                            animateIn="animate__pulse animate__slower"
                        >
                            <Wrapper>
                                <ImageBox src={event.img} alt="profile" />
                                <InfoContainer>
                                    <Title>{event.title}</Title>
                                    <Paragraph>{event.desc}</Paragraph>
                                    <Hr />
                                    <ScheduleBox>
                                        <Detail>
                                            <CalendarMonthIcon sx={{ m: 1 }} />
                                        </Detail>
                                        {event.date}
                                        <Detail>
                                            <AccessTimeFilledIcon sx={{ m: 1 }} />
                                        </Detail>
                                        {event.time}
                                    </ScheduleBox>
                                    <ScheduleBox>
                                        <Detail>
                                            <PlaceIcon />
                                        </Detail>
                                        {event.venue}
                                    </ScheduleBox>
                                </InfoContainer>
                            </Wrapper>
                        </AnimationOnScroll>
                    ))}
                </EventContainer>
            </Card>
        </Container>
    )
}

export default Events
