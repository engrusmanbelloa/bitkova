"use client"
import styled from "styled-components"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import PaymentsIcon from "@mui/icons-material/Payments"
import EnrollButton from "@/components/EnrollButton"
import Button from "@/components/Button"
import RefCodeSection from "@/components/dashboard/referals/RefCodeSection"
import LeaderboardCard from "@/components/dashboard/referals/LeaderboardCard"
import ReferralSteps from "@/components/dashboard/referals/ReferralSteps"
import { mobile, ipad } from "@/responsive"

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
const Header = styled.div`
    margin: 0 0 20px 0;
`
const Title = styled.h2`
    font-weight: 500;
    color: ${(props) => props.theme.palette.common.black};
    margin: 0;
    padding: 0;
    ${mobile(
        (props: any) => `
            font-weight: 350;
            margin: 0 0 10px 0;
        `,
    )}
`
const Desc = styled.p`
    color: ${(props) => props.theme.palette.common.black};
    margin: 0;
`
const Main = styled.main``

const CardTitle = styled.h3<{ $white?: boolean }>`
    margin: 0 0 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${(props) =>
        props.$white ? props.theme.palette.common.white : props.theme.palette.common.black};

    svg {
        color: ${(props) =>
            props.$white ? props.theme.palette.common.white : props.theme.palette.primary.main};
    }
`
const HaveUpline = styled.section`
    border-radius: 8px;
    box-shadow: 0 10px 10px ${(props) => props.theme.mobile.offWhite};
    margin: 10px 0px 40px;
    padding: 20px 10px;
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
`
const CodeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 30px 0 15px;
`
const Input = styled.input`
    flex: 3;
    height: 35px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
`
const EarningsCard = styled.section`
    border-radius: 8px;
    margin: 10px 0px 40px;
    padding: 20px 10px;
    background: linear-gradient(
        135deg,
        ${(props) => props.theme.palette.primary.main} 65%,
        ${(props) => props.theme.mobile.offWhite} 100%
    );
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    color: ${(props) => props.theme.palette.common.white};
`
const Xp = styled.h1`
    color: ${(props) => props.theme.palette.common.white};
    display: flex;
    align-items: center;
    margin: 0;
`
const WithdrawalCard = styled.section`
    border-radius: 8px;
    margin: 10px 0px 0px;
    padding: 20px 10px;
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    color: ${(props) => props.theme.palette.common.white};
    box-shadow: 0 10px 10px ${(props) => props.theme.mobile.offWhite};
`

export default function Referral() {
    return (
        <Container>
            <Header>
                <Title>Referral Program</Title>
                <Desc>Share your code, earn rewards, and climb the lederboard</Desc>
            </Header>

            <Main>
                <HaveUpline>
                    <CardTitle>
                        <AccountTreeIcon sx={{ color: "#356DF1" }} /> Have an Upline?
                    </CardTitle>
                    <Desc>Enter the referral code of the person who invited you.</Desc>
                    <CodeContainer>
                        <Input placeholder="Referral code" />
                        <Button
                            $main={true}
                            title="Apply Code"
                            // onClick={() => router.push("/courses")}
                        />
                    </CodeContainer>
                </HaveUpline>
                {/* <EarningsCard /> */}
                <EarningsCard>
                    <CardTitle $white={true}>
                        <EmojiEventsIcon /> Your Earnings
                    </CardTitle>
                    <Xp>480.00 XP</Xp>
                    <p>XP earned from successful referrals</p>
                </EarningsCard>
                <RefCodeSection />
                <LeaderboardCard />
                <ReferralSteps />
                {/* <WithdrawalCard /> */}
                <WithdrawalCard>
                    <CardTitle>
                        <PaymentsIcon /> Withdraw XP
                    </CardTitle>
                    <Desc>Convert XP to Naira and withdraw to your bank account.</Desc>
                    <EnrollButton variant="contained">Request Withdrawal</EnrollButton>
                </WithdrawalCard>
            </Main>
        </Container>
    )
}
