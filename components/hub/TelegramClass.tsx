// components/hub/TelegramClass.tsx
import React from "react"
import styled from "styled-components"
import EnrollButton from "@/components/EnrollButton"
import TelegramIcon from "@mui/icons-material/Telegram"
import PeopleIcon from "@mui/icons-material/People"
import BlindsClosedIcon from "@mui/icons-material/BlindsClosed"
import EventBusyIcon from "@mui/icons-material/EventBusy"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CircularProgress from "@mui/material/CircularProgress"
import { mobile, ipad } from "@/responsive"
import { useRouter } from "next/navigation"
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
const InfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 5px 0;
    color: ${(props) => props.theme.palette.common.black};
    font-size: 14px;

    svg {
        font-size: 18px;
        color: ${(props) => props.theme.palette.primary.main};
    }
`
const Schedule = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 10px 0;
    color: ${(props) => props.theme.palette.common.black};

    svg {
        font-size: 18px;
        color: ${(props) => props.theme.palette.primary.main};
    }
    ${ipad(
        (props: any) => `
                width: ${props.theme.widths.ipadWidth};
                flex-direction: column;
                align-items: flex-start;
            `,
    )}
    ${mobile(
        (props: any) => `
                width: ${props.theme.widths.mobileWidth};
            `,
    )}
`
const ScheduleTitle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    color: ${(props) => props.theme.palette.primary.main};
    padding: 0;
    margin: 0;
`
const PriceTag = styled.div`
    color: ${(props) => props.theme.mobile.green};
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
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
        <ClassContainer>
            <ClassesCard>
                <ClassesTitle>
                    <TelegramIcon sx={{ fontSize: 28 }} />
                    Telegram Online Classes
                </ClassesTitle>

                <CohortBadge>{cohort.name}</CohortBadge>

                <PriceTag>₦ {telegramClass.price.toLocaleString()}</PriceTag>

                <InfoRow>
                    <PeopleIcon />
                    <span>
                        {telegramClass.enrolled}/{telegramClass.capacity} enrolled
                    </span>
                </InfoRow>
                <InfoRow>
                    <CalendarMonthIcon /> Classes Start:
                    <span>{new Date(cohort.startDate).toLocaleDateString()} </span>
                </InfoRow>
                <InfoRow>
                    <EventBusyIcon /> Classes End:
                    <span>{new Date(cohort.endDate).toLocaleDateString()}</span>
                </InfoRow>
                <InfoRow>
                    <BlindsClosedIcon /> Registration Closes:
                    <span>{new Date(cohort.registrationClose).toLocaleDateString()}</span>
                </InfoRow>
                <Schedule>
                    <ScheduleTitle>
                        <AccessTimeIcon /> Schedule:
                    </ScheduleTitle>
                    {telegramClass?.schedule?.slots ? (
                        telegramClass.schedule.slots.map((slot, index) => (
                            <InfoRow key={index}>
                                <span>
                                    {slot.days.join(", ")} | <strong>{slot.time}</strong>
                                </span>
                            </InfoRow>
                        ))
                    ) : (
                        <InfoRow>
                            <AccessTimeIcon />
                            <span>TBA (To be announced)</span>
                        </InfoRow>
                    )}
                </Schedule>

                {daysUntilClose <= 7 && !isEnrolled && (
                    <EnrollmentInfo>
                        ⚠️ Only {daysUntilClose} day{daysUntilClose !== 1 ? "s" : ""} left to
                        enroll!
                    </EnrollmentInfo>
                )}

                <EnrollButton
                    variant="contained"
                    disabled={isEnrolled || isFull}
                    onClick={() => router.push(`/pay/telegram/${cohort.id}`)}
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
