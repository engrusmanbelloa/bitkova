import React from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import { User } from "@/userType"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    margin: auto;
    ${mobile(
        (props: any) => `
            padding: 5px;
        `,
    )}
`
const ProfileHeader = styled.h2`
    font-weight: 500;
    color: ${(props) => props.theme.palette.common.black};
    margin: 0 0 20px 0;
    padding: 0;
    ${mobile(
        (props: any) => `
            font-weight: 350;
            margin: 0 0 10px 0;
        `,
    )}
`
const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    ${mobile(
        (props: any) => `
            gap: 5px;
        `,
    )}
`
const DetailRow = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-bottom: 5px;
    padding-top: 5px;
`
const Label = styled.span`
    color: ${(props) => props.theme.palette.common.black};
    margin-right: 100px;
    width: 150px;
    ${mobile(
        (props: any) => `
            margin-right: 50px;
        `,
    )}
`
const Value = styled.span`
    font-weight: 500;
    ${mobile(
        (props: any) => `
           font-weight: 200;
        `,
    )}
`
interface DashboardProps {
    user: User
}
export default function ProfileSection({ user }: DashboardProps) {
    return (
        <Container>
            <ProfileHeader>Profile</ProfileHeader>
            <ProfileDetails>
                <DetailRow>
                    <Label>Registration Date</Label>
                    <Value>{user.registrationDate}</Value>
                </DetailRow>
                <DetailRow>
                    <Label>Display Name</Label>
                    <Value>{user.name}</Value>
                </DetailRow>
                <DetailRow>
                    <Label>Username</Label>
                    <Value>{user.username}</Value>
                </DetailRow>
                <DetailRow>
                    <Label>Email</Label>
                    <Value>{user.email}</Value>
                </DetailRow>
                <DetailRow>
                    <Label>Phone Number</Label>
                    <Value>{user.phoneNumber}</Value>
                </DetailRow>
                <DetailRow>
                    <Label>Skill/Occupation</Label>
                    <Value>{user.skill}</Value>
                </DetailRow>
                <DetailRow>
                    <Label>Biography</Label>
                    <Value>{user.bio}</Value>
                </DetailRow>
            </ProfileDetails>
        </Container>
    )
}
