import React from "react"
import styled from "styled-components"

interface ProgressBarProps {
    progress: number // Expected to be between 0 - 100
    label?: string
}

const Wrapper = styled.div`
    margin: 10px 0;
`

const Label = styled.div`
    font-size: 14px;
    margin-bottom: 6px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.primary.main || "#333"};
`

const Track = styled.div`
    background-color: #e0e0e0;
    border-radius: 10px;
    height: 10px;
    overflow: hidden;
`

const Bar = styled.div<{ progress: number }>`
    height: 100%;
    width: ${(props) => props.progress}%;
    background-color: ${(props) => props.theme.palette.primary.main || "#3f51b5"};
    transition: width 0.4s ease;
    border-radius: 10px;
`

export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <Wrapper>
            <Track>
                <Bar progress={Math.min(100, Math.max(0, progress))} />
            </Track>
        </Wrapper>
    )
}
