"use client"
import styled from "styled-components"
import Button from "@/components/Button"
import { mobile, ipad } from "@/responsive"

const BannerContainer = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0;
`
const ContentSection = styled.div`
    flex: 1;
`
const Title = styled.h2``

const Description = styled.p`
    line-height: 1.6;
    margin: 0;
`

interface PhysicalClassesBannerProps {
    onRegisterClick?: () => void
}

export default function JoinPhysicalClass({ onRegisterClick }: PhysicalClassesBannerProps) {
    const handleRegister = () => {
        if (onRegisterClick) {
            onRegisterClick()
        } else {
            // Default behavior - you can customize this
            console.log("Register button clicked")
            // Or navigate to a registration page
            // window.location.href = '/register-physical-classes'
        }
    }

    return (
        <BannerContainer>
            <ContentSection>
                <Title>Join Our Physical Classes</Title>
                <Description>
                    If you love to grow or build a career in tech, we have you covered. At Bitkova,
                    We have tutors who physical are virtual classes for you. We focus on industry
                    ready skills for the future of work, while ensuring you understand the concepts.
                </Description>
            </ContentSection>
            <Button title="Register Now" $main={true} onClick={handleRegister} />
        </BannerContainer>
    )
}
