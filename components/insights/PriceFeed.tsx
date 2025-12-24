"use client"

import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import { DUMMY_MARKET_DATA, MarketTicker } from "@/types/news"
import { mobile, ipad } from "@/responsive"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"

const BarContainer = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    box-sizing: border-box;
    margin: 0 auto 20px;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )};
    ${mobile(
        (props: any) => `
            width: ${props.theme.widths.mobileWidth};
        `,
    )};
`
const Title = styled.h3`
    text-align: center;
    margin-bottom: 5px;
    color: ${(props) => props.theme.palette.common.black};
`
const SubTitle = styled.p`
    text-align: center;
    color: ${(props) => props.theme.palette.common.black};
    margin: 10px;
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
    min-width: 200px;
    height: 150px;
    flex-shrink: 0;
`
const TickerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`
const SymbolTag = styled.span`
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 12px;
`
const Price = styled.h2`
    margin: 7px 0;
`
const Change = styled.div<{ $isPositive: boolean }>`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 7px;
    color: ${(props) => (props.$isPositive ? props.theme.mobile.green : props.theme.mobile.red)};
`
const TickerFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    color: ${(props) => props.theme.palette.common.white};
`
const PriceVolume = styled.p`
    font-size: 14px;
`
const MC = styled.p`
    font-size: 14px;
`
// Simple SVG visualization for the chart bar
const MiniChartSvg = styled.svg`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
    opacity: 0.3;
    fill: none;
    stroke: white;
    stroke-width: 1;
`

export default function PriceFeed() {
    return (
        <BarContainer>
            <Title>Current Market Prices</Title>
            <SubTitle>Live cryptocurrency market data</SubTitle>

            <Swiper
                slidesPerView={1.2}
                spaceBetween={15}
                freeMode={true}
                modules={[FreeMode]}
                breakpoints={{
                    640: { slidesPerView: 2.2 },
                    960: { slidesPerView: 4.2 },
                }}
                style={{ padding: "10px 5px" }}
            >
                {DUMMY_MARKET_DATA.map((ticker: MarketTicker) => (
                    <SwiperSlide key={ticker.id}>
                        <PriceCard>
                            <TickerHeader>
                                <span style={{ fontWeight: 600 }}>{ticker.name}</span>
                                <SymbolTag>{ticker.symbol}</SymbolTag>
                            </TickerHeader>
                            <Price>{ticker.price}</Price>
                            <Change $isPositive={ticker.isPositive}>
                                {ticker.isPositive ? (
                                    <TrendingUpIcon fontSize="small" />
                                ) : (
                                    <TrendingDownIcon fontSize="small" />
                                )}
                                <span style={{ marginLeft: 4 }}>{ticker.changeLabel}</span>
                            </Change>
                            <TickerFooter>
                                <PriceVolume>Vol: {ticker.volume}</PriceVolume>
                                <MC>MC: {ticker.mc}</MC>
                            </TickerFooter>

                            {/* Simple SVG Chart Visualization */}
                            <MiniChartSvg viewBox="0 0 60 40" preserveAspectRatio="none">
                                <path d={ticker.chartSvgPath} />
                            </MiniChartSvg>
                        </PriceCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </BarContainer>
    )
}
