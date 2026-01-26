import styled from "styled-components"
import { Group, ContentCopy } from "@mui/icons-material"

const CardContainer = styled.div`
    border-radius: 8px;
    margin: 10px 0px 40px;
    padding: 20px 10px;
    box-shadow: 0 10px 10px ${(props) => props.theme.mobile.offWhite};
`
const TitleSection = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`
const StyledGroupIcon = styled(Group)`
    color: ${(props) => props.theme.palette.primary.main};
    font-size: 32px !important;
    margin-right: 12px;
`
const TitleText = styled.h2`
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => props.theme.palette.common.black};
    margin: 0;
`
const Description = styled.p`
    font-size: 16px;
    color: ${(props) => props.theme.palette.common.black};
    margin: 0 0 24px 0;
`
const CodeSection = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
    align-items: center;
`
const CodeBox = styled.div`
    flex: 1;
    border: 2px dashed ${(props) => props.theme.mobile.offWhite};
    background-color: ${(props) => props.theme.palette.common.white};
    padding: 8px 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CodeText = styled.span`
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => props.theme.palette.primary.main};
    letter-spacing: 1px;
`
const ApplyButton = styled.button`
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.common.white};
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.palette.primary.main};
    }
`
const StatsContainer = styled.div`
    display: flex;
    gap: 16px;
`
const StatBox = styled.div<{ $bgColor?: string }>`
    flex: 1;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    background-color: ${(props) => props.$bgColor};
    text-align: center;
`
const StatLabel = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.theme.palette.common.black};
`
const StatValue = styled.div<{ $textColor?: string }>`
    font-size: 28px;
    font-weight: 700;
    color: ${(props) => props.$textColor};
    margin-top: 8px;
`

export default function RefCodeSection() {
    return (
        <CardContainer>
            <TitleSection>
                <StyledGroupIcon />
                <TitleText>Your Referral Code</TitleText>
            </TitleSection>
            <Description>Share this code with friends and earn rewards</Description>

            <CodeSection>
                <CodeBox>
                    <CodeText>COURSE2025XYZ</CodeText>
                </CodeBox>
                <ApplyButton>
                    <ContentCopy sx={{ marginRight: "8px", fontSize: "20px" }} />
                    Apply
                </ApplyButton>
            </CodeSection>

            <StatsContainer>
                <StatBox $bgColor="#E3F2FD">
                    <StatLabel>Total Referrals</StatLabel>
                    <StatValue $textColor="#1976d2">24</StatValue>
                </StatBox>
                <StatBox $bgColor="#E8F5E9">
                    <StatLabel>This Week</StatLabel>
                    <StatValue $textColor="#388E3C">7</StatValue>
                </StatBox>
            </StatsContainer>
        </CardContainer>
    )
}
