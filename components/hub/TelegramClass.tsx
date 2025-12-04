import React from "react"
import styled from "styled-components"
import { Container } from "@mui/material"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import EnrollButton from "@/components/EnrollButton"
import { mobile, ipad } from "@/responsive"

const ClassContainer = styled.div`
    max-width: ${(props) => props.theme.widths.heroWidth};
    background-color: ${(props) => props.theme.mobile.offWhite};
    border-radius: 8px;
    margin: 0 auto 30px;
    padding: 50px;
    box-sizing: border-box;
    ${ipad(
        (props: any) => `
               padding: 30px;
               width: ${props.theme.widths.ipadWidth};
           `,
    )}
    ${mobile(
        (props: any) => `
               padding: 5px;
               width: ${props.theme.widths.mobileWidth};
           `,
    )};
`
const ClassesCard = styled.div`
    width: 90%;
    margin: 0 auto;
    border-radius: 8px;
    padding: 40px;
    box-sizing: border-box;
    background: ${(props) => props.theme.palette.common.white};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    ${ipad(
        (props: any) => `
               padding: 10px;
           `,
    )}
    ${mobile(
        (props: any) => `
           `,
    )}
`
const ClassesTitle = styled.h3`
    color: ${(props) => props.theme.palette.primary.main};
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
`
const PriceTag = styled.div`
    color: ${(props) => props.theme.mobile.green};
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
`
const DateInfo = styled.div`
    color: #666;
    font-size: 14px;
    margin-bottom: 24px;
`
const CourseModules = styled.div`
    margin-bottom: 24px;
`
const ModuleTitle = styled.h4`
    color: ${(props) => props.theme.palette.common.black};
    margin-bottom: 12px;
`
const ModuleList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`
const ModuleItem = styled.li`
    color: #666;
    font-size: 14px;
    padding: 6px 0;
    padding-left: 20px;
    position: relative;

    &:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: ${(props) => props.theme.mobile.green};
        font-weight: 600;
    }
`

export default function TelegramClass() {
    return (
        <ClassContainer>
            <ClassesCard>
                <ClassesTitle>💬 Telegram Online Classes</ClassesTitle>

                <PriceTag>₦ 25,000</PriceTag>
                <DateInfo>
                    📅 December 25, 2025
                    <br />
                    📅 New Intake closes 29, 2026
                </DateInfo>

                <CourseModules>
                    <ModuleTitle>Course Modules:</ModuleTitle>
                    <ModuleList>
                        <ModuleItem>Beginner Trading</ModuleItem>
                        <ModuleItem>Technical Analysis</ModuleItem>
                        <ModuleItem>Risk Management</ModuleItem>
                    </ModuleList>
                </CourseModules>
                <EnrollButton variant="contained">Join Telegram Class</EnrollButton>
                {/* <JoinButton>Join Telegram Class</JoinButton> */}
            </ClassesCard>
        </ClassContainer>
    )
}
