"use client"
import React from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import HomeHero from "@/components/home/HomeHero"

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

export default function Insights() {
    const master = "Bitkova"
    const headerSpan = "Insights"
    const heroText = "Stay informed with the latest in blockchain,economics, and smart money"
    return (
        <Container>
            <HomeHero master={master} headerSpan={headerSpan} heroText={heroText} />
        </Container>
    )
}
