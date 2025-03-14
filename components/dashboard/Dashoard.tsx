"use client"
import { useState } from "react"
import styled from "styled-components"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import Sidebar from "@/components/dashboard/SideBar"
import DashboardOverview from "@/components/dashboard/DashboardOverview"
import InProgressCourses from "@/components/course/InProgressCourses"
import ProfileSection from "@/components/dashboard/ProfileSection"

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
    padding: 0 0 20px 20px;
`
const Title = styled.h3`
    font-weight: 500;
    color: #333;
`
const ProfileSetupContainer = styled.div`
    padding: 2px 20px;
    height: 50px;
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
`
const Text = styled.p`
    font-weight: 500;
    color: #333;
`
const Button = styled.button`
    background: ${(props) => props.theme.mobile.offWhite};
    color: ${(props) => props.theme.palette.primary.main};
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;

    &:hover {
        background: ${(props) => props.theme.mobile.horizontalrule};
    }
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
                        {/* Dashboard Overview */}
                        {activeItem === "dashboard" && (
                            <>
                                {/* Profile Setup Prompt */}
                                <ProfileSetupContainer>
                                    <Text>Set Your Profile</Text>
                                    <Button>Click Here</Button>
                                </ProfileSetupContainer>
                                <Title>Dashboard</Title>
                                <DashboardOverview />
                                <InProgressCourses />
                            </>
                        )}

                        {activeItem === "profile" && (
                            <>
                                <h3>Profile Section</h3>
                                <ProfileSection />
                            </>
                        )}
                        {activeItem === "courses" && <h3>Enrolled Courses</h3>}
                        {activeItem === "wishlist" && <h3>Wishlist</h3>}
                        {activeItem === "quiz" && <h3>My Quiz Attempts</h3>}
                        {activeItem === "history" && <h3>Order History</h3>}
                        {activeItem === "qa" && <h3>Question & Answer</h3>}
                        {activeItem === "settings" && <h3>Settings</h3>}
                    </div>
                </ContentContainer>
            </DashboardContainer>
        </>
    )
}
