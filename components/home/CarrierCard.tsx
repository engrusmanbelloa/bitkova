"use client"
import React from "react"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import Button from "@/components/Button"
import { ipad, mobile } from "@/responsive"

const Container = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    margin: 50px auto 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${(props) => props.theme.palette.common.black};
    ${ipad({ width: "100%" })};
    ${mobile({})};
`
const Card = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    ${ipad({ marginBottom: 0 })};
    ${mobile({})};
`
const Title = styled.h2``
const Description = styled.p``

export default function CarrierCard() {
    const router = useRouter()
    return (
        <Container>
            <Card>
                <Title>Join Our Physical Classes</Title>
                <Description>
                    If you love to grow or build a career in tech, we have you covered. At Bitkova,
                    We have boths and physical and virtual classes for you, we focus on
                    industry-ready skills that prepare you for the future of work, while connecting
                    you to incredible jobs both in Nigeria and abroad
                </Description>
            </Card>
            <Button $main={true} title="Register Now" onClick={() => router.push("/our-hub")} />
        </Container>
    )
}
