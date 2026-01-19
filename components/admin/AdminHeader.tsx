"use client"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"

const HeaderContainer = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    height: 80px;
    margin: 50px auto 0px;
    display: flex;
    align-items: center;
    padding: 10px;
    ${ipad(
        (props: any) => `
            
        `,
    )}
    ${mobile(
        (props: any) => `
            display: none;
            width: ${props.theme.widths.mobileWidth};
            height: 100px;
            margin: 10px auto 0px;
            padding: 0;
            flex-direction: column;
        `,
    )}
`
const Avatar = styled.div`
    width: 70px;
    height: 70px;
    background: ${(props) => props.theme.palette.primary.main};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    ${mobile(
        (props: any) => `
            width: 50px;
            height: 50px;
        `,
    )}
`
const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    padding: 5px;
    height: 70px;
    ${mobile(
        (props: any) => `
            height: 40px;
        `,
    )}
`
const Greeting = styled.p`
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 5px;
    ${mobile(
        (props: any) => `
            display: none;
        `,
    )}
`
const DisplayName = styled.h3`
    font-weight: 600;
    margin-top: 0px;
    ${mobile(
        (props: any) => `
            margin: 0px auto;
            padding: 0;
            
        `,
    )}
`

export default function AdminHeader({ user }: any) {
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
