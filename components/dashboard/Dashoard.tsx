"use client"
import { useState } from "react"
import styled from "styled-components"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import Sidebar from "@/components/dashboard/SideBar"

const DashboardContainer = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    display: flex;
    flex-direction: row;
    margin: 5px auto 10px;
    padding: 20px auto;
    border-top: 1px solid ${(props) => props.theme.mobile.offWhite};
`
const SidebarContainer = styled.div`
    flex: 1;
    padding: 20px 0px 5px;
    margin: 0px;
    border-right: 1px solid ${(props) => props.theme.mobile.offWhite};
`
const ContentContainer = styled.div`
    flex: 3;
`

export default function Dashboard(props: any) {
    const [activeItem, setActiveItem] = useState("dashboard")
    const users = [
        { name: "Usman Bello Abdullahi", initials: "UB" },
        { name: "Mahmoud Sardauna", initials: "MS" },
        { name: "Aisha Yusuf", initials: "AY" },
    ]

    const user = users[0]
    return (
        <>
            <DashboardHeader user={user} />
            {/* Dashboard Section Structure (Div Layout)*/}
            <DashboardContainer>
                {/* Sidebar (Navigation) */}
                <SidebarContainer>
                    <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
                </SidebarContainer>
                {/* Main Content Area */}
                <ContentContainer>
                    <div className="main-content">
                        {/* Profile Setup Prompt */}
                        <div className="profile-setup">
                            <h1>Setup profile</h1>
                        </div>
                        {/* Dashboard Overview */}
                        {activeItem === "dashboard" && <h1>Dashboard Overview</h1>}
                        {activeItem === "profile" && <h1>Profile Section</h1>}
                        {activeItem === "courses" && <h1>Enrolled Courses</h1>}
                        {activeItem === "wishlist" && <h1>Wishlist</h1>}
                        {activeItem === "quiz" && <h1>My Quiz Attempts</h1>}
                        {activeItem === "history" && <h1>Order History</h1>}
                        {activeItem === "qa" && <h1>Question & Answer</h1>}
                        {activeItem === "settings" && <h1>Settings</h1>}
                        {/* Dashboard Overview */}
                        {/* <div className="dashboard-overview">
                            <div className="enrolled-courses">
                                <h1>enrolled-courses</h1>{" "}
                            </div>
                            <div className="active-courses">
                                <h1>active-courses</h1>
                            </div>
                            <div className="completed-courses">
                                <h1>completed-courses</h1>
                            </div>
                        </div> */}
                        {/* In-Progress Courses Section */}
                        {/* <div className="in-progress-courses">
                            <h1>In progress Courses</h1>
                        </div> */}
                    </div>
                </ContentContainer>
            </DashboardContainer>
        </>
    )
}
