import styled, { keyframes } from "styled-components"
import { useState, useEffect } from "react"
import { mobile, ipad } from "../responsive"
import "animate.css/animate.min.css"
import { AnimationOnScroll } from "react-animation-on-scroll"
import Image from "next/image"
import img from "../public/intro.jpg"

const Container = styled.div`
    position: relative;
    height: 350px;
    display: flex;
    align-items: center;
    font-weight: 400;
    justify-content: center;
    letter-spacing: 1px;
    ${ipad({
        display: "block",
        height: "100%",
    })}
`

const ImageContainer = styled.div`
    flex: 1;
    padding: 0px;
    margin: 0;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({
        display: "none",
    })}
`

const InfoContainer = styled.div`
    flex: 3;
    text-align: justify;
    padding-left: 10px;
    margin: 20px 0px 0px 10px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({
        margin: "0px",
        padding: "5px",
    })}
`

const Title = styled.h1`
    font-size: 25px;
    text-align: center;
`

const Desc = styled.p`
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 1.5;
    line-height: 1.5;
    ${
        "" /* overflow: hidden;
  @media (max-width: 768px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  } */
    }
    ${mobile({
        fontSize: "18px",
        textAlign: "justify",
        fontWeight: 300,
        margin: "5px",
    })}
`

const Button = styled.button`
    padding: 10px;
    margin: 0px 20px 0px 0px;
    font-size: 20px;
    width: 100%;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: rgba(28, 56, 121);
    color: white;

    &:hover {
        background-color: #cddeff;
        color: rgba(28, 56, 121);
    }
`

const Seemore = styled.button`
    background: rgba(28, 56, 121);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px;
`

const Intro = () => {
    const [showFullText, setShowFullText] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const desc =
        "To fill the need of individuals seeking in-demand crypto and blcockchain skills to improve their standard of living and attaining financial freedom by providing excellent hands-on training for a wider variety of students by offering alternate solutions to conventional schooling utilizing current internet technologies and proven teaching practices implemented by a team of professionals in blcockchain, e-commerce, forex, cryptocurrency, social media marketing and motion/graphics industries."

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768) // Adjust this value to match your mobile breakpoint
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const toggleText = () => {
        setShowFullText(!showFullText)
    }

    const truncatedDesc = desc.split(" ").slice(0, 25).join(" ")
    const displayDesc = showFullText || !isMobile ? desc : truncatedDesc

    return (
        <Container>
            <AnimationOnScroll animateIn="animate__pulse animate__slower" initiallyVisible="true">
                <ImageContainer>
                    <Image src={img} alt="Picture of the author" width={320} height={320} />
                </ImageContainer>
            </AnimationOnScroll>
            <InfoContainer>
                <AnimationOnScroll
                    animateIn="animate__pulse animate__slower"
                    initiallyVisible="true"
                >
                    <Title>Why Bitkova</Title>
                </AnimationOnScroll>
                <AnimationOnScroll
                    animateIn="animate__pulse animate__slower"
                    initiallyVisible="true"
                >
                    <Desc>
                        {displayDesc}{" "}
                        {isMobile && (
                            <Seemore onClick={toggleText}>
                                {showFullText ? "See less" : "See more"}
                            </Seemore>
                        )}
                    </Desc>
                </AnimationOnScroll>
                <AnimationOnScroll
                    animateIn="animate__pulse animate__slower"
                    initiallyVisible="true"
                >
                    <Button>Learn more</Button>
                </AnimationOnScroll>
            </InfoContainer>
        </Container>
    )
}

export default Intro
