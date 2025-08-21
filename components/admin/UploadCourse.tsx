import React, { useState } from "react"
import styled from "styled-components"
import CourseUploadForm from "@/components/admin/CourseUploadForm"

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
    display: flex;
    gap: 24px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
`

export default function UploadCourse() {
    const [activeTab, setActiveTab] = useState<"upload" | "update">("upload")

    return (
        <Container>
            <TabsWrapper>
                <Tab $isActive={activeTab === "upload"} onClick={() => setActiveTab("upload")}>
                    Upload
                </Tab>
                <Tab $isActive={activeTab === "update"} onClick={() => setActiveTab("update")}>
                    Update
                </Tab>
            </TabsWrapper>
            {activeTab === "upload" && <CourseUploadForm />}
        </Container>
    )
}
