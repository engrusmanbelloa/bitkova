"use client"
import { useState } from "react"
import styled from "styled-components"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import PaymentsIcon from "@mui/icons-material/Payments"
import { Skeleton } from "@mui/material"
import EnrollButton from "@/components/EnrollButton"
import Button from "@/components/Button"
import RefCodeSection from "@/components/dashboard/referals/RefCodeSection"
import LeaderboardCard from "@/components/dashboard/referals/LeaderboardCard"
import ReferralSteps from "@/components/dashboard/referals/ReferralSteps"
import WithdrawalModal from "./WithdrawalModal"
import { useAuthReady } from "@/hooks/useAuthReady"
import { useReferralXp } from "@/hooks/referrals/useReferralXp"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
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
const HaveUplineSkeleton = () => {
    return (
        <HaveUpline>
            <CardTitle>
                {/* Icon Skeleton */}
                <Skeleton variant="circular" width={24} height={24} animation="wave" />
                {/* Title Text Skeleton */}
                <Skeleton variant="text" width="150px" height={30} animation="wave" />
            </CardTitle>

            {/* Description Text Skeleton */}
            <Skeleton variant="text" width="90%" animation="wave" />

            <CodeContainer>
                {/* Input Box Skeleton - flex 3 to match your styled Input */}
                <Skeleton
                    variant="rounded"
                    height={35}
                    animation="wave"
                    sx={{ flex: 3, borderRadius: "8px" }}
                />
                {/* Button Skeleton - matching the height of the input */}
                <Skeleton
                    variant="rounded"
                    height={35}
                    width={100}
                    animation="wave"
                    sx={{ borderRadius: "8px" }}
                />
            </CodeContainer>
        </HaveUpline>
    )
}

const EarningsCardSkeleton = () => {
    return (
        <EarningsCard>
            <CardTitle $white={true}>
                {/* The Icon Skeleton */}
                <Skeleton
                    variant="circular"
                    width={24}
                    height={24}
                    animation="wave"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
                />
                {/* The Title Text Skeleton */}
                <Skeleton
                    variant="text"
                    width="120px"
                    animation="wave"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
                />
            </CardTitle>

            <Xp>
                {/* The Big XP Number Skeleton */}
                <Skeleton
                    variant="text"
                    width="40%"
                    height={60}
                    animation="wave"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                />
            </Xp>

            {/* The Description Subtext Skeleton */}
            <Skeleton
                variant="text"
                width="70%"
                animation="wave"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
            />
        </EarningsCard>
    )
}

export default function Referral() {
    const { user, isLoadingUserDoc } = useAuthReady()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [uplineCode, setUplineCode] = useState("")
    const [applied, setApplied] = useState(false)
    const { data: xpData, isLoading: xpLoading } = useReferralXp(user?.id)
    const queryClient = useQueryClient()

    async function applyReferralCode({
        userId,
        referralCode,
    }: {
        userId: string
        referralCode: string
    }) {
        const res = await fetch("/api/referrals/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, referralCode }),
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to apply referral")

        return data
    }
    // Mutation for applying referral
    const applyMutation = useMutation({
        mutationFn: applyReferralCode,
        onMutate: () => {
            // Optimistic UI can show loading immediately
        },
        onError: (err: any) => {
            toast.error(err.message || "Something went wrong")
        },
        onSuccess: () => {
            toast.success("Referral applied successfully")
            setApplied(true)
            queryClient.setQueryData(["userDoc", user?.id], (old: any) => ({
                ...old,
                referredBy: uplineCode,
            }))
        },
    })

    const handleApplyReferral = () => {
        if (!uplineCode.trim()) {
            toast.error("Please enter a referral code")
            return
        }

        applyMutation.mutate({
            userId: user!.id,
            referralCode: uplineCode.trim(),
        })
    }

    const isInputDisabled = applied || applyMutation.isPending
    return (
        <Container>
            <Header>
                <Title>Referral Program</Title>
                <Desc>Share your code, earn rewards, and climb the lederboard</Desc>
            </Header>

            <Main>
                {isLoadingUserDoc ? (
                    <HaveUplineSkeleton />
                ) : (
                    !user?.referredBy && (
                        <HaveUpline>
                            <CardTitle>
                                <AccountTreeIcon sx={{ color: "#356DF1" }} /> Have an Upline?
                            </CardTitle>
                            <Desc>Enter the referral code of the person who invited you.</Desc>
                            <CodeContainer>
                                <Input
                                    placeholder="Referral code"
                                    value={uplineCode}
                                    onChange={(e) => setUplineCode(e.target.value)}
                                    disabled={isInputDisabled}
                                />
                                <Button
                                    $main={true}
                                    // title="Apply Code"
                                    onClick={handleApplyReferral}
                                    title={applyMutation.isPending ? "Applying..." : "Apply Code"}
                                    disabled={isInputDisabled}
                                />
                            </CodeContainer>
                        </HaveUpline>
                    )
                )}

                {/* <EarningsCard /> */}
                {xpLoading ? (
                    <EarningsCardSkeleton />
                ) : (
                    <EarningsCard>
                        <CardTitle $white={true}>
                            <EmojiEventsIcon /> Your Earnings
                        </CardTitle>
                        <Xp>{xpData?.xpBalance.toFixed(2)}</Xp>
                        <p>XP earned from successful referrals</p>
                    </EarningsCard>
                )}
                <RefCodeSection />
                <LeaderboardCard />
                <ReferralSteps />
                {/* <WithdrawalCard /> */}
                <WithdrawalCard>
                    <CardTitle>
                        <PaymentsIcon /> Withdraw XP
                    </CardTitle>
                    <Desc>Convert XP to Naira and withdraw to your bank account.</Desc>
                    <EnrollButton variant="contained" onClick={() => setIsModalOpen(true)}>
                        Request Withdrawal
                    </EnrollButton>
                </WithdrawalCard>
                {isModalOpen && (
                    <WithdrawalModal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        currentXp={200}
                    />
                )}
            </Main>
        </Container>
    )
}
