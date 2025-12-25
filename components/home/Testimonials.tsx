"use client"
import React, { useState } from "react"
import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Rating from "@mui/material/Rating"
import styled from "styled-components"
import { testimonials } from "@/types/data"
import { mobile, ipad } from "@/responsive"

const Container = styled.section`
    width: ${(props) => props.theme.widths.heroWidth};
    height: 320px;
    margin: 50px auto 0px;
    padding: 0px;
    letter-spacing: 1px;
    ${ipad(
        (props: any) => `
        width: ${props.theme.widths.ipadWidth};
        height: 650px;
        margin-top: 20px;
    `,
    )}
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
        flex-direction: column;
        flex-wrap: nowrap;
        height: 900px;
        padding: 0;
    `,
    )}
`
const TestimonialContainer = styled.div`
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    ${ipad({})};
    ${mobile({})};
`
const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    border-radius: 8px;
    width: 360px;
    height: 290px;
    ${ipad({ width: 327 })};
    ${mobile({ width: 360 })};
`
const CardBox = styled.div`
    margin: 0px;
    padding: 0px;
    border: 0.5px solid ${(props) => props.theme.palette.action.hover};
    border-radius: 10px;
    animation: pulse;
    animation-duration: 2s;
    &:hover {
        animation: pulse;
        animation-duration: 1s;
    }
`
const CardHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 0px;
    margin: 0px;
`
const CardTitle = styled.div`
    margin: 0;
    padding: 0px;
`
const Title = styled.h4`
    margin: 0 0 5px;
`
const Profession = styled.p`
    margin: 0px;
    padding: 0px;
    font-size: 12px;
`
const Comment = styled.p`
    font-size: 12px;
    margin: 5px;
`
const Review = styled.div`
    margin-top: 10px;
    text-align: center;
`
export default function Testimonials() {
    const [value, setValue] = useState(3)

    return (
        <Container>
            <TestimonialContainer>
                {testimonials.map((review) => (
                    <Wrapper key={review.id}>
                        <CardBox>
                            <Card variant="elevation" elevation={1} sx={{ p: 1 }}>
                                <CardHeader>
                                    <Avatar sx={{ width: 75, height: 75, m: 1 }} src={review.img} />
                                    <CardTitle style={{ margin: 0, padding: 0 }}>
                                        <Title>{review.name}</Title>
                                        <Profession>{review.profession}</Profession>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent sx={{ m: 0, p: 0 }}>
                                    <Comment>{review.comment}</Comment>
                                </CardContent>
                            </Card>
                        </CardBox>
                    </Wrapper>
                ))}
            </TestimonialContainer>
        </Container>
    )
}
