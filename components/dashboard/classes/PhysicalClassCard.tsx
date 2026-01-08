// components/classes/RegisteredClasses.tsx
"use client"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import CircularProgress from "@mui/material/CircularProgress"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import TelegramIcon from "@mui/icons-material/Telegram"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PersonIcon from "@mui/icons-material/Person"
import DownloadIcon from "@mui/icons-material/Download"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useFetchPhysicalClasses } from "@/hooks/classes/useFetchPhysicalClasses"
import { mobile } from "@/responsive"
import { Card, CardContent } from "@mui/material"

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
const ClassBodyTop = styled.div`
    display: flex;

    ${mobile(`
    `)}
`
const InfoGrid = styled.div`
    display: grid;
    flex: 2;
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
    margin-top: 10px;
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
const InstructorList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`
const InstructorChip = styled.div`
    background: ${(props) => props.theme.palette.action.hover};
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 13px;
    color: ${(props) => props.theme.palette.common.black};
`
const DownloadButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${(props) => props.theme.palette.primary.main};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:disabled {
        background: ${(props) => props.theme.palette.action.disabled};
        cursor: not-allowed;
        transform: none;
    }
`
const AttendanceButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: white;
    color: ${(props) => props.theme.palette.primary.main};
    border: 2px solid ${(props) => props.theme.palette.primary.main};
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${(props) => props.theme.palette.primary.main};
        color: white;
    }
`

export default function PhysicalClassCard({ enrollment, cohorts }: any) {
    const router = useRouter()
    const { data: physicalClasses, isLoading } = useFetchPhysicalClasses(enrollment.cohortId)

    if (isLoading) return <CircularProgress size={24} />

    const classData = physicalClasses?.find((c) => c.id === enrollment.itemId)
    const cohort = cohorts?.find((c: any) => c.id === enrollment.cohortId)

    if (!classData) return null

    const attendanceRate = enrollment.attendanceLog?.length
        ? Math.round(
              (enrollment.attendanceLog.filter((a: any) => a.attended).length /
                  enrollment.attendanceLog.length) *
                  100,
          )
        : 0

    return (
        <ClassCard>
            <ClassHeader>
                <ClassType>Physical Class</ClassType>
                <ClassName>{classData.name}</ClassName>
                <CohortName>{cohort?.name || enrollment.cohortName}</CohortName>
            </ClassHeader>

            <ClassBody>
                <ClassBodyTop>
                    <InfoGrid>
                        {/* Location */}
                        <InfoItem>
                            <IconWrapper>
                                <LocationOnIcon />
                            </IconWrapper>
                            <InfoContent>
                                <InfoLabel>Location</InfoLabel>
                                <InfoValue>{classData.location}</InfoValue>
                                {classData.mapLink && (
                                    <LinkButton
                                        href={classData.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Map →
                                    </LinkButton>
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
                                    {classData.schedule?.slots.map((s: any, i: number) => (
                                        <ScheduleItem key={i}>
                                            {s.days}: {s.time}
                                        </ScheduleItem>
                                    ))}
                                </ScheduleList>
                            </InfoContent>
                        </InfoItem>

                        {/* Instructors */}
                        <InfoItem>
                            <IconWrapper>
                                <PersonIcon />
                            </IconWrapper>
                            <InfoContent>
                                <InfoLabel>Instructors</InfoLabel>
                                <InstructorList>
                                    {classData.instructors?.map((instructor: string, i: number) => (
                                        <InstructorChip key={i}>{instructor}</InstructorChip>
                                    ))}
                                </InstructorList>
                            </InfoContent>
                        </InfoItem>
                    </InfoGrid>

                    {/* QR Code Section */}
                    {enrollment.qrCode && (
                        <InfoItem>
                            <IconWrapper>
                                <CheckCircleIcon />
                            </IconWrapper>

                            <InfoContent>
                                <InfoLabel>Class Link QR Code </InfoLabel>

                                <img
                                    src={enrollment.qrCode}
                                    alt="Class Attendance QR Code"
                                    style={{
                                        width: 120,
                                        height: 120,
                                        marginTop: 8,
                                        borderRadius: 8,
                                        border: "1px solid #eee",
                                    }}
                                />

                                <LinkButton
                                    href={enrollment.qrCode}
                                    download={`qr-${enrollment.className || "class"}.png`}
                                    style={{ marginTop: 6 }}
                                >
                                    <DownloadIcon fontSize="small" />
                                    Download QR
                                </LinkButton>
                            </InfoContent>
                        </InfoItem>
                    )}
                </ClassBodyTop>

                <ActionSection>
                    <CertificateStatus $ready={false}>
                        Certificate: Not Available Yet
                    </CertificateStatus>

                    <AttendanceButton
                        onClick={() => router.push(`/dashboard/attendance/${enrollment.id}`)}
                    >
                        View Attendance ({attendanceRate}%)
                    </AttendanceButton>
                </ActionSection>
            </ClassBody>
        </ClassCard>
    )
}
