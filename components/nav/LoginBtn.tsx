"use client"
import React from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"

const Btn = styled.button<{ $login?: boolean }>`
    width: 100px;
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
    background-color: ${(props) => props.theme.palette.common.white};
    color: ${(props) => props.theme.palette.primary.main};
    outline: solid 1px black;
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        background-color: ${(props) => props.theme.palette.action.hover};
        color: ${(props) => props.theme.palette.common.black};
    }
    ${ipad({ display: "none" })};
`

export default function LoginBtn(props: { $login: boolean; onClick: () => void }) {
    return (
        <Btn $login={props.$login} onClick={props.onClick}>
            {props.$login ? "Logout" : "Login"}
        </Btn>
    )
}
