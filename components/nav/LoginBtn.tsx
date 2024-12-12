"use client"
import React from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"

const Btn = styled.button<{ $login?: boolean }>`
    width: ${(props) => (props.$login ? "100px" : "140px")};
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    background-color: ${(props) =>
        props.$login ? props.theme.palette.common.white : props.theme.palette.primary.main};
    color: ${(props) =>
        props.$login ? props.theme.palette.primary.main : props.theme.mobile.offWhite};
    outline: ${(props) => (props.$login ? "solid 1px black" : "none")};
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        background-color: ${(props) =>
            props.$login ? props.theme.palette.primary.main : props.theme.palette.action.hover};
        color: ${(props) =>
            props.$login ? props.theme.palette.common.white : props.theme.palette.primary.main};
    }
    ${ipad({ display: "none" })};
    ${mobile({})};
`

export default function LoginBtn(props: {
    $login?: boolean
    //  title?: string
    onClick?: () => void
}) {
    return (
        <Btn $login={props.$login} onClick={props.onClick}>
            {props.$login ? "Login" : "Create Account"}
        </Btn>
    )
}
