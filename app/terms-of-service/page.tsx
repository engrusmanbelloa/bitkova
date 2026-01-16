// app/terms-of-service/page.tsx
"use client"
import styled from "styled-components"

const Container = styled.main`
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
    line-height: 1.7;
    color: #0f172a;
`
const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 10px;
`
const Updated = styled.p`
    font-size: 14px;
    color: #475569;
    margin-bottom: 30px;
`
const Section = styled.section`
    margin-bottom: 30px;
`
const Heading = styled.h2`
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 10px;
`
const Text = styled.p`
    font-size: 15px;
    margin-bottom: 12px;
`
const List = styled.ul`
    padding-left: 20px;

    li {
        margin-bottom: 8px;
        font-size: 15px;
    }
`

export default function TermsOfServicePage() {
    return (
        <Container>
            <Title>Terms of Service</Title>
            <Updated>Last updated: January 2026</Updated>

            <Section>
                <Text>
                    These Terms of Service (“Terms”) govern your use of Bitkova Academy (“we”,
                    “our”, “us”). By accessing or using our platform, you agree to be bound by these
                    Terms.
                </Text>
            </Section>

            <Section>
                <Heading>1. Eligibility</Heading>
                <Text>
                    You must be at least 18 years old, or have parental consent, to use our
                    services.
                </Text>
            </Section>

            <Section>
                <Heading>2. Account Responsibility</Heading>
                <List>
                    <li>You are responsible for maintaining account security</li>
                    <li>You must provide accurate information</li>
                    <li>You are responsible for all activity on your account</li>
                </List>
            </Section>

            <Section>
                <Heading>3. Payments and Refunds</Heading>
                <List>
                    <li>All payments are processed via Paystack</li>
                    <li>Payments are non-refundable unless stated otherwise</li>
                    <li>Course prices may change at any time</li>
                </List>
            </Section>

            <Section>
                <Heading>4. Course Access</Heading>
                <Text>
                    Course access is granted for personal use only. You may not share, resell,
                    distribute, or reproduce any course content without written permission.
                </Text>
            </Section>

            <Section>
                <Heading>5. Intellectual Property</Heading>
                <Text>
                    All content, materials, videos, text, and branding belong to Bitkova Academy and
                    are protected by intellectual property laws.
                </Text>
            </Section>

            <Section>
                <Heading>6. Prohibited Use</Heading>
                <List>
                    <li>Sharing accounts or course materials</li>
                    <li>Attempting to bypass security measures</li>
                    <li>Using the platform for illegal activities</li>
                </List>
            </Section>

            <Section>
                <Heading>7. Termination</Heading>
                <Text>
                    We reserve the right to suspend or terminate accounts that violate these Terms
                    without notice.
                </Text>
            </Section>

            <Section>
                <Heading>8. Limitation of Liability</Heading>
                <Text>
                    Bitkova Academy shall not be liable for any direct, indirect, incidental, or
                    consequential damages arising from your use of the platform.
                </Text>
            </Section>

            <Section>
                <Heading>9. Governing Law</Heading>
                <Text>
                    These Terms are governed by and construed in accordance with the laws of the
                    Federal Republic of Nigeria.
                </Text>
            </Section>

            <Section>
                <Heading>10. Changes to Terms</Heading>
                <Text>
                    We may update these Terms at any time. Continued use of the platform constitutes
                    acceptance of the updated Terms.
                </Text>
            </Section>

            <Section>
                <Heading>11. Contact</Heading>
                <Text>For questions regarding these Terms, contact us at:</Text>
                <Text>
                    <strong>Email:</strong> support@bitkovaacademy.com
                </Text>
            </Section>
        </Container>
    )
}
