// components/dashboard/certificateTab/ClassesCards.tsx
"use client"
import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { useFetchPhysicalClasses } from "@/hooks/classes/useFetchPhysicalClasses"
import { useFetchTelegramClass } from "@/hooks/classes/useFetchTelegramClass"
import { useCourseById } from "@/hooks/courses/useFetchCourseById"
import { deriveCertificateFields } from "@/utils/cohortCertUtils"
import CertificateDownload from "@/components/course/DownloadCert"
import CertificateCard from "@/components/dashboard/certificateTab/CaertificateCard"

// animations
const pulse = keyframes`
  0%, 100% { opacity: 1;   }
  50%       { opacity: 0.5; }
`

// Skeleton
const SkeletonCard = styled.div`
    border-radius: 16px;
    overflow: hidden;
    background: ${(p) => p.theme.palette.common.white};
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`
const SkBanner = styled.div`
    height: 108px;
    background: ${(p) => p.theme.palette.action?.hover ?? "#efefef"};
    animation: ${pulse} 1.5s ease infinite;
`
const SkBody = styled.div`
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const SkLine = styled.div<{ $w?: string; $h?: string }>`
    height: ${(p) => p.$h ?? "13px"};
    width: ${(p) => p.$w ?? "100%"};
    border-radius: 6px;
    background: ${(p) => p.theme.palette.action?.hover ?? "#efefef"};
    animation: ${pulse} 1.5s ease infinite;
`

function Skeleton() {
    return (
        <SkeletonCard>
            <SkBanner />
            <SkBody>
                <SkLine $w="72%" $h="15px" />
                <SkLine $w="48%" $h="11px" />
                <SkLine $w="100%" $h="1px" />
                <SkLine $w="100%" $h="38px" />
            </SkBody>
        </SkeletonCard>
    )
}

// Async course cert
export function AsyncCertCard({ enrollment, user }: { enrollment: any; user: any }) {
    const [visible, setVisible] = useState(false)
    const { data: course, isLoading } = useCourseById(enrollment.itemId)

    if (isLoading) return <Skeleton />
    if (!course) return null

    const issued = enrollment.completedAt
        ? new Date(enrollment.completedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : "—"

    return (
        <>
            <CertificateCard
                type="async_course"
                chipLabel="Online Course"
                title={course.title}
                subtitle={`Async · ${course.category ?? "Course"}`}
                issued={issued}
                duration={`${course.duration?.hours ?? "—"} hrs`}
                certId={enrollment.certificateId}
                onDownload={() => setVisible(true)}
            />
            {visible && (
                <CertificateDownload
                    handleClose={() => setVisible(false)}
                    user={user?.name}
                    title={course.title}
                    duration={course.duration?.hours ?? 0}
                    id={enrollment.certificateId}
                    $visible={visible}
                    desc={course.shortDesc}
                    issuedAt={enrollment.completedAt}
                />
            )}
        </>
    )
}

// Physical class cert
export function PhysicalCertCard({
    enrollment,
    cohorts,
    user,
}: {
    enrollment: any
    cohorts: any[]
    user: any
}) {
    const [visible, setVisible] = useState(false)
    const cohort = cohorts?.find((c) => c.id === enrollment.cohortId)
    const { data: physicalClasses } = useFetchPhysicalClasses(enrollment.cohortId)
    const classData = physicalClasses?.find((c) => c.id === enrollment.itemId)

    if (!cohort || !classData) return null

    const { duration, issuedAt, shortDesc } = deriveCertificateFields(cohort)
    const issued = new Date(
        typeof issuedAt === "object" && "toDate" in issuedAt
            ? (issuedAt as any).toDate()
            : issuedAt,
    ).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

    return (
        <>
            <CertificateCard
                type="physical_class"
                chipLabel="Physical Class"
                title={cohort.name}
                subtitle={`Physical · ${classData.name}`}
                issued={issued}
                duration={`${duration} hrs`}
                certId={enrollment.certificateId}
                onDownload={() => setVisible(true)}
            />
            {visible && (
                <CertificateDownload
                    handleClose={() => setVisible(false)}
                    user={user?.name}
                    title={cohort.name}
                    duration={duration}
                    id={enrollment.certificateId}
                    $visible={visible}
                    desc={shortDesc}
                    issuedAt={issuedAt}
                />
            )}
        </>
    )
}

// Telegram class cert
export function TelegramCertCard({
    enrollment,
    cohorts,
    user,
}: {
    enrollment: any
    cohorts: any[]
    user: any
}) {
    const [visible, setVisible] = useState(false)
    const cohort = cohorts?.find((c) => c.id === enrollment.cohortId)
    const { data: telegramClasses = [] } = useFetchTelegramClass(enrollment.cohortId)
    const telegramClass =
        telegramClasses.find((c) => c.id === enrollment.itemId) ?? telegramClasses[0]

    if (!cohort || !telegramClass) return null

    const { duration, issuedAt, shortDesc } = deriveCertificateFields(cohort)
    const issued = new Date(
        typeof issuedAt === "object" && "toDate" in issuedAt
            ? (issuedAt as any).toDate()
            : issuedAt,
    ).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

    return (
        <>
            <CertificateCard
                type="telegram_class"
                chipLabel="Telegram Class"
                title={telegramClass.name}
                subtitle={`Telegram · ${cohort.name}`}
                issued={issued}
                duration={`${duration} hrs`}
                certId={enrollment.certificateId}
                onDownload={() => setVisible(true)}
            />
            {visible && (
                <CertificateDownload
                    handleClose={() => setVisible(false)}
                    user={user?.name}
                    title={telegramClass.name}
                    duration={duration}
                    id={enrollment.certificateId}
                    $visible={visible}
                    desc={shortDesc}
                    issuedAt={issuedAt}
                />
            )}
        </>
    )
}
