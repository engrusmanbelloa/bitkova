// components/hub/PhysicalClasses.tsx
"use client"
import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Pagination } from "swiper/modules"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PeopleIcon from "@mui/icons-material/People"
import BlindsClosedIcon from "@mui/icons-material/BlindsClosed"
import EventBusyIcon from "@mui/icons-material/EventBusy"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import SchoolIcon from "@mui/icons-material/School"
import EnrollButton from "@/components/EnrollButton"
import { mobile, ipad } from "@/responsive"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/lib/store/useUserStore"
import CircularProgress from "@mui/material/CircularProgress"
import { useFetchPhysicalClasses } from "@/hooks/classes/useFetchPhysicalClasses"
import { useFetchActiveCohort, useFetchCohorts } from "@/hooks/classes/useFetchCohorts"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

const SwiperContainer = styled(Card)`
    width: ${(props) => props.theme.widths.heroWidth};
    display: flex;
    height: 580px;
    overflow: hidden;
    margin: 0 auto 30px;
    padding: 0;
    border: 1px solid ${({ theme }) => theme.mobile.horizontalrule};
    border-left: 5px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 8px;
    box-shadow: 0 10px 10px ${(props) => props.theme.mobile.offWhite};
    box-sizing: border-box;
    ${ipad(
        (props: any) => `
            height: 600px;
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: 100%;
            height: 620px;
            max-width: ${props.theme.widths.mobileWidth};
        `,
    )}
    .swiper {
        width: 100%;
        height: 100%;
        padding: 0;
    }

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
    }

    .swiper-pagination {
        bottom: -3px;
        left: 47%;
        right: auto;
        transform: translateY(-50%);
        width: auto;
        ${mobile(
            (props: any) => `
            left: 45%;
        `,
        )}
    }

    .swiper-pagination-bullet {
        display: inline-block;
        margin: 8px 0;
        background: ${(props) => props.theme.palette.primary.main};
        opacity: 0.3;
        width: 8px;
        height: 8px;
        ${ipad(
            (props: any) => `
            height: 7px;
            width: 7px;
        `,
        )}
        ${mobile(
            (props: any) => `
            width: 6px;
            height: 6px;
        `,
        )}
    }

    .swiper-pagination-bullet-active {
        opacity: 1;
        width: 20px;
        border-radius: 50px;
    }
`
const SlideContent = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0 auto;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: 100%;
            max-width: ${props.theme.widths.mobileWidth};
            padding: 20px auto;
            box-sizing: border-box;
        `,
    )}
`
const SectionTitle = styled.h2`
    margin: 0 0 10px 0;
    color: ${(props) => props.theme.palette.common.black};
    display: flex;
    align-items: center;
    gap: 10px;
    ${mobile({ fontSize: "24px", marginBottom: "20px" })}
`
const ClassCard = styled.div`
    width: 90%;
    margin: 0 auto;

    ${mobile({ maxWidth: "100%" })}
`
const ClassHeader = styled.div`
    padding: 15px;
    margin-bottom: 0;
    border-bottom: 1px solid ${({ theme }) => theme.mobile.horizontalrule};
`
const ClassName = styled.h3`
    margin: 0 0 12px 0;
    color: ${(props) => props.theme.palette.primary.main};

    ${mobile({ fontSize: "20px" })}
`
const InfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 10px 0;
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
            `,
    )}
    ${mobile(
        (props: any) => `
                width: ${props.theme.widths.mobileWidth};
                gap: 4px;
                margin: 0;
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
const ClassBody = styled(CardContent)`
    padding: 15px;
    margin-top: 0;
`
const SectionLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 10px 0;
    font-weight: 600;
    color: ${(props) => props.theme.palette.common.black};
    font-size: 14px;

    svg {
        font-size: 18px;
    }
`
const CourseList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    flex-direction: row;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: 100%;
            max-width: ${props.theme.widths.mobileWidth};
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
            gap: 0px 2px;
            max-height: calc(1.6em * 2 + 12px);
            overflow: hidden;
        `,
    )}
`
const InstructorList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    flex-direction: row;

    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: 100%;
            max-width: ${props.theme.widths.mobileWidth};
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
            gap: 0px 2px;
            max-height: calc(1.6em * 2 + 12px);
            overflow: hidden;
        `,
    )}
`
const CourseItem = styled.li`
    padding: 6px 0;
    color: ${(props) => props.theme.palette.common.black};
    font-size: 14px;
    line-height: 1.6;
`
const Price = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 28px;
    font-weight: 700;
    color: ${({ theme }) => theme.mobile.green};
    margin: 10px 0;

    span {
        font-size: 18px;
        font-weight: 400;
    }
`
const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
`
const ErrorMessage = styled.div`
    padding: 20px;
    text-align: center;
    color: #ef4444;
`
const CohortBadge = styled.div`
    display: inline-block;
    padding: 4px 12px;
    background: ${(props) => props.theme.palette.primary.main};
    color: white;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 12px;
`

export default function PhysicalClassesSwiper() {
    const router = useRouter()
    const { isEnrolledInClass } = useUserStore()
    const { data: cohort, isLoading: cohortLoading, error: cohortError } = useFetchActiveCohort()
    const { data: cohorts, isLoading: cohortsLoading, error: cohortsError } = useFetchCohorts()

    const {
        data: classes,
        isLoading: classesLoading,
        error: classesError,
    } = useFetchPhysicalClasses(cohort?.id)

    if (cohortLoading || classesLoading) {
        return (
            <div>
                <SectionTitle>
                    <LocationOnIcon sx={{ color: "#356DF1" }} />
                    Physical Classes
                </SectionTitle>
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            </div>
        )
    }

    if (!cohort) {
        return (
            <div>
                <SectionTitle>
                    <LocationOnIcon sx={{ color: "#356DF1" }} />
                    Physical Classes
                </SectionTitle>
                <ErrorMessage>No active cohort available. Check back soon!</ErrorMessage>
            </div>
        )
    }

    if (!classes || classes.length === 0) {
        return (
            <div>
                <SectionTitle>
                    <LocationOnIcon sx={{ color: "#356DF1" }} />
                    Physical Classes
                </SectionTitle>
                <ErrorMessage>No physical classes available for {cohort.name}</ErrorMessage>
            </div>
        )
    }
    return (
        <>
            <SectionTitle>
                <LocationOnIcon sx={{ color: "#356DF1" }} />
                Physical Classes
            </SectionTitle>
            <SwiperContainer>
                <Swiper
                    direction="horizontal"
                    slidesPerView={1}
                    spaceBetween={0}
                    mousewheel={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Mousewheel, Pagination]}
                >
                    {classes.map((classItem) => {
                        const isEnrolled = isEnrolledInClass(classItem.id)
                        const isFull = classItem.enrolled >= classItem.capacity

                        return (
                            <SwiperSlide key={classItem.id}>
                                <SlideContent>
                                    <ClassCard>
                                        <ClassHeader>
                                            <CohortBadge>{cohort.name}</CohortBadge>
                                            <ClassName>{classItem.name}</ClassName>
                                            <InfoRow>
                                                <LocationOnIcon />
                                                <span>{classItem.location}</span>
                                                <a href={classItem.mapLink} target="_blank">
                                                    Visit via map
                                                </a>
                                            </InfoRow>
                                            <InfoRow>
                                                <PeopleIcon />
                                                <span>
                                                    {classItem.enrolled}/{classItem.capacity}{" "}
                                                    enrolled
                                                </span>
                                            </InfoRow>
                                            <InfoRow>
                                                <CalendarMonthIcon /> Classes Start:
                                                <span>
                                                    {new Date(
                                                        cohort.startDate,
                                                    ).toLocaleDateString()}{" "}
                                                </span>
                                            </InfoRow>
                                            <InfoRow>
                                                <EventBusyIcon /> Classes End:
                                                <span>
                                                    {new Date(cohort.endDate).toLocaleDateString()}
                                                </span>
                                            </InfoRow>
                                            <InfoRow>
                                                <BlindsClosedIcon /> Registration Closes:
                                                <span>
                                                    {new Date(
                                                        cohort.registrationClose,
                                                    ).toLocaleDateString()}
                                                </span>
                                            </InfoRow>
                                            {/* <InfoRow>
                                                <AccessTimeIcon />
                                                <span>
                                                    {classItem.schedule.days.join(", ")} •{" "}
                                                    {classItem.schedule.time}
                                                </span>
                                            </InfoRow> */}
                                            <Schedule>
                                                <ScheduleTitle>
                                                    <AccessTimeIcon /> Schedule:
                                                </ScheduleTitle>
                                                {classItem?.schedule?.slots ? (
                                                    classItem.schedule.slots.map((slot, index) => (
                                                        <InfoRow key={index}>
                                                            <span>
                                                                {slot.days.join(", ")} |{" "}
                                                                <strong>{slot.time}</strong>
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
                                        </ClassHeader>

                                        <ClassBody>
                                            <SectionLabel>
                                                <SchoolIcon />
                                                Instructors
                                            </SectionLabel>
                                            <InstructorList>
                                                {classItem.instructors.map((instructor, idx) => (
                                                    <CourseItem key={idx}>{instructor}</CourseItem>
                                                ))}
                                            </InstructorList>

                                            <SectionLabel>
                                                <SchoolIcon />
                                                Courses
                                            </SectionLabel>
                                            <CourseList>
                                                {classItem.courses.map((course, idx) => (
                                                    <CourseItem key={idx}>{course}</CourseItem>
                                                ))}
                                            </CourseList>

                                            <Price>
                                                <span>₦</span>
                                                {classItem.price.toLocaleString()}
                                            </Price>

                                            <EnrollButton
                                                variant="contained"
                                                disabled={isEnrolled || isFull}
                                                onClick={() =>
                                                    router.push(`/pay/physical/${classItem.id}`)
                                                }
                                            >
                                                {isEnrolled
                                                    ? "Already Enrolled"
                                                    : isFull
                                                      ? "Class Full"
                                                      : "Enroll Now"}
                                            </EnrollButton>
                                        </ClassBody>
                                    </ClassCard>
                                </SlideContent>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </SwiperContainer>
        </>
    )
}
