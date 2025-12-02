"use client"
import React from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import HomeHero from "@/components/home/HomeHero"

const Container = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0 auto;
    z-index: 1;
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
    const welcome = "Welcome to"
    const title = "Bitkova Academy"
    const heroHeader = "Bitkova"
    const master = "Bitkova"
    const headerSpan = "Hub"
    const heroText =
        "Your gateway to cutting-edge tech skills and career growth. Explore our curated courses, expert instructors, and vibrant community designed to empower your journey in the digital world."
    return (
        <Container>
            <HomeHero master={master} headerSpan={headerSpan} heroText={heroText} />
        </Container>
    )
}
