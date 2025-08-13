"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import Sidebar from "@/components/dashboard/SideBar"
import DashboardOverview from "@/components/dashboard/DashboardOverview"
import ProfileSection from "@/components/dashboard/ProfileSection"
import ProfileForm from "@/components/dashboard/Settings"
import NoDataAvailable from "./NoData"
import { mobile, ipad } from "@/responsive"
import { useAuthReady } from "@/hooks/useAuthReady"
import InProgressCourses from "@/components/course/InProgressCourses"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import IsLoading from "@/components/IsLoading"

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
// interface DashboardProps {
//     user: User
// }

const authorizedEmails = ["usmanbello@gmail.com"]

export default function Dashboard() {
    // setting active menu item defaults to dashboard
    const [activeItem, setActiveItem] = useState("dashboard")
    const { user, claims, firebaseUser, error, authReady, isLoadingUserDoc } = useAuthReady()
    const [isAuthorized, setIsAuthorized] = useState(false)

    const getInitials = (name: string): string => {
        const words = name.split(" ")
        return words.length > 1
            ? `${words[0][0]}${words[1][0]}`.toUpperCase()
            : `${words[0][0]}${words[0][1]}`.toUpperCase()
    }
    // const initials = getInitials(user.name)
    const initials = user && user.name ? getInitials(user.name) : ""
    const userData = user ? { name: user.name, initials: initials } : "GU"

    useEffect(() => {
        if (!authReady || isLoadingUserDoc) {
            return
        }

        // Handle the error state first
        if (error) {
            toast.error(error)
            redirect("/")
        }

        // Check for authorization based on custom claims and specific email
        const userEmail = user?.email || ""
        const isEmailAuthorized = authorizedEmails.includes(userEmail)
        const isClaimAuthorized = claims?.admin || claims?.instructor

        // console.log("The claims:...", claims)

        if (user && (isEmailAuthorized || isClaimAuthorized)) {
            setIsAuthorized(true)
        } else {
            // Not authorized, handle redirect and feedback
            setIsAuthorized(false)
            toast.error("You are not authorized to access this page.")
            redirect("/")
        }
    }, [user, claims, authReady, isLoadingUserDoc, error])

    if (!authReady || isLoadingUserDoc) {
        return <IsLoading />
    }
    if (!user) return <p>Please log in to view your dashboard.</p>
    if (!isAuthorized) {
        return <p>Checking authorization...</p>
    }

    return (
        <>
            <DashboardHeader user={userData} />
            {/* Dashboard Section Structure (Div Layout)*/}
            <DashboardContainer>
                {/* Sidebar (Navigation) */}
                <SidebarContainer>
                    <Sidebar
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        isAuthorized={isAuthorized}
                    />
                </SidebarContainer>
                {/* Main Content Area */}
                <ContentContainer>
                    {/* Dashboard Overview */}
                    {activeItem === "dashboard" && <DashboardOverview userData={user} />}
                    {activeItem === "profile" && <ProfileSection user={user} />}

                    {activeItem === "learning" && (
                        <>
                            <Title>My Learning</Title>
                            <InProgressCourses userData={user} />
                            {/* <NoDataAvailable comment="Comming Soon" /> */}
                        </>
                    )}
                    {activeItem === "certificate" && (
                        <>
                            <Title>My Certificates</Title>
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
                            <ProfileForm />
                        </>
                    )}
                </ContentContainer>
            </DashboardContainer>
        </>
    )
}
