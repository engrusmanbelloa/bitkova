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
    background-color: ${(props) => (props.$main ? props.theme.main : props.theme.white)};
    color: ${(props) => (props.$main ? props.theme.offWhite : props.theme.main)};
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        background-color: ${(props) => (props.$main ? props.theme.navHover : props.theme.main)};
        color: ${(props) => (props.$main ? props.theme.main : props.theme.white)};
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
