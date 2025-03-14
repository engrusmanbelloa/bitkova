"use client"
import { useState } from "react"
import styled from "styled-components"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import Sidebar from "@/components/dashboard/SideBar"
import DashboardOverview from "@/components/dashboard/DashboardOverview"
import InProgressCourses from "@/components/course/InProgressCourses"
import ProfileSection from "@/components/dashboard/ProfileSection"
import NoDataAvailable from "./NoData"
import { User } from "@/userType"

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
    color: ${(props) => props.theme.palette.common.black};
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
    color: ${(props) => props.theme.palette.common.black};
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
interface Course {
    id: string
    title: string
    progress: number // Percentage (0-100)
    status: "completed" | "in-progress" | "archived" | "wishlist" | "cart"
}
interface UserProps {
    name: string
    enrolledCourses: Course[]
    completedCourses: Course[]
    archivedCourses: Course[]
}
export default function Dashboard({
    name,
    enrolledCourses,
    completedCourses,
    archivedCourses,
}: UserProps) {
    // setting active menu item defaults to dashboard
    const [activeItem, setActiveItem] = useState("dashboard")

    // { name: 'Usman Bello Abdullahi', initials: 'UB' }
    const getInitials = (name: string): string => {
        const words = name.split(" ")
        return words.length > 1
            ? `${words[0][0]}${words[1][0]}`.toUpperCase()
            : `${words[0][0]}${words[0][1]}`.toUpperCase()
    }

    const initials = getInitials(name)
    const userData = { name: name, initials: initials }
    return (
        <>
            <DashboardHeader user={userData} />
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
                                <DashboardOverview
                                    enrolledCourses={enrolledCourses}
                                    archivedCourses={archivedCourses}
                                    completedCourses={completedCourses}
                                />
                                <InProgressCourses />
                            </>
                        )}

                        {activeItem === "profile" && <ProfileSection />}
                        {activeItem === "courses" && (
                            <>
                                <Title>Enrolled Courses</Title>
                                <NoDataAvailable />
                            </>
                        )}
                        {activeItem === "wishlist" && (
                            <>
                                <Title>Wishlist</Title>
                                <NoDataAvailable />
                            </>
                        )}
                        {activeItem === "quiz" && (
                            <>
                                <Title>My Quiz Attempts</Title>
                                <NoDataAvailable />
                            </>
                        )}
                        {activeItem === "history" && (
                            <>
                                <Title>Order History</Title>
                                <NoDataAvailable />
                            </>
                        )}
                        {activeItem === "qa" && (
                            <>
                                <Title>Question & Answer</Title>
                                <NoDataAvailable />
                            </>
                        )}
                        {activeItem === "settings" && (
                            <>
                                <Title>Settings</Title>
                                <NoDataAvailable />
                            </>
                        )}
                    </div>
                </ContentContainer>
            </DashboardContainer>
        </>
    )
}
