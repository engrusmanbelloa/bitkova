"use client"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import Button from "@/components/Button"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Container = styled.section`
    height: 450px;
    width: ${(props) => props.theme.widths.heroWidth};
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
const Title = styled.h2`
    font-weight: 500;
    margin-top: 50px;
    margin-bottom: 5px;
    ${ipad(
        (props: any) => `
        text-align: left;
        line-height: 1.2;
        margin-top: 20px;
    `,
    )}
`
const HomeHeroHeader = styled.h1`
    width: 600px;
    height: 120px;
    margin: 0px 0 20px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ width: "350px", height: "86px", margin: "10px 0" })};
    ${mobile({})}
`
const Herocontent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 100px 0 0;
    ${ipad({ marginTop: 50 })}
    ${mobile({ marginTop: 10, marginBottom: 20 })}
`
const HeroHeader = styled.h1`
    width: 600px;
    height: 60px;
    margin: 0px 0 0px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ width: "350px", height: "40px", margin: "10px 0" })};
    ${mobile({ height: "50px", margin: "5px 0" })}
`
const HeroText = styled.p`
    margin: 0 0 20px;
    padding: 0;
    width: 500px;
    height: 80px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ width: "350px", height: "70px" })}
    ${mobile({ height: "80px", marginBottom: 10 })}
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
    width: 110px;
    height: 110px;
    background: #00d085;
    position: relative;
    bottom: 250px;
    left: 315px;
    border-radius: 25px;
    opacity: 0.3;
    animation: pulse;
    animation-duration: 2s;
    z-index: -1;
    ${ipad({
        width: "65px",
        height: "65px",
        left: 230,
        bottom: 150,
        borderRadius: 15,
        opacity: 0.3,
    })};
    ${mobile({ left: 250, bottom: 200 })}
`
const TopGreenSquare = styled.div`
    width: 110px;
    height: 110px;
    background: #00d085;
    position: absolute;
    opacity: 0.3;
    top: 170px;
    right: 600px;
    border-radius: 25px;
    animation: pulse;
    animation-duration: 2s;
    z-index: -1;
    ${ipad({
        width: "65px",
        height: "65px",
        borderRadius: 15,
        top: "100px",
        right: "135px",
    })};
    ${mobile({ left: 200, top: 420 })}
`
const BlueSquare = styled.div`
    width: 70px;
    height: 70px;
    background: #356cf4;
    position: relative;
    opacity: 0.3;
    bottom: 400px;
    right: 0px;
    border-radius: 12px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({
        width: "35px",
        height: "35px",
        left: 50,
        bottom: 250,
        borderRadius: 7,
        opacity: 0.3,
    })};
    ${mobile({ bottom: 300 })}
`
const RightBlueSquare = styled.div`
    width: 70px;
    height: 70px;
    background: #356cf4;
    position: relative;
    opacity: 0.3;
    bottom: 500px;
    left: 360px;
    border-radius: 12px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({
        width: "35px",
        height: "35px",
        left: 260,
        bottom: 280,
        borderRadius: 7,
        opacity: 0.3,
    })};
    ${mobile({ left: 270, bottom: 330 })}
`
const TopBlueSquare = styled.div`
    width: 70px;
    height: 70px;
    background: #356cf4;
    position: relative;
    opacity: 0.3;
    bottom: 680px;
    left: 460px;
    border-radius: 12px;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({
        width: "35px",
        height: "35px",
        left: 280,
        bottom: 380,
        borderRadius: 7,
        opacity: 0.3,
    })};
    ${mobile({ left: 300, bottom: 430 })}
`
interface HomeHeroProps {
    home?: boolean
    welcome?: string
    title?: string
    heroHeader?: string
    master?: string
    headerSpan: string
    heroText: string
    button?: {
        text: string
        onClick: () => void
        isMain?: boolean
    }
}
export default function HomeHero({
    home,
    welcome,
    title,
    heroHeader,
    master,
    headerSpan,
    heroText,
    button,
}: HomeHeroProps) {
    const router = useRouter()
    const main = true
    return (
        <Container>
            <Left>
                {home ? (
                    <>
                        <Title>
                            {welcome}
                            <span style={{ color: "#356DF1" }}>{title}</span>
                        </Title>
                        <HomeHeroHeader>
                            {heroHeader}
                            <br />
                            {master} <span style={{ color: "#356DF1" }}>{headerSpan}</span>
                        </HomeHeroHeader>
                        <HeroText>{heroText}</HeroText>
                    </>
                ) : (
                    <Herocontent>
                        <HeroHeader>
                            {master} <span style={{ color: "#356DF1" }}>{headerSpan}</span>
                        </HeroHeader>
                        <HeroText>{heroText}</HeroText>
                    </Herocontent>
                )}

                {home && (
                    <Button
                        $main={main}
                        title="Browse courses"
                        onClick={() => router.push("/courses")}
                    />
                )}
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
                <TopGreenSquare />
                <GreenSquare />
                <RightBlueSquare />
                <TopBlueSquare />
            </Right>
        </Container>
    )
}
