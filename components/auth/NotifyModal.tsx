// components/auth/NotifyModal.tsx
import React, { useState, ComponentType, useRef } from "react"
import styled from "styled-components"
import Dialog from "@mui/material/Dialog"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { mobile, ipad } from "@/responsive"
import { auth } from "@/lib/firebase/client"

const Container = styled(Dialog)`
    padding: ${(props) => props.theme.paddings.pagePadding};
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.mobile.mobileNavBg};
    border-radius: 8px;
`
const VerifyBtn = styled.button`
    font-size: 14px;
    margin: 8px auto;
    width: 150px;
    height: 35px;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid;
    box-shadow: 5px 5px #cddeff;
    text-align: center;
    background: ${(props) => props.theme.palette.primary.main};
    &:hover {
        background-color: ${(props) => props.theme.palette.action.hover};
        color: ${(props) => props.theme.palette.common.black};
    }
    ${ipad({})}
    ${mobile({})}
`
const VerificationContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 250px;
    height: 150px;
`

interface NotifyModalProps {
    handleNotifyModalClose: () => void
    open: boolean
    Transition: ComponentType<any>
    handleCheckVerification: () => void
    handleSendVerification: () => void
}

export default function NotifyModal({
    handleNotifyModalClose,
    open,
    Transition,
    handleCheckVerification,
    handleSendVerification,
}: NotifyModalProps) {
    return (
        <div>
            <Container
                open={open}
                onClose={handleNotifyModalClose}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {auth.currentUser && (
                    <VerificationContainer>
                        <VerifyBtn onClick={handleSendVerification}>Verify your email</VerifyBtn>
                        <VerifyBtn onClick={handleCheckVerification}>
                            Confirm verification
                        </VerifyBtn>
                    </VerificationContainer>
                )}
            </Container>
        </div>
    )
}
