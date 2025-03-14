import React from "react"
import styled from "styled-components"
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    margin: auto;
`
const ProfileHeader = styled.h2`
    font-weight: 500;
    color: ${(props) => props.theme.palette.common.black};
    margin: 0 0 20px 0;
    padding: 0;
`
const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const DetailRow = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-bottom: 5px;
    padding-top: 5px;
`
const Label = styled.span`
    font-weight: bold;
    color: ${(props) => props.theme.palette.common.black};
    margin-right: 100px;
    width: 150px;
`
const Value = styled.span``

export default function ProfileSection() {
    const user = {
        DisplayName: "Mahmoud Sardauna",
        username: "Abudanbwai",
        email: "abudanbwai@bitkova.com",
        phoneNumber: "+234 80361 07361",
        skill: "Danbaiwa",
        bio: "UX/UI Designer in the Morning. Danbaiwa in the Night.",
        registrationDate: "March 25, 2024 12:32pm",
    }
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
                    <Value>{user.DisplayName}</Value>
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
