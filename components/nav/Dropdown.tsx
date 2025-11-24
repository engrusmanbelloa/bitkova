"use client"
import React, { useState } from "react"
import styled from "styled-components"
import Link from "next/link"
import LogoutIcon from "@mui/icons-material/Logout"
import LoginIcon from "@mui/icons-material/Login"
import { getAuth, signOut, sendEmailVerification, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { auth } from "@/lib/firebase/firebaseConfig"
import { redirect } from "next/navigation"

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
    display: flex;
    align-items: center;
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
export default function DropdownMenu({
    user,
    handleSingUpOpen,
    closeMenu,
}: {
    user: any
    handleSingUpOpen: () => void
    closeMenu: () => void
}) {
    const [isOpen, setIsOpen] = useState(true)
    if (!user) {
        // console.log("User or name is missing, showing default avatar.")
        return (
            <DropdownContent $isVisible={isOpen}>
                <DropdownItem
                    onClick={() => {
                        handleSingUpOpen()
                        closeMenu()
                    }}
                >
                    <span>Sign In</span>
                    <LoginIcon sx={{ ml: 1, mt: 0, p: 0 }} />
                </DropdownItem>
            </DropdownContent>
        )
    }
    // SignOut
    async function handleSignOut() {
        try {
            setIsOpen(!isOpen)
            signOut(auth)
            // await fetch("/api/auth/session", {
            //     method: "DELETE",
            // })
            // console.log("Session deleted")
            redirect("/")
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

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
            href: "/our-hub",
            title: "Our Hub",
        },
        {
            id: 4,
            href: "/my-learning",
            title: "My Learning",
        },
    ]

    return (
        <DropdownContent $isVisible={isOpen}>
            {menuList.map((item) => (
                <Link onClick={closeMenu} key={item.id} href={item.href}>
                    <DropdownItem>{item.title}</DropdownItem>
                </Link>
            ))}
            <Hr />
            <DropdownItem>
                <Links
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        color: "red",
                    }}
                    onClick={() => {
                        handleSignOut()
                        closeMenu()
                    }}
                    href="/"
                >
                    <span>Logout</span> <LogoutIcon sx={{ ml: 1, mt: 0, p: 0 }} />
                </Links>
            </DropdownItem>
        </DropdownContent>
    )
}
