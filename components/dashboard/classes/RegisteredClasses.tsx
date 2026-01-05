// components/classes/RegisteredClasses.tsx
"use client"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import CircularProgress from "@mui/material/CircularProgress"
import { useUserStore } from "@/lib/store/useUserStore"
import { useAuthReady } from "@/hooks/useAuthReady"
import { useFetchCohorts } from "@/hooks/classes/useFetchCohorts"
import PhysicalClassCard from "@/components/dashboard/classes/PhysicalClassCard"
import TelegramClassCard from "@/components/dashboard/classes/TelegramClassCard"
import { mobile } from "@/responsive"
import { User } from "@/types/userType"
import NoDataAvailable from "@/components/dashboard/NoData"

const Container = styled.div`
    margin-top: 30px;
    ${mobile(`
        width: 100%;
    `)}
`
const Title = styled.h3`
    margin-bottom: 20px;
    color: ${(props) => props.theme.palette.common.black};
`
const ClassList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

interface RegisteredClassesProps {
    userData: User
    limit?: number
}

export default function RegisteredClasses({ userData, limit }: RegisteredClassesProps) {
    const router = useRouter()
    const { user, authReady } = useAuthReady()
    const { enrollments } = useUserStore()
    const { data: cohorts, isLoading: cohortsLoading } = useFetchCohorts()

    if (!authReady || cohortsLoading) return <CircularProgress />
    if (!user) return <p>Please log in to view your classes.</p>

    // Filter class enrollments
    const physicalEnrollments = enrollments.filter((e) => e.itemType === "physical_class")
    const telegramEnrollments = enrollments.filter((e) => e.itemType === "telegram_class")

    const totalClassEnrollments = physicalEnrollments.length + telegramEnrollments.length

    return (
        <Container>
            <Title>My Registered Classes</Title>
            <ClassList>
                {/* Physical Classes */}
                {physicalEnrollments.slice(0, limit).map((enrollment) => (
                    <PhysicalClassCard
                        key={enrollment.id}
                        enrollment={enrollment}
                        cohorts={cohorts}
                    />
                ))}

                {/* Telegram Classes */}
                {telegramEnrollments.slice(0, limit).map((enrollment) => (
                    <TelegramClassCard
                        key={enrollment.id}
                        enrollment={enrollment}
                        cohorts={cohorts}
                    />
                ))}

                {totalClassEnrollments === 0 && (
                    <NoDataAvailable
                        comment={`${user.name}, you haven't registered for any classes yet`}
                    />
                )}
            </ClassList>
        </Container>
    )
}
