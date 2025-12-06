"use client"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import HomeHero from "@/components/home/HomeHero"
import HireBitkova from "@/components/partnership/HireBitkova"
import HostEventsWithUs from "@/components/partnership/HostEventsWithUs"
import RequestQuote from "@/components/partnership/RequestQuote"

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
const Banner = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    height: 300px;
    background: ${(props) => props.theme.palette.primary.main};
    border-radius: 12px;
    margin: 0 auto 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.palette.common.white};
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
const BannerText = styled.h2`
    padding: 10px;
    margin: 0;
`
const BannerDesc = styled.p`
    margin: 0;
`

export default function Partnership() {
    const master = "Bitkova"
    const headerSpan = "Partnership"
    const heroText =
        "Your gateway to cutting-edge tech skills and career growth. Explore our curated courses, expert instructors, and vibrant community designed to empower your journey in the digital world."

    return (
        <Container>
            <HomeHero master={master} headerSpan={headerSpan} heroText={heroText} />
            <Banner>
                <BannerText>Patner With Bitkova </BannerText>
                <BannerDesc>Collaborate with us to drive innovation and growth</BannerDesc>
            </Banner>
            <HostEventsWithUs />
            <HireBitkova />
            <RequestQuote />
        </Container>
    )
}
