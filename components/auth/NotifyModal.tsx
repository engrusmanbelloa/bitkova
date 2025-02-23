import React, { useState, ComponentType, useRef } from "react"
import styled from "styled-components"
import Dialog from "@mui/material/Dialog"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { mobile, ipad } from "@/responsive"

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
    font-size: 18px;
    margin: auto;
    width: 250px;
    height: 50px;
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

export default function NotifyModal({
    handleNotifyModalClose,
    open,
    Transition,
    sentVerification,
    handleCheckVerification,
    handleSendVerification,
    verificationChecked,
}: {
    handleNotifyModalClose: () => void
    open: boolean
    Transition: ComponentType<any>
    sentVerification: boolean
    handleCheckVerification: () => void
    handleSendVerification: () => void
    verificationChecked: boolean
}) {
    const firebaseConfig = {
        apiKey: "AIzaSyCzfxvifvLm9l__D2PVoC-mI97KOds8U7M",
        authDomain: "bitkova-digital-hub.firebaseapp.com",
        projectId: "bitkova-digital-hub",
        storageBucket: "bitkova-digital-hub.firebasestorage.app",
        messagingSenderId: "541818898111",
        appId: "1:541818898111:web:2d0d7dfdf9e80e86d9680a",
        measurementId: "G-STF7K5WZFX",
    }
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
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
                {auth.currentUser && sentVerification ? (
                    <VerifyBtn onClick={handleCheckVerification}>Confirm verification</VerifyBtn>
                ) : (
                    <VerifyBtn onClick={handleSendVerification}>Verify your email</VerifyBtn>
                )}
            </Container>
        </div>
    )
}
