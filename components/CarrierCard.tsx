"use client"
import React from "react"
import styled from "styled-components"
import Button from "@/components/Button"
import { ipad, mobile } from "@/responsive"

const Container = styled.div`
    width: 1440px;
    height: 500px;
    margin: 50px auto 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.common.white};
    ${ipad({ width: "100%", height: 290 })};
    ${mobile({ marginTop: 20 })};
`
const Card = styled.div`
    width: 570px;
    height: 145px;
    text-align: center;
    margin-bottom: 20px;
    ${ipad({ marginBottom: 0 })};
    ${mobile({ width: 315, height: 190 })};
`
const Title = styled.h2``
const Description = styled.p``

export default function CarrierCard() {
    return (
        <Container>
            <Card>
                <Title>Ready to transform your career?</Title>
                <Description>
                    If you love to grow or build a career in tech, we have you covered. At Bitkova,
                    we focus on industry-ready skills that prepare you for the future of work, while
                    connecting you to incredible jobs both in Nigeria and abroad
                </Description>
            </Card>
            <Button title="Browse all courses" />
        </Container>
    )
}
