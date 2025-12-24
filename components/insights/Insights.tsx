"use client"

import { useState } from "react"
import styled from "styled-components"
import { useRouter, useSearchParams } from "next/navigation"
import HomeHero from "@/components/home/HomeHero"
import NewsFeed from "@/components/insights/NewsFeed"
import PriceFeed from "@/components/insights/PriceFeed"
import { NewsCategory } from "@/types/news"
import { mobile, ipad } from "@/responsive"

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
const TabsWrapper = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin: 0 auto 20px;
    padding: 5px 50px;
    gap: 24px;
    background: ${(props) => props.theme.mobile.lightAsh};
    border-bottom: 1px solid #ddd;
    border-radius: 8px;
    ${ipad(
        (props: any) => `
        width: ${props.theme.widths.ipadWidth};
        padding: 5px 30px;
    `,
    )};
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
    `,
    )};
`
const Tab = styled.button<{ $isActive: boolean }>`
    background: ${({ $isActive, theme }) =>
        $isActive ? theme.palette.common.white : "transparent"};
    border: none;
    border-radius: 8px;
    padding: 5px 0;
    width: 200px;
    font-weight: 800;
    color: ${({ $isActive, theme }) => ($isActive ? theme.palette.primary.main : "#555")};
    border-bottom: ${({ $isActive }) => ($isActive ? "2px solid #3b82f6" : "none")};
    cursor: pointer;
    font-size: 20px;
    ${ipad(
        (props: any) => `
       font-size: 16px;
    `,
    )};
    ${mobile(
        (props: any) => `
        font-size: 12px;
    `,
    )};
`

type TabOption = "All" | NewsCategory

export default function Insights() {
    const [activeTab, setActiveTab] = useState<TabOption>("All")
    const master = "Bitkova"
    const headerSpan = "Insights"
    const heroText =
        "Your lens into the future of decentralized finance. Navigate the digital frontier with real-time updates on blockchain breakthroughs, shifting global economics, and the strategic moves of smart money whales."

    const tabs: TabOption[] = ["All", "Crypto", "Blockchain"]

    return (
        <Container>
            <HomeHero master={master} headerSpan={headerSpan} heroText={heroText} />
            <TabsWrapper>
                {tabs.map((tab) => (
                    <Tab key={tab} $isActive={activeTab === tab} onClick={() => setActiveTab(tab)}>
                        {tab}
                    </Tab>
                ))}
            </TabsWrapper>
            <PriceFeed />
            {/* The NewsFeed component handles filtering internally based on the prop */}
            <NewsFeed filterCategory={activeTab} />
        </Container>
    )
}
