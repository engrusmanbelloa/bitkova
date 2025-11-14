"use client"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules"
import styled from "styled-components"
import { sliderItems } from "@/data"
import { mobile, ipad } from "@/responsive"

const Wrapper = styled.div`
    width: 100%;
    height: 600px;
    border-radius: 20px;
    padding: 0;
    margin: 0;
    .swiper {
        width: 100%;
        height: 100%;
    }
`
const Slide = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`
const SlideImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 20px;
`
const SlideOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
`
const SlideContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    ${ipad(
        (props: any) => `
        width: 80%;
    `,
    )}
`
const Title = styled.h2`
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 10px;
    ${ipad(
        (props: any) => `
        font-size: 28px;
    `,
    )}
`
const Description = styled.p`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 30px;
    ${ipad(
        (props: any) => `
        font-size: 16px;
    `,
    )}
`

interface SliderItem {
    id: number
    img: string
}
// spaceBetween={30}
//         effect={'fade'}
//         navigation={true}
//         pagination={{
//           clickable: true,
//         }}
export default function Slider() {
    return (
        <Wrapper>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {sliderItems.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Slide>
                            <SlideImage src={item.img} alt="slider-img" />
                            <SlideOverlay />
                            <SlideContent>
                                <Title>Discover Our Courses</Title>
                                <Description>
                                    Explore a variety of courses designed to boost your skills and
                                    advance your career.
                                </Description>
                            </SlideContent>
                        </Slide>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Wrapper>
    )
}
