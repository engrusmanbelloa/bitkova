import React, { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import styled from "styled-components"
import { ipad, mobile } from "@/responsive"

const Container = styled.div`
    height: 120px;
    width: ${(props) => props.theme.widths.heroWidth};
    margin: 50px auto 0;
    padding: 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    ${ipad({ width: 665, marginTop: 20 })};
    ${mobile({ width: 360, height: 160 })};
`
const StatBox = styled.div`
    text-align: center;
    vertical-align: center;
    ${mobile({ height: 150 })};
`
const Number = styled.h1`
    font-size: 65px;
    font-weight: 900;
    line-height: 80px;
    text-align: center;
    margin: 0;
    color: ${(props) => props.theme.palette.primary.main};
    ${ipad({ fontSize: 40 })};
    ${mobile({ fontSize: 25 })};
`
const Label = styled.p`
    color: ${(props) => props.theme.palette.primary.main};
    margin: 0;
`

const Counter = ({ end, label }: { end: number; label: string }) => {
    const [count, setCount] = useState(0)
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    useEffect(() => {
        if (inView && count < end) {
            const interval = setInterval(() => {
                setCount((prev) => {
                    if (prev < end) {
                        return prev + 1
                    } else {
                        clearInterval(interval)
                        return end
                    }
                })
            }, 30)
        }
    }, [inView, count, end])

    return (
        <StatBox ref={ref}>
            <Number>{count}+</Number>
            <Label>{label}</Label>
        </StatBox>
    )
}

export default function StatsSection() {
    return (
        <Container>
            <Counter end={90} label="Completion Rate" />
            <Counter end={5000} label="Successful Graduates" />
            <Counter end={10} label="Partners" />
            <Counter end={1000} label="Success Stories" />
        </Container>
    )
}
