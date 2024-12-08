"use client"
import React from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"

// color: ${props => props.theme.main};
const LogoTxt = styled.h2<{ $main?: string }>`
    position: relative;
    &:hover {
        animation: pulse;
        animation-duration: 1s;
    }
    &::first-letter {
        text-transform: uppercase;
    }
    color: ${(props) =>
        props.$main ? props.theme.palette.primary.main : props.theme.palette.common.black};
    ${mobile({})}
`

export default function Logo(props: { $main?: string }) {
    return <LogoTxt $main={props.$main}>Bitkova</LogoTxt>
}
// ${props => props.main ? props.theme.main : props.theme.black}?
