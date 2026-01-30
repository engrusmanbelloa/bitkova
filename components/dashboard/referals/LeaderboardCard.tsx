import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { EmojiEvents, CardMembership, TrendingUp, MilitaryTech } from "@mui/icons-material"
import { Skeleton } from "@mui/material"
import { useReferralLeaderboard } from "@/hooks/referrals/useReferralLeaderboard"
import { trimName } from "@/config/nameTrim"

const Card = styled.div`
    border-radius: 8px;
    margin: 10px 0px 40px;
    padding: 20px 10px;
    box-shadow: 0 10px 10px ${(props) => props.theme.mobile.offWhite};
`
const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
`
const Title = styled.h2`
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: ${(props) => props.theme.palette.common.black};
`
const Subtitle = styled.p`
    margin: 0 0 24px 0;
    color: ${(props) => props.theme.palette.common.black};
    font-size: 16px;
`
const ReferrerList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
`
const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`
const RankCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => props.color || "#9e9e9e"};
    color: ${(props) => props.theme.palette.common.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
`
const Name = styled.span`
    font-weight: 600;
    color: ${(props) => props.theme.palette.common.black};
`
const ScoreSection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`
const Score = styled.span`
    font-weight: 700;
    font-size: 16px;
    min-width: 25px;
    text-align: right;
`
const PrizeBox = styled.div`
    background: #ffebe0;
    border: 1px solid #ffab91;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
`
const LeaderboardSkeleton = () => {
    return (
        <Card>
            <Header>
                {/* Icon and Title Skeleton */}
                <Skeleton variant="circular" width={32} height={32} animation="wave" />
                <Skeleton variant="text" width="120px" height={32} animation="wave" />
            </Header>

            <Subtitle>
                <Skeleton variant="text" width="180px" animation="wave" />
            </Subtitle>

            <ReferrerList>
                {/* We generate 5 skeleton rows to simulate the list */}
                {[...Array(5)].map((_, index) => (
                    <Row key={index}>
                        <UserInfo>
                            {/* The Rank Circle Skeleton */}
                            <Skeleton variant="circular" width={32} height={32} animation="wave" />
                            {/* The Name Skeleton */}
                            <Skeleton variant="text" width="100px" height={24} animation="wave" />
                        </UserInfo>

                        <ScoreSection>
                            {/* The Score Skeleton */}
                            <Skeleton variant="text" width="30px" height={24} animation="wave" />
                        </ScoreSection>
                    </Row>
                ))}
            </ReferrerList>

            {/* The Prize Box Skeleton */}
            <Skeleton variant="rounded" height={55} animation="wave" sx={{ borderRadius: "8px" }} />
        </Card>
    )
}

function getRankDecoration(rank: number) {
    if (rank === 1) {
        return {
            color: "#f39c12",
            icon: <EmojiEvents sx={{ color: "#f39c12", fontSize: 20 }} />,
        }
    }

    if (rank === 2) {
        return {
            color: "#34495e",
            icon: <MilitaryTech sx={{ color: "#2196f3", fontSize: 20 }} />,
        }
    }

    if (rank === 3) {
        return {
            color: "#7d6608",
            icon: <MilitaryTech sx={{ color: "#ff9800", fontSize: 20 }} />,
        }
    }

    return {
        color: "#7f8c8d",
        icon: null,
    }
}

export default function LeaderboardCard() {
    const { data, isLoading, error } = useReferralLeaderboard()

    // const data = [
    //     {
    //         rank: 1,
    //         name: "Sarah M.",
    //         score: 45,
    //         color: "#f39c12",
    //         icon: <EmojiEvents sx={{ color: "#f39c12", fontSize: 20 }} />,
    //     },
    //     {
    //         rank: 2,
    //         name: "James K.",
    //         score: 38,
    //         color: "#34495e",
    //         icon: <MilitaryTech sx={{ color: "#2196f3", fontSize: 20 }} />,
    //     },
    //     {
    //         rank: 3,
    //         name: "Allec T.",
    //         score: 32,
    //         color: "#f39c12",
    //         icon: <MilitaryTech sx={{ color: "#2196f3", fontSize: 20 }} />,
    //     },
    //     { rank: 4, name: "Auwal rabiu", score: 28, color: "#7f8c8d" },
    //     { rank: 5, name: "Nafisa Garba", score: 21, color: "#7f8c8d" },
    //     { rank: 6, name: "Umar Sani", score: 18, color: "#7f8c8d" },
    //     { rank: 7, name: "Aliyu Jamo", score: 11, color: "#7f8c8d" },
    // ]

    if (isLoading) return <LeaderboardSkeleton />
    if (!data)
        return (
            <Card>
                <Subtitle>Referrals not available</Subtitle>
            </Card>
        )

    return (
        <Card>
            <Header>
                <CardMembership sx={{ color: "#2196f3", fontSize: 32 }} />
                <Title>leaderboard</Title>
            </Header>
            {/* <Subtitle>Top referrers this week</Subtitle> */}
            {data.length === 0 ? (
                <Subtitle>No referrals yet this week</Subtitle>
            ) : (
                <Subtitle>Top referrers this week</Subtitle>
            )}

            <ReferrerList>
                {data.map((item) => {
                    const decoration = getRankDecoration(item.rank)

                    return (
                        <Row key={item.rank}>
                            <UserInfo>
                                <RankCircle color={decoration.color}>{item.rank}</RankCircle>
                                {decoration.icon}
                                <Name>{trimName(item.name)}</Name>
                                {/* <Name>{item.name}</Name> */}
                            </UserInfo>

                            <ScoreSection>
                                <TrendingUp sx={{ color: "#4caf50", fontSize: 20 }} />
                                <Score>{item.score}</Score>
                            </ScoreSection>
                        </Row>
                    )
                })}
            </ReferrerList>

            <PrizeBox>
                Weekly Prize:{" "}
                <span style={{ fontWeight: 400 }}>Top 3 referrers win exclusive bonuses!</span>
            </PrizeBox>
        </Card>
    )
}
