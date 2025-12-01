import styled from "styled-components"
import { CourseWithExtras } from "@/types"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import BoltIcon from "@mui/icons-material/Bolt"
import CourseCard from "@/components/course/CourseCard"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const SectionWrapper = styled.section`
    max-width: ${(props) => props.theme.widths.heroWidth};
    margin: 0 auto;
`
const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 20px 0;
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
const SwiperContainer = styled.div`
    position: relative;
    width: 100%;

    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        width: 300px;
        height: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
        color: ${(props) => props.theme.palette.primary.main};
        background: ${(props) => props.theme.palette.common.white};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

        &:after {
            font-size: 20px;
            font-weight: bold;
        }

        @media (max-width: 768px) {
            display: none;
        }
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
export const ShortCoursesSection = ({ courses }: { courses: CourseWithExtras[] }) => {
    if (!courses || courses.length === 0) return null

    return (
        <SectionWrapper>
            <SectionHeader>
                <SectionTitle>
                    <BoltIcon style={{ marginBottom: -5, color: "#FFD700" }} /> Quick Courses
                </SectionTitle>
                <ViewAllLink href="/courses?filter=short">View All</ViewAllLink>
            </SectionHeader>
            <SwiperContainer>
                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView="auto"
                    centeredSlides={true}
                    spaceBetween={20}
                    navigation={true}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: { centeredSlides: false },
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
}
