"use client"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import styled from "styled-components"
import CourseCard from "@/components/course/CourseCard"
import CourseCardSkeleton from "@/components/course/CourseCardSkeleton"
import { mobile, ipad } from "@/responsive"
import { CourseWithExtras } from "@/types/course"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const PageContainer = styled.div`
    max-width: ${(props) => props.theme.widths.heroWidth};
    margin: 0 auto;
    ${mobile`
    `}
`
const SectionWrapper = styled.section`
    margin-bottom: 50px;
`
const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 20px;
    padding: 0 10px;
`
const SectionTitle = styled.h3`
    color: ${(props) => props.theme.palette.primary.main};
    margin: 0;
`
const ViewAllLink = styled.a`
    color: ${(props) => props.theme.palette.secondary.main};
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`
const SkeletonBox = styled.div`
    margin: 5px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    padding: 0 10px;
`
const SwiperContainer = styled.div`
    position: relative;
    width: 100%;
    height: auto;

    .swiper {
        width: 100%;
        height: 100%;

        ${mobile`
        `}
    }

    .swiper-slide {
        width: 300px;
        height: auto;
        padding: 0;
        margin: 0;
    }

    /* Navigation buttons styling */
    .swiper-button-next,
    .swiper-button-prev {
        color: ${(props) => props.theme.palette.primary.main};
        background: ${(props) => props.theme.palette.common.white};
        width: 40px;
        height: 40px;
        padding: 5px;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

        &:after {
            font-size: 20px;
            font-weight: bold;
        }

        ${ipad`
            width: 30px;
            height: 30px;
        `}

        ${mobile`
            display: none;
        `}
    }

    .swiper-button-disabled {
        opacity: 0.5;
    }

    /* Pagination styling */
    .swiper-pagination {
        bottom: -5px;

        ${mobile`
        `}
    }

    .swiper-pagination-bullet {
        background: ${(props) => props.theme.palette.primary.main};
        opacity: 0.4;
        width: 8px;
        height: 8px;
    }

    .swiper-pagination-bullet-active {
        opacity: 1;
        width: 24px;
        border-radius: 4px;
    }
`

interface SectionProps {
    title: string
    courses: CourseWithExtras[]
    viewAllLink?: string
}

const Section = ({ title, courses, viewAllLink }: SectionProps) => (
    <SectionWrapper>
        <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
            {viewAllLink && <ViewAllLink href={viewAllLink}>View All</ViewAllLink>}
        </SectionHeader>
        <SwiperContainer>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView="auto"
                centeredSlides={true}
                spaceBetween={20}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    768: {
                        centeredSlides: false,
                    },
                }}
            >
                {courses.map((course) => (
                    <SwiperSlide key={course.id}>
                        <CourseCard course={course} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </SwiperContainer>
    </SectionWrapper>
)

export default function CoursesSection() {
    const { data: courses, isLoading, isError } = useFetchCourses()

    if (isLoading) {
        return (
            <PageContainer>
                <SkeletonBox>
                    {[...Array(3)].map((_, i) => (
                        <CourseCardSkeleton key={i} />
                    ))}
                </SkeletonBox>
            </PageContainer>
        )
    }

    if (isError) {
        return (
            <PageContainer>
                <p>Error loading courses.</p>
            </PageContainer>
        )
    }

    // Filter courses for different sections
    const shortCourses = courses && courses.filter((course) => course.onDemandVideos < 10)
    const newCourses = courses && courses.slice(0, 10)
    const recommendedCourses =
        courses && courses.filter((course) => course.category === "Cryptocurrency")

    return (
        <PageContainer>
            {recommendedCourses && recommendedCourses.length > 0 && (
                <Section
                    title="Recommended Courses"
                    courses={recommendedCourses}
                    viewAllLink="/courses?category=recommended"
                />
            )}
            {shortCourses && shortCourses.length > 0 && (
                <Section
                    title="Short Courses for You"
                    courses={shortCourses}
                    viewAllLink="/courses?type=short"
                />
            )}
            {newCourses && newCourses.length > 0 && (
                <Section
                    title="New Courses"
                    courses={newCourses}
                    viewAllLink="/courses?filter=new"
                />
            )}
        </PageContainer>
    )
}
