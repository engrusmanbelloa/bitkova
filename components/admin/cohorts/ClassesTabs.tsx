import React, { useState } from "react"
import styled from "styled-components"
import CourseUploadForm from "@/components/admin/CourseUploadForm"
import CreateCohort from "@/components/admin/cohorts/CreateCohort"
import CreatePhysicalClass from "@/components/admin/cohorts/CreatePhysicalClass"
import CreateTelegramClass from "@/components/admin/cohorts/CreateTelegramClass"
import { mobile, ipad } from "@/responsive"

const Container = styled.div`
    max-width: 800px;
    margin: auto;
`
const Tab = styled.button<{ $isActive: boolean }>`
    background: none;
    border: none;
    padding: 12px 0;
    font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
    color: ${({ $isActive, theme }) => ($isActive ? theme.palette.primary.main : "#555")};
    border-bottom: ${({ $isActive }) => ($isActive ? "2px solid #3b82f6" : "none")};
    cursor: pointer;
    font-size: 16px;
`
const TabsWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 5px 50px;
    gap: 24px;
    background: ${(props) => props.theme.mobile.lightAsh};
    border-bottom: 1px solid #ddd;
    border-radius: 8px;
    ${ipad(
        (props: any) => `
    `,
    )};
    ${mobile(
        (props: any) => `
    `,
    )};
`

export default function ClassesTabs() {
    const [activeTab, setActiveTab] = useState<"cohort" | "physical" | "telegram">("cohort")

    return (
        <Container>
            <TabsWrapper>
                <Tab $isActive={activeTab === "cohort"} onClick={() => setActiveTab("cohort")}>
                    Create Cohort
                </Tab>
                <Tab $isActive={activeTab === "physical"} onClick={() => setActiveTab("physical")}>
                    Create Physical Class
                </Tab>
                <Tab $isActive={activeTab === "telegram"} onClick={() => setActiveTab("telegram")}>
                    Create Telegram Class
                </Tab>
            </TabsWrapper>
            {activeTab === "cohort" && <CreateCohort />}
            {activeTab === "physical" && <CreatePhysicalClass />}
            {activeTab === "telegram" && <CreateTelegramClass />}
        </Container>
    )
}
