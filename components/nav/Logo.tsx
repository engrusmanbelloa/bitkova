"use client"
import React from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"

// color: ${props => props.theme.main};
const LogoTxt = styled.h2<{ $main?: string }>`
    position: relative;
    font-weight: 700;
    &:hover {
        animation: pulse;
        animation-duration: 1s;
    }
    &::first-letter {
        text-transform: uppercase;
    }
    color: ${(props) =>
        props.$main ? props.theme.palette.primary.main : props.theme.palette.common.white};
    ${mobile({})}
`

export default function Logo(props: { $main?: string }) {
    return <LogoTxt $main={props.$main}>Bitkova</LogoTxt>
}
