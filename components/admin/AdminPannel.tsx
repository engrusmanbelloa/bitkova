"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import AdminHeader from "@/components/admin/AdminHeader"
import Sidebar from "@/components/admin/SideBar"
import DashboardOverview from "@/components/admin/DashboardOverview"
import ProfileSection from "@/components/admin/ProfileSection"
import ProfileForm from "@/components/admin/Settings"
import RoleManager from "@/components/auth/RoleManager"
import NoDataAvailable from "./NoData"
import IsLoading from "@/components/IsLoading"
import { mobile, ipad } from "@/responsive"
import { User } from "@/userType"
import UploadCourse from "@/components/admin/UploadCourse"
import { useAuthReady } from "@/hooks/useAuthReady"
import CircularProgress from "@mui/material/CircularProgress"
import { redirect } from "next/navigation"
import { toast } from "sonner"

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

const authorizedEmails = ["usmanbelloa@gmail.com"]

export default function Panel() {
    // setting active menu item defaults to panel
    const [activeItem, setActiveItem] = useState("panel")
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
            <AdminHeader user={userData} />
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
                    {activeItem === "panel" && <DashboardOverview user={user} />}
                    {activeItem === "performance" && <ProfileSection user={user} />}

                    {activeItem === "course" && (
                        <>
                            <Title>Upload Course</Title>
                            <UploadCourse />
                        </>
                    )}
                    {activeItem === "student" && (
                        <>
                            <Title>Add Student</Title>
                            <NoDataAvailable comment="Comming Soon" />
                        </>
                    )}
                    {activeItem === "instructor" && (
                        <>
                            <Title>Add Instructor</Title>
                            <RoleManager />
                        </>
                    )}
                    {activeItem === "history" && (
                        <>
                            <Title>Payment History</Title>
                            <NoDataAvailable comment="Comming Soon" />
                        </>
                    )}
                    {activeItem === "history" && (
                        <>
                            <Title>Order History</Title>
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
