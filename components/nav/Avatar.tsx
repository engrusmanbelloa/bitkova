"use client"
import React from "react"
import styled from "styled-components"

const HeaderContainer = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    height: 40px;
    margin: auto;
    display: flex;
    align-items: center;
    padding: 10px;
`
const Avatar = styled.div`
    width: 30px;
    height: 30px;
    background: #3b82f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
`

export default function NavAvatar({ user }: any) {
    // { name: 'Usman Bello Abdullahi', initials: 'UB' }
    const getInitials = (name: string): string => {
        const words = name.split(" ")
        return words.length > 1
            ? `${words[0][0]}${words[1][0]}`.toUpperCase()
            : `${words[0][0]}${words[0][1]}`.toUpperCase()
    }

    const initials = getInitials(user.name)

    return (
        <HeaderContainer>
            <Avatar>{initials}</Avatar>
        </HeaderContainer>
    )
}
