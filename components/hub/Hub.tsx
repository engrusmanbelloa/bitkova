"use client"
import React from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import HomeHero from "@/components/home/HomeHero"
import PhysicalClassesSwiper from "@/components/hub/PhysicalClasses"
import TelegramClass from "@/components/hub/TelegramClass"
import StartupIncubationSwiper from "@/components/hub/StartupIncubation"
import EventsSwiper from "@/components/hub/EventsSwiper"
import TeamTutorsSwiper from "@/components/hub//TeamTutorsSwiper"

const Container = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0;
    padding: ${(props) => props.theme.paddings.pagePadding};
    ${ipad(
        (props: any) => `
        padding: 5px 0;
        width: ${props.theme.widths.ipadWidth};
    `,
    )};
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
        padding: 0;
        margin: 0;
    `,
    )};
`

export default function Hub() {
    const master = "Bitkova"
    const headerSpan = "Hub"
    const heroText =
        "Your gateway to cutting-edge tech skills and career growth. Explore our curated courses, expert instructors, and vibrant community designed to empower your journey in the digital world."
    return (
        <Container>
            <HomeHero master={master} headerSpan={headerSpan} heroText={heroText} />
            <PhysicalClassesSwiper />
            <TelegramClass />
            <StartupIncubationSwiper />
            <EventsSwiper type="upcoming" />
            <EventsSwiper type="past" />
            <TeamTutorsSwiper />
        </Container>
    )
}
