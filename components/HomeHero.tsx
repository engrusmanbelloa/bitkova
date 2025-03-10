"use client"
import React from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import Button from "@/components/Button"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Container = styled.section`
    height: 450px;
    width: ${(props) => props.theme.heroWidth};
    margin: 10px auto 0;
    padding: 0px;
    display: flex;
    justify-content: space-between;
    ${ipad(
        (props: any) => `
        width: ${props.theme.widths.ipadWidth};
        height: 276px;
        padding: 5px 0;
    `,
    )}
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
        flex-direction: column;
        height: 600px;
    `,
    )}
`
const Left = styled.div`
    flex: 1;
    margin: 0;
    padding: 0;
    ${mobile({})}
`
const HeroHeader = styled.h1`
    width: 640px;
    height: 120px;
    margin: 50px 0 20px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ width: "350px", height: "86px", margin: "30px 0 10px" })};
    ${mobile({ margin: "15px 0 10px" })}
`
const HeroText = styled.p`
    margin: 0 0 20px;
    padding: 0;
    width: 500px;
    height: 80px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ width: "350px", height: "70px" })}
`
const Right = styled.div`
    flex: 1;
    ${mobile({})}
`
const HeroImg = styled(Image)`
    width: 400px;
    height: 450px;
    border-radius: 12px 0px 0px;
    margin: 0;
    padding: 0;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ width: "220px", height: "276px", marginLeft: 60 })};
    ${mobile({ width: "300px", height: 340, margin: "0 0 0 20px" })}
`
const GreenSquare = styled.div`
    width: 145px;
    height: 145px;
    background: #00d085;
    position: relative;
    bottom: 250px;
    left: 315px;
    border-radius: 25px;
    opacity: 0.7;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({
        width: "85px",
        height: "85px",
        left: 230,
        bottom: 150,
        borderRadius: 15,
        opacity: 0.3,
    })};
    ${mobile({ width: 110, height: 110, left: 250, bottom: 200 })}
`
const BlueSquare = styled.div`
    width: 70px;
    height: 70px;
    background: #356cf4;
    position: relative;
    bottom: 400px;
    right: 0px;
    border-radius: 12px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({
        width: "45px",
        height: "45px",
        left: 50,
        bottom: 250,
        borderRadius: 7,
        opacity: 0.3,
    })};
    ${mobile({ width: 55, height: 55, left: 0, bottom: 300 })}
`
export default function HomeHero() {
    const router = useRouter()
    const main = true
    return (
        <Container>
            <Left>
                <HeroHeader>
                    Unlock the future: <br /> Master a{" "}
                    <span style={{ color: "#356DF1" }}>digital skill</span>
                </HeroHeader>
                <HeroText>
                    Build the tech skills you need for your dream job. We offer affordable courses
                    for everyone, from traders to developers and designers.
                </HeroText>
                <Button
                    $main={main}
                    title="Browse courses"
                    onClick={() => router.push("/courses")}
                />
            </Left>
            <Right>
                <HeroImg
                    src="/hero.png"
                    width={500}
                    height={500}
                    alt="Hero image"
                    priority={true}
                />
                <BlueSquare />
                <GreenSquare />
            </Right>
        </Container>
    )
}
