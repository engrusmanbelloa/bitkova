// components/dashboard/certificateTab/CertififactesTab.tsx
"use client"
import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { useUserStore } from "@/lib/store/useUserStore"
import { useAuthReady } from "@/hooks/useAuthReady"
import { useFetchCohorts } from "@/hooks/classes/useFetchCohorts"
import {
    AsyncCertCard,
    PhysicalCertCard,
    TelegramCertCard,
} from "@/components/dashboard/certificateTab/ClassesCards"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"
import { mobile, ipad } from "@/responsive"

// animations
const pulse = keyframes`
  0%, 100% { opacity: 1;   }
  50%       { opacity: 0.5; }
`

//Page shell
const CertificateContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    margin: auto;
    ${mobile(
        (props: any) => `
            padding: 5px;
        `,
    )}
`
const Header = styled.div`
    margin-bottom: 36px;
`

const HeaderTitle = styled.h2`
    font-weight: 500;
    color: ${(props) => props.theme.palette.common.black};
    margin: 0 0 20px 0;
    padding: 0;
    ${mobile(
        (props: any) => `
            font-weight: 350;
            margin: 0 0 10px 0;
        `,
    )}
`
const PageSub = styled.p`
    font-size: 14px;
    color: ${(p) => p.theme.palette.text?.secondary ?? "#777"};
    margin: 0;
`
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 22px;
    ${ipad(`grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));`)}
    ${mobile(`grid-template-columns: 1fr;`)}
`

// Empty state
const EmptyWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 20px;
    text-align: center;
`
const EmptyIconWrap = styled.div`
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background: ${(p) => p.theme.palette.action?.hover ?? "#f4f4f4"};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    svg {
        font-size: 36px;
        color: ${(p) => p.theme.palette.text?.secondary ?? "#ccc"};
    }
`
const EmptyTitle = styled.h3`
    font-size: 17px;
    font-weight: 700;
    margin: 0 0 8px;
    color: ${(p) => p.theme.palette.common.black};
`
const EmptyText = styled.p`
    font-size: 14px;
    color: ${(p) => p.theme.palette.text?.secondary ?? "#888"};
    max-width: 260px;
    margin: 0;
    line-height: 1.6;
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

// Main component
export default function CertificatesTab() {
    const { user, authReady, isLoadingUserDoc } = useAuthReady()
    const { enrollments } = useUserStore()
    const { data: cohorts, isLoading: cohortsLoading } = useFetchCohorts()

    const loading = !authReady || isLoadingUserDoc || cohortsLoading

    if (loading) {
        return (
            <CertificateContainer>
                <Header>
                    <HeaderTitle>My Certificates</HeaderTitle>
                    <PageSub>Loading your achievements…</PageSub>
                </Header>
                <Grid>
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} />
                    ))}
                </Grid>
            </CertificateContainer>
        )
    }

    const certEnrollments = enrollments.filter((e) => !!e.certificateId)
    const asyncCerts = certEnrollments.filter((e) => e.itemType === "async_course")
    const physicalCerts = certEnrollments.filter((e) => e.itemType === "physical_class")
    const telegramCerts = certEnrollments.filter((e) => e.itemType === "telegram_class")
    const total = certEnrollments.length

    return (
        <CertificateContainer>
            <Header>
                <HeaderTitle>My Certificates</HeaderTitle>
                <PageSub>
                    {total > 0
                        ? `${total} certificate${total > 1 ? "s" : ""} earned`
                        : "Complete a course or class to earn your first certificate"}
                </PageSub>
            </Header>

            {total === 0 ? (
                <EmptyWrap>
                    <EmptyIconWrap>
                        <WorkspacePremiumIcon />
                    </EmptyIconWrap>
                    <EmptyTitle>No certificates yet</EmptyTitle>
                    <EmptyText>
                        Finish a course or attend a full cohort to unlock your certificate.
                    </EmptyText>
                </EmptyWrap>
            ) : (
                <Grid>
                    {asyncCerts.map((e) => (
                        <AsyncCertCard key={e.id} enrollment={e} user={user} />
                    ))}
                    {physicalCerts.map((e) => (
                        <PhysicalCertCard
                            key={e.id}
                            enrollment={e}
                            cohorts={cohorts ?? []}
                            user={user}
                        />
                    ))}
                    {telegramCerts.map((e) => (
                        <TelegramCertCard
                            key={e.id}
                            enrollment={e}
                            cohorts={cohorts ?? []}
                            user={user}
                        />
                    ))}
                </Grid>
            )}
        </CertificateContainer>
    )
}
