"use client"
import styled from "styled-components"
import SchoolIcon from "@mui/icons-material/School"
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"

const OverviewContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
`
const OverviewBox = styled.div`
    flex: 1;
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`
const IconWrapper = styled.div`
    font-size: 40px;
    color: ${({ color }) => color || "#333"};
    margin-bottom: 10px;
`
const Count = styled.h2`
    font-size: 24px;
    margin: 0;
`
const Label = styled.p`
    font-size: 16px;
    color: #555;
`

export default function DashboardOverview() {
    return (
        <OverviewContainer>
            <OverviewBox>
                <IconWrapper color="#3b82f6">
                    <SchoolIcon fontSize="large" />
                </IconWrapper>
                <Count>2</Count>
                <Label>Enrolled Courses</Label>
            </OverviewBox>

            <OverviewBox>
                <IconWrapper color="#10b981">
                    <PlayCircleFilledIcon fontSize="large" />
                </IconWrapper>
                <Count>2</Count>
                <Label>Active Courses</Label>
            </OverviewBox>

            <OverviewBox>
                <IconWrapper color="#f59e0b">
                    <EmojiEventsIcon fontSize="large" />
                </IconWrapper>
                <Count>0</Count>
                <Label>Completed Courses</Label>
            </OverviewBox>
        </OverviewContainer>
    )
}
