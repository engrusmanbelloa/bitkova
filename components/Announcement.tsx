"use client"
import styled from "styled-components"
import { mobile, ipad } from "../responsive"

const Container = styled.div`
    height: 40px;
    width: 100%;
    margin: 0;
    padding: 0;
    color: white;
    display: flex;
    align-items: center;
    font-weight: 400;
    justify-content: center;
    font-size: 20px;
    letter-spacing: 1.5;
    ${mobile({ height: 25 })}
    ${mobile({ fontSize: "12px", height: "30px", textAlign: "center" })}
`

const Announcement = () => {
    return <Container></Container>
}

export default Announcement
