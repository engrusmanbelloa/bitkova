import React from "react"
import styled from "styled-components"
import { Container } from "@mui/material"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import EnrollButton from "@/components/EnrollButton"
import TelegramIcon from "@mui/icons-material/Telegram"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import { mobile, ipad } from "@/responsive"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { TelegramClass as TelegramClassType, Cohort } from "@/types/classTypes"
import { useUserStore } from "@/lib/store/useUserStore"
import { useFetchActiveCohort } from "@/hooks/classes/useFetchCohorts"
import { useFetchTelegramClass } from "@/hooks/classes/useFetchTelegramClass"

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
const CohortBadge = styled.div`
    display: inline-block;
    padding: 6px 14px;
    background: ${(props) => props.theme.palette.primary.main};
    color: white;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
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
const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 40px;
`
const ErrorMessage = styled.div`
    padding: 20px;
    text-align: center;
    color: #ef4444;
`
const EnrollmentInfo = styled.div`
    padding: 12px;
    background: #fef3c7;
    border-radius: 6px;
    color: #92400e;
    font-size: 14px;
    margin-bottom: 16px;
    text-align: center;
`

export default function TelegramClass() {
    const router = useRouter()
    const { isEnrolledInClass } = useUserStore()

    // Fetch active cohort
    const { data: cohort, isLoading: cohortLoading, error: cohortError } = useFetchActiveCohort()

    const {
        data: telegramClass,
        isLoading: classesLoading,
        error: classesError,
    } = useFetchTelegramClass(cohort?.id)

    if (cohortLoading || classesLoading) {
        return (
            <ClassContainer>
                <ClassesCard>
                    <LoadingContainer>
                        <CircularProgress />
                    </LoadingContainer>
                </ClassesCard>
            </ClassContainer>
        )
    }

    if (!cohort || !telegramClass) {
        return (
            <ClassContainer>
                <ClassesCard>
                    <ErrorMessage>
                        No active Telegram class available. Check back soon!
                    </ErrorMessage>
                </ClassesCard>
            </ClassContainer>
        )
    }

    const isEnrolled = isEnrolledInClass(telegramClass.id)
    const isFull = telegramClass.enrolled >= telegramClass.capacity
    const daysUntilClose = Math.ceil(
        (new Date(cohort.registrationClose).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24),
    )

    return (
        // <ClassContainer>
        //     <ClassesCard>
        //         <ClassesTitle>💬 Telegram Online Classes</ClassesTitle>

        //         <PriceTag>₦ 25,000</PriceTag>
        //         <DateInfo>
        //             📅 December 25, 2025
        //             <br />
        //             📅 New Intake closes 29, 2026
        //         </DateInfo>

        //         <CourseModules>
        //             <ModuleTitle>Course Modules:</ModuleTitle>
        //             <ModuleList>
        //                 <ModuleItem>Beginner Trading</ModuleItem>
        //                 <ModuleItem>Technical Analysis</ModuleItem>
        //                 <ModuleItem>Risk Management</ModuleItem>
        //             </ModuleList>
        //         </CourseModules>
        //         <EnrollButton variant="contained">Join Telegram Class</EnrollButton>
        //         {/* <JoinButton>Join Telegram Class</JoinButton> */}
        //     </ClassesCard>
        // </ClassContainer>
        <ClassContainer>
            <ClassesCard>
                <ClassesTitle>
                    <TelegramIcon sx={{ fontSize: 28 }} />
                    Telegram Online Classes
                </ClassesTitle>

                <CohortBadge>{cohort.name}</CohortBadge>

                <PriceTag>₦ {telegramClass.price.toLocaleString()}</PriceTag>

                <DateInfo>
                    📅 Classes Start: {new Date(cohort.startDate).toLocaleDateString()}
                    <br />
                    📅 Classes End: {new Date(cohort.endDate).toLocaleDateString()}
                    <br />⏰ Registration Closes:{" "}
                    {new Date(cohort.registrationClose).toLocaleDateString()}
                </DateInfo>

                {daysUntilClose <= 7 && !isEnrolled && (
                    <EnrollmentInfo>
                        ⚠️ Only {daysUntilClose} day{daysUntilClose !== 1 ? "s" : ""} left to
                        enroll!
                    </EnrollmentInfo>
                )}

                <CourseModules>
                    <ModuleTitle>Course Modules:</ModuleTitle>
                    <ModuleList>
                        {telegramClass.modules.map((module, idx) => (
                            <ModuleItem key={idx}>{module}</ModuleItem>
                        ))}
                    </ModuleList>
                </CourseModules>

                <DateInfo style={{ marginTop: 20, marginBottom: 16 }}>
                    👥 {telegramClass.enrolled}/{telegramClass.capacity} enrolled
                </DateInfo>

                <EnrollButton
                    variant="contained"
                    disabled={isEnrolled || isFull}
                    onClick={() => router.push(`/pay/telegram-classes/${cohort.id}`)}
                >
                    <TelegramIcon />
                    {isEnrolled
                        ? "Already Enrolled"
                        : isFull
                          ? "Class Full"
                          : "Join Telegram Class"}
                </EnrollButton>
            </ClassesCard>
        </ClassContainer>
    )
}
