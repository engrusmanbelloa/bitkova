// components/classes/RegisteredClasses.tsx
"use client"
import { useEffect, useState } from "react"
import styled from "styled-components"
import CircularProgress from "@mui/material/CircularProgress"
import TelegramIcon from "@mui/icons-material/Telegram"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import { Card, CardContent } from "@mui/material"
import { useFetchTelegramClass } from "@/hooks/classes/useFetchTelegramClass"
import { mobile } from "@/responsive"
import { deriveCertificateFields } from "@/utils/cohortCertUtils"
import { createClassCertificate } from "@/lib/firebase/uploads/createClassCertificate"
import { useClassCertificate } from "@/hooks/classes/useClassCertificate"
import CertificateDownload from "@/components/course/DownloadCert"
import { useAuthReady } from "@/hooks/useAuthReady"
import { toast } from "sonner"

const ClassCard = styled(Card)`
    border-radius: 12px;
    box-shadow: 0 10px 10px ${(props) => props.theme.mobile.horizontalrule};
    overflow: hidden;
    transition:
        transform 0.2s,
        box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${(props) => props.theme.mobile.horizontalrule};
    }

    ${mobile(`
        margin-bottom: 10px;
    `)}
`
const ClassHeader = styled.div`
    background: linear-gradient(
        35deg,
        ${(props) => props.theme.palette.primary.main} 95%,
        ${(props) => props.theme.mobile.horizontalrule} 100%
    );

    padding: 20px;
    color: ${(props) => props.theme.palette.common.white};

    ${mobile(`
        padding: 15px;
    `)}
`
const ClassType = styled.p`
    display: inline-block;
    background: ${(props) => props.theme.mobile.gray};
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 10px;
`
const ClassName = styled.h2`
    margin: 0;

    ${mobile(`
        font-size: 18px;
    `)}
`
const CohortName = styled.p`
    margin: 5px 0 0 0;
    opacity: 0.9;
`
const ClassBody = styled(CardContent)`
    padding: 20px;
    background: ${(props) => props.theme.palette.common.white};

    ${mobile(`
        padding: 15px;
    `)}
`
const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-bottom: 20px;

    ${mobile(`
        grid-template-columns: 1fr;
        gap: 12px;
    `)}
`
const InfoItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
`
const IconWrapper = styled.div`
    color: ${(props) => props.theme.palette.primary.main};
    margin-top: 2px;
`
const InfoContent = styled.div`
    flex: 1;
`
const InfoLabel = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.palette.common.black};
    margin-bottom: 4px;
    font-weight: 600;
`
const InfoValue = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.palette.common.black};
    word-break: break-word;
`
const LinkButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: ${(props) => props.theme.palette.primary.main};
    text-decoration: none;
    font-weight: 400;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
        background: ${(props) => props.theme.palette.action.hover};
    }
`
const ActionSection = styled.div`
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid ${(props) => props.theme.palette.divider};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
`
const CertificateStatus = styled.div<{ $ready: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: ${(props) => (props.$ready ? "pointer" : "default")};
    background: ${(props) => (props.$ready ? props.theme.mobile.lightAsh : props.theme.mobile.ash)};
    color: ${(props) =>
        props.$ready ? props.theme.mobile.green : props.theme.palette.common.black};
`
const ScheduleList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`
const ScheduleItem = styled.div`
    font-size: 13px;
    color: ${(props) => props.theme.palette.common.black};
    padding: 4px 0;
`

export default function TelegramClassCard({ enrollment, cohorts }: any) {
    // const { data: telegramClass, isLoading } = useFetchTelegramClass(enrollment.cohortId)
    const { data: telegramClasses = [], isLoading } = useFetchTelegramClass(enrollment.cohortId)
    const { user, isLoadingUserDoc } = useAuthReady()
    const telegramClass = telegramClasses[0]
    const [visible, setVisible] = useState(false)
    // const [certificateId, setCertificateId] = useState<string | null>(
    //     enrollment.certificateId ?? null,
    // )
    const cohort = cohorts?.find((c: any) => c.id === enrollment.cohortId)
    const { duration, issuedAt, completed, shortDesc } = deriveCertificateFields(cohort)
    const { certificateId, isCreating } = useClassCertificate({
        userId: user?.id,
        enrollmentId: enrollment.id,
        classType: "physical_class",
        completed,
        existingCertificateId: enrollment.certificateId,
    })

    // // Auto-create certificate when cohort period is reached
    // useEffect(() => {
    //     if (!completed || !user?.id || certificateId) {
    //         // console.log("Certificate not ready or already exists", {
    //         //     completed,
    //         //     user: user?.id,
    //         //     classData,
    //         //     certificateId,
    //         // })
    //         return
    //     }
    //     createClassCertificate(user.id, enrollment.id, "physical_class")
    //         .then((id) => setCertificateId(id))
    //         .catch(console.error)
    // }, [completed, user?.id, telegramClass, certificateId, enrollment.id])

    const openModal = () => {
        if (!completed || !certificateId) {
            toast.error("Certificate not ready yet.")
            return
        }
        setVisible(true)
        toast.success("Congratulations! Download your certificate.")
    }

    const handleClose = () => setVisible(false)

    if (isLoading) return <CircularProgress size={24} />
    if (!telegramClass) return null

    return (
        <>
            <ClassCard>
                <ClassHeader>
                    <ClassType>Telegram Class</ClassType>
                    <ClassName>{telegramClass.name}</ClassName>
                    <CohortName>{cohort?.name || enrollment.cohortName}</CohortName>
                </ClassHeader>

                <ClassBody>
                    <InfoGrid>
                        {/* Telegram Link */}
                        <InfoItem>
                            <IconWrapper>
                                <TelegramIcon />
                            </IconWrapper>
                            <InfoContent>
                                <InfoLabel>Telegram Group</InfoLabel>
                                {enrollment.inviteLink ? (
                                    <LinkButton
                                        href={enrollment.inviteLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Join Group →
                                    </LinkButton>
                                ) : (
                                    <InfoValue>Link pending...</InfoValue>
                                )}
                            </InfoContent>
                        </InfoItem>

                        {/* Schedule */}
                        <InfoItem>
                            <IconWrapper>
                                <CalendarTodayIcon />
                            </IconWrapper>
                            <InfoContent>
                                <InfoLabel>Schedule</InfoLabel>
                                <ScheduleList>
                                    {telegramClass.schedule?.slots.map((s: any, i: number) => (
                                        <ScheduleItem key={i}>
                                            {s.days}: {s.time}
                                        </ScheduleItem>
                                    ))}
                                </ScheduleList>
                            </InfoContent>
                        </InfoItem>
                    </InfoGrid>

                    <ActionSection>
                        {/* <CertificateStatus $ready={true}>
                            Certificate: Not Available Yet
                        </CertificateStatus> */}
                        <CertificateStatus $ready={completed} onClick={openModal}>
                            {completed
                                ? "Certificate: Ready, Download"
                                : "Certificate: Not Available Yet"}
                        </CertificateStatus>
                    </ActionSection>
                </ClassBody>
            </ClassCard>
            {visible && (
                <CertificateDownload
                    handleClose={handleClose}
                    user={user?.name}
                    title={telegramClass.name}
                    duration={duration}
                    id={certificateId!}
                    $visible={visible}
                    desc={shortDesc}
                    issuedAt={issuedAt}
                />
            )}
        </>
    )
}
