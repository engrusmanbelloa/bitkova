// app/privacy-policy/page.tsx
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
    margin-top: 10px;

    li {
        margin-bottom: 8px;
        font-size: 15px;
    }
`

export default function PrivacyPolicyPage() {
    return (
        <Container>
            <Title>Privacy Policy</Title>
            <Updated>Last updated: January 2026</Updated>

            <Section>
                <Text>
                    Bitkova Academy (“we”, “our”, “us”) respects your privacy and is committed to
                    protecting the personal information of our users. This Privacy Policy explains
                    how we collect, use, store, and protect your information when you use our
                    platform, services, and website.
                </Text>
            </Section>

            <Section>
                <Heading>1. Information We Collect</Heading>
                <Text>We may collect the following information:</Text>
                <List>
                    <li>Personal information such as name and email address</li>
                    <li>Account information created through Firebase Authentication</li>
                    <li>Payment details (processed securely by Paystack)</li>
                    <li>Course enrollment and progress data</li>
                    <li>Telegram group identifiers for class access</li>
                    <li>Device and usage data for security and analytics</li>
                </List>
            </Section>

            <Section>
                <Heading>2. How We Collect Information</Heading>
                <List>
                    <li>When you create an account</li>
                    <li>When you enroll in a course or make a payment</li>
                    <li>When you interact with our platform or content</li>
                    <li>Through cookies and similar technologies</li>
                </List>
            </Section>

            <Section>
                <Heading>3. How We Use Your Information</Heading>
                <List>
                    <li>To provide and manage your account</li>
                    <li>To process payments and enrollments</li>
                    <li>To deliver courses and Telegram classes</li>
                    <li>To communicate important updates</li>
                    <li>To improve platform performance and security</li>
                </List>
            </Section>

            <Section>
                <Heading>4. Third-Party Services</Heading>
                <Text>We use trusted third-party services to operate our platform:</Text>
                <List>
                    <li>Paystack (payment processing)</li>
                    <li>Google Firebase (authentication, database, hosting)</li>
                    <li>Telegram (class communication and access)</li>
                </List>
                <Text>
                    These services have their own privacy policies, and we are not responsible for
                    their practices.
                </Text>
            </Section>

            <Section>
                <Heading>5. Data Retention</Heading>
                <Text>
                    We retain your information as long as your account remains active or as required
                    to provide services. You may request deletion of your data at any time.
                </Text>
            </Section>

            <Section>
                <Heading>6. Your Rights</Heading>
                <List>
                    <li>Access and review your personal data</li>
                    <li>Request correction or deletion</li>
                    <li>Withdraw consent for communications</li>
                </List>
            </Section>

            <Section>
                <Heading>7. Security</Heading>
                <Text>
                    We implement reasonable technical and organizational measures to protect your
                    data. However, no system is completely secure, and we cannot guarantee absolute
                    security.
                </Text>
            </Section>

            <Section>
                <Heading>8. Changes to This Policy</Heading>
                <Text>
                    We may update this Privacy Policy from time to time. Continued use of our
                    platform after changes constitutes acceptance of the updated policy.
                </Text>
            </Section>

            <Section>
                <Heading>9. Contact Us</Heading>
                <Text>If you have questions about this Privacy Policy, please contact us at:</Text>
                <Text>
                    <strong>Email:</strong> support@bitkova.com
                </Text>
            </Section>
        </Container>
    )
}
