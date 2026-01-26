import React from "react"
import styled from "styled-components"
import { Campaign, VerifiedUser, Paid } from "@mui/icons-material"

const StepsContainer = styled.div`
    border-radius: 8px;
    margin: 10px 0px 40px;
    padding: 20px 10px;
    box-shadow: 0 10px 10px ${(props) => props.theme.mobile.offWhite};
    display: flex;
    flex-direction: column;
    gap: 48px;
`
const Step = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`
const IconCircle = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${(props) => props.theme.mobile.lightAsh};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`
const StepTitle = styled.h3`
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => props.theme.palette.common.black};
`
const StepText = styled.p`
    margin: 0;
    font-size: 15px;
    color: ${(props) => props.theme.mobile.gray};
    line-height: 1.4;
`

export default function ReferralSteps() {
    return (
        <StepsContainer>
            <Step>
                <IconCircle>
                    <Campaign sx={{ color: "#f44336", fontSize: 40 }} />
                </IconCircle>
                <StepTitle>1. Share Your Code</StepTitle>
                <StepText>Send your unique referral code to friends</StepText>
            </Step>

            <Step>
                <IconCircle>
                    <VerifiedUser sx={{ color: "#2196f3", fontSize: 40 }} />
                </IconCircle>
                <StepTitle>2. They Signup</StepTitle>
                <StepText>Your friend uses your code as his upline</StepText>
            </Step>

            <Step>
                <IconCircle>
                    <Paid sx={{ color: "#ff5722", fontSize: 40 }} />
                </IconCircle>
                <StepTitle>3. Earn Rewards</StepTitle>
                <StepText>Get 5XPs for each successful referral</StepText>
            </Step>
        </StepsContainer>
    )
}
