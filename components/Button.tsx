"use client"
import React from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"

const Btn = styled.button<{ $main?: boolean }>`
    width: 170px;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    animation: pulse;
    animation-duration: 2s;
    background-color: ${(props) =>
        props.$main ? props.theme.palette.primary.main : props.theme.palette.common.white};
    color: ${(props) =>
        props.$main ? props.theme.palette.common.white : props.theme.palette.primary.main};
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        background-color: ${(props) =>
            props.$main ? props.theme.palette.action.hover : props.theme.palette.primary.main};
        color: ${(props) =>
            props.$main ? props.theme.palette.primary.main : props.theme.palette.common.white};
    }
    ${ipad({ height: 35, fontSize: "12px" })};
    ${mobile({ lineHeight: "14px" })};
`
export default function Button(props: { $main?: boolean; title?: string; onClick?: () => void }) {
    return (
        <Btn $main={props.$main} onClick={props.onClick}>
            {props.title}
        </Btn>
    )
}
