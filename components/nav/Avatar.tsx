"use client"
import React, { useState } from "react"
import styled from "styled-components"
import Link from "next/link"
import { getAuth, signOut, sendEmailVerification, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from "firebase/app"

const AvatarContainer = styled.div`
    width: 50px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
const Avatar = styled.button`
    width: 40px;
    height: 40px;
    background: ${(props) => props.theme.palette.primary.main};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        background-color: ${(props) => props.theme.mobile.mobileNavBg};
        color: ${(props) => props.theme.palette.primary.main};
    }
`
const DropdownContent = styled.ul<{ $isVisible: boolean }>`
    position: absolute;
    top: 100%;
    right: 0;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    min-width: 150px;
    list-style: none;
    margin: 5px 0;
    padding: 0;
    background-color: ${(props) => props.theme.palette.common.white};
    z-index: 1000;
    display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`
const DropdownItem = styled.li`
    padding: 10px;
    cursor: pointer;
    border-radius: 8px;
    color: ${(props) => props.theme.palette.common.black};
    &:hover {
        background: ${(props) => props.theme.palette.action.hover};
    }
`
const Links = styled(Link)`
    text-decoration: none;
    color: ${(props) => props.theme.palette.common.black};
    text-transform: capitalize;
`

export default function NavAvatar({ user }: any) {
    const [isOpen, setIsOpen] = useState(false)
    // { name: 'Usman Bello Abdullahi', initials: 'UB' }
    if (!user) {
        console.log("User or name is missing, showing default avatar.")
        return null
    }
    // console.log("Received User name for avatar: ", user.name)
    const getInitials = (name: string): string => {
        const words = name.split(" ")
        return words.length > 1
            ? `${words[0][0]}${words[1][0]}`.toUpperCase()
            : `${words[0][0]}${words[0][1]}`.toUpperCase()
    }
    const initials = getInitials(user)

    // SignOut
    const handleSignOut = () => {
        setIsOpen(!isOpen)
        signOut(auth)
    }
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
        <AvatarContainer>
            <Avatar onClick={() => setIsOpen(!isOpen)}>{initials}</Avatar>
            <DropdownContent $isVisible={isOpen}>
                <DropdownItem>
                    <Links onClick={() => setIsOpen(!isOpen)} href="/dashboard">
                        Profile
                    </Links>
                </DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>
                    <Links onClick={handleSignOut} href="/">
                        Logout
                    </Links>
                </DropdownItem>
            </DropdownContent>
        </AvatarContainer>
    )
}
