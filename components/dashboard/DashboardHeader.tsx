"use client"
import styled from "styled-components"

const HeaderContainer = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    height: 80px;
    margin: 50px auto 0px;
    display: flex;
    align-items: center;
    padding: 10px;
`
const Avatar = styled.div`
    width: 70px;
    height: 70px;
    background: #3b82f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
`
const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    padding: 5px;
    height: 70px;
`
const Greeting = styled.p`
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 5px;
`
const DisplayName = styled.h3`
    font-weight: 600;
    margin-top: 0px;
`

export default function DashboardHeader({ user }: any) {
    return (
        <HeaderContainer>
            {/* Avatar with User Initials */}
            <Avatar>{user.initials}</Avatar>

            {/* Greeting Message */}
            <UserInfo>
                <Greeting>Hello,</Greeting>
                <DisplayName>{user.name}</DisplayName>
            </UserInfo>
        </HeaderContainer>
    )
}
