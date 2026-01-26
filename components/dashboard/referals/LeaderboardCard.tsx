import React from "react"
import styled from "styled-components"
import { EmojiEvents, CardMembership, TrendingUp, MilitaryTech } from "@mui/icons-material"

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

export default function LeaderboardCard() {
    const data = [
        {
            rank: 1,
            name: "Sarah M.",
            score: 45,
            color: "#f39c12",
            icon: <EmojiEvents sx={{ color: "#f39c12", fontSize: 20 }} />,
        },
        {
            rank: 2,
            name: "James K.",
            score: 38,
            color: "#34495e",
            icon: <MilitaryTech sx={{ color: "#2196f3", fontSize: 20 }} />,
        },
        {
            rank: 3,
            name: "Allec T.",
            score: 32,
            color: "#f39c12",
            icon: <MilitaryTech sx={{ color: "#2196f3", fontSize: 20 }} />,
        },
        { rank: 4, name: "Auwal rabiu", score: 28, color: "#7f8c8d" },
        { rank: 5, name: "Nafisa Garba", score: 21, color: "#7f8c8d" },
        { rank: 6, name: "Umar Sani", score: 18, color: "#7f8c8d" },
        { rank: 7, name: "Aliyu Jamo", score: 11, color: "#7f8c8d" },
    ]
    return (
        <Card>
            <Header>
                <CardMembership sx={{ color: "#2196f3", fontSize: 32 }} />
                <Title>Your Referral Code</Title>
            </Header>
            <Subtitle>Top referrers this week</Subtitle>

            <ReferrerList>
                {data.map((item) => (
                    <Row key={item.rank}>
                        <UserInfo>
                            <RankCircle color={item.color}>{item.rank}</RankCircle>
                            {item.icon}
                            <Name>{item.name}</Name>
                        </UserInfo>
                        <ScoreSection>
                            <TrendingUp sx={{ color: "#4caf50", fontSize: 20 }} />
                            <Score>{item.score}</Score>
                        </ScoreSection>
                    </Row>
                ))}
            </ReferrerList>

            <PrizeBox>
                Weekly Prize:{" "}
                <span style={{ fontWeight: 400 }}>
                    Top 3 referrers win exclusive course bonuses!
                </span>
            </PrizeBox>
        </Card>
    )
}
