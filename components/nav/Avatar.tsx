"use client"
import React, { useState } from "react"
import styled from "styled-components"
import Link from "next/link"
import LogoutIcon from "@mui/icons-material/Logout"
import { getAuth, signOut, sendEmailVerification, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { mobile, ipad } from "@/responsive"

const AvatarContainer = styled.div`
    width: 50px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ${ipad({ display: "none" })}
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
    border-radius: 0px 8px 8px 0;
    width: 200px;
    list-style: none;
    margin: 5px 0;
    padding: 20px 0 0 0;
    background-color: ${(props) => props.theme.palette.common.white};
    z-index: 1000;
    display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`
const DropdownItem = styled.li`
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 0px 8px 8px 0;
    text-transform: capitalize;
    font-weight: 500;
    color: ${(props) => props.theme.palette.common.black};
    &:hover {
        background: ${(props) => props.theme.palette.action.hover};
    }
`
const Hr = styled.hr`
    margin-top: 15px;
    border: 1px solid ${(props) => props.theme.palette.action.hover};
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

    // menu items array
    const menuList = [
        {
            id: 1,
            href: "/dashboard",
            title: "Dashboard",
        },
        {
            id: 2,
            href: "#",
            title: "Be a partner",
        },
        {
            id: 3,
            href: "#",
            title: "Our Hub",
        },
        {
            id: 4,
            href: "#",
            title: "My Learning",
        },
    ]

    return (
        <AvatarContainer>
            <Avatar onClick={() => setIsOpen(!isOpen)}>{initials}</Avatar>
            <DropdownContent $isVisible={isOpen}>
                {menuList.map((item) => (
                    <Link onClick={() => setIsOpen(!isOpen)} key={item.id} href={item.href}>
                        <DropdownItem>{item.title}</DropdownItem>
                    </Link>
                ))}
                <Hr />
                <DropdownItem>
                    <Links
                        style={{ display: "flex", alignItems: "center", color: "red" }}
                        onClick={handleSignOut}
                        href="/"
                    >
                        <span>Logout</span> <LogoutIcon sx={{ ml: 1, mt: 0, p: 0 }} />
                    </Links>
                </DropdownItem>
            </DropdownContent>
        </AvatarContainer>
    )
}
