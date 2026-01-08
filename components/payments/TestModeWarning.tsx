// components/payments/TestModeWarning.tsx
"use client"
import styled from "styled-components"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import { isTestMode } from "@/config/paystack"

const WarningContainer = styled.div`
    padding: 12px;
    background: #fef3c7;
    border: 1px solid #f59e0b;
    border-radius: 8px;
    color: #92400e;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    svg {
        font-size: 20px;
    }
`

interface TestModeWarningProps {
    message?: string
    className?: string
}

export default function TestModeWarning({
    message = "Test Mode Active - No real charges will be made",
    className,
}: TestModeWarningProps) {
    const inTestMode = isTestMode()

    if (!inTestMode) return null

    return (
        <WarningContainer className={className}>
            <WarningAmberIcon />
            {message}
        </WarningContainer>
    )
}
