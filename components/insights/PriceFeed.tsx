import { useState, useEffect, useRef, useCallback } from "react"
import styled from "styled-components"
import { TrendingUp, TrendingDown, ArrowLeft, Bookmark, Share } from "@mui/icons-material"
import { Card, Badge, Box, Typography, Button, IconButton, Avatar } from "@mui/material"
import { MOCK_NEWS, MARKET_PRICES, MarketPrice, NewsArticle } from "@/typeInsights"
import { mobile, ipad } from "@/responsive"

const Container = styled.div`
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
const SectionTitle = styled.h2`
    margin-bottom: 16px;
    color: ${(props) => props.theme.palette.common.black};
`
const PriceScrollContainer = styled.div`
    margin: 0px auto;
`
const PriceScroller = styled.div`
    display: flex;
    gap: 16px;
    overflow-x: auto;
    justify-content: space-between;
    padding-bottom: 8px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
`
const PriceCard = styled.div`
    background: linear-gradient(
        135deg,
        ${(props) => props.theme.palette.primary.main} 45%,
        ${(props) => props.theme.mobile.offWhite} 100%
    );
    color: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 280px;
    height: 160px;
    flex-shrink: 0;
`
const PriceCoinName = styled.div`
    font-size: 12px;
    text-transform: uppercase;
    opacity: 0.8;
    margin-bottom: 8px;
`
const PriceAmount = styled.div`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 12px;
`
const PriceChange = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 600;
`
const PriceVolume = styled.div`
    font-size: 12px;
    opacity: 0.7;
`

export default function PriceFeed() {
    const priceScrollRef = useRef<HTMLDivElement>(null)
    return (
        <Container>
            <SectionTitle>Current Market Prices</SectionTitle>
            <PriceScrollContainer>
                <PriceScroller ref={priceScrollRef}>
                    {MARKET_PRICES.map((coin) => (
                        <PriceCard key={coin.symbol}>
                            <PriceCoinName>{coin.name}</PriceCoinName>
                            <PriceAmount>${coin.price.toLocaleString()}</PriceAmount>
                            <PriceChange>
                                {coin.change > 0 ? (
                                    <TrendingUp sx={{ fontSize: 20 }} />
                                ) : (
                                    <TrendingDown sx={{ fontSize: 20 }} />
                                )}
                                <span>
                                    {coin.change > 0 ? "+" : ""}
                                    {coin.change}%
                                </span>
                            </PriceChange>
                            <PriceVolume>Vol: {coin.volume}</PriceVolume>
                        </PriceCard>
                    ))}
                </PriceScroller>
            </PriceScrollContainer>
        </Container>
    )
}
