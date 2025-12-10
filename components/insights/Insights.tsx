"use client"
import React, { useState } from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import HomeHero from "@/components/home/HomeHero"
import CryptoNews from "@/components/insights/CryptoNews"
import PriceFeed from "./PriceFeed"

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
`

export default function Insights() {
    const [activeTab, setActiveTab] = useState<"all" | "crypto" | "blockchain">("all")
    const master = "Bitkova"
    const headerSpan = "Insights"
    const heroText = "Stay informed with the latest in blockchain,economics, and smart money"
    return (
        <Container>
            <HomeHero master={master} headerSpan={headerSpan} heroText={heroText} />
            <TabsWrapper>
                <Tab $isActive={activeTab === "all"} onClick={() => setActiveTab("all")}>
                    All
                </Tab>
                <Tab $isActive={activeTab === "crypto"} onClick={() => setActiveTab("crypto")}>
                    Crypto
                </Tab>
                <Tab
                    $isActive={activeTab === "blockchain"}
                    onClick={() => setActiveTab("blockchain")}
                >
                    Blockchain
                </Tab>
            </TabsWrapper>
            {activeTab === "all" && (
                <>
                    <PriceFeed />
                    <CryptoNews />
                </>
            )}
        </Container>
    )
}
