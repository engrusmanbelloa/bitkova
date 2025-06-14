"use client"
import { useState } from "react"
import styled from "styled-components"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import Sidebar from "@/components/dashboard/SideBar"
import DashboardOverview from "@/components/dashboard/DashboardOverview"
import ProfileSection from "@/components/dashboard/ProfileSection"
import NoDataAvailable from "./NoData"
import { mobile, ipad } from "@/responsive"
import { User } from "@/userType"

const DashboardContainer = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    display: flex;
    flex-direction: row;
    margin: 5px auto 10px;
    padding: 20px auto;
    border-top: 1px solid ${(props) => props.theme.mobile.offWhite};
    ${mobile(
        (props: any) => `
                flex-direction: column;
                width: ${props.theme.widths.mobileWidth};
                border: none;
                padding: 0px auto;
                margin: 0px auto 10px;
            `,
    )}
`
const SidebarContainer = styled.div`
    flex: 1;
    padding: 20px 0px 5px;
    margin: 0px;
    border-right: 1px solid ${(props) => props.theme.mobile.offWhite};
    ${mobile(
        (props: any) => `
                border: none;
                padding: 0;
            `,
    )}
`
const ContentContainer = styled.div`
    flex: 3;
    padding: 0 0 20px 20px;
    ${mobile(
        (props: any) => `
                padding: 0;
            `,
    )}
`
const Title = styled.h3`
    font-weight: 500;
    color: ${(props) => props.theme.palette.common.black};
`
interface DashboardProps {
    user: User
}

export default function Dashboard({ user }: DashboardProps) {
    // setting active menu item defaults to dashboard
    const [activeItem, setActiveItem] = useState("dashboard")

    // { name: 'Usman Bello Abdullahi', initials: 'UB' }
    const getInitials = (name: string): string => {
        const words = name.split(" ")
        return words.length > 1
            ? `${words[0][0]}${words[1][0]}`.toUpperCase()
            : `${words[0][0]}${words[0][1]}`.toUpperCase()
    }

    const initials = getInitials(user.name)
    const userData = { name: user.name, initials: initials }
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
                    {/* Dashboard Overview */}
                    {activeItem === "dashboard" && <DashboardOverview user={user} />}
                    {activeItem === "profile" && <ProfileSection user={user} />}

                    {activeItem === "courses" && (
                        <>
                            <Title>My Learning</Title>
                            <NoDataAvailable comment="Comming Soon" />
                        </>
                    )}
                    {activeItem === "wishlist" && (
                        <>
                            <Title>Wishlist</Title>
                            <NoDataAvailable comment="Comming Soon" />
                        </>
                    )}
                    {activeItem === "quiz" && (
                        <>
                            <Title>My Quiz Attempts</Title>
                            <NoDataAvailable comment="Comming Soon" />
                        </>
                    )}
                    {activeItem === "history" && (
                        <>
                            <Title>Order History</Title>
                            <NoDataAvailable comment="Comming Soon" />
                        </>
                    )}
                    {activeItem === "qa" && (
                        <>
                            <Title>Question & Answer</Title>
                            <NoDataAvailable comment="Comming Soon" />
                        </>
                    )}
                    {activeItem === "RedeemIcon" && (
                        <>
                            <Title>Referal Reward</Title>
                            <NoDataAvailable comment="Comming Soon" />
                        </>
                    )}
                    {activeItem === "settings" && (
                        <>
                            <Title>Settings</Title>
                            <NoDataAvailable comment="Comming Soon" />
                        </>
                    )}
                </ContentContainer>
            </DashboardContainer>
        </>
    )
}
