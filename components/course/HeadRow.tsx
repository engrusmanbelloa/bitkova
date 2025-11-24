"use client"
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    margin-top: 10px;
    margin-bottom: 0px;
`
const CoursesHeader = styled.h3`
    font-size: 18px;
    color: ${(props) => props.theme.palette.primary.main};
    margin: 0;
`
const Action = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.palette.common.black};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`

interface HeadRowProps {
    title: string
}
export default function HeadRow(props: { title?: string }) {
    return (
        <Container>
            <CoursesHeader>{props.title}</CoursesHeader>
            <Action>View All</Action>
        </Container>
    )
}
