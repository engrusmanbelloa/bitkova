// components/dashboard/QuotesTab.tsx
"use client"
import { useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/navigation"
// import { useFetchUserQuotes } from "@/hooks/quotes/useFetchUserQuotes"
import { usePaystackPayment } from "react-paystack"
import { QuoteRequest } from "@/types/quotes/quoteTypes"
import { formatDate } from "@/utils/formatDate"
import { toast } from "sonner"
import { User } from "@/types/userType"
import CircularProgress from "@mui/material/CircularProgress"
import { mobile } from "@/responsive"
import { useUserStore } from "@/lib/store/useUserStore"
import TestModeWarning from "@/components/payments/TestModeWarning"

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
    pending: { bg: "#fef3c7", color: "#92400e", label: "Pending Review" },
    quoted: { bg: "#e8f4fd", color: "#1565c0", label: "Quote Ready" },
    accepted: { bg: "#e8fdf4", color: "#00796b", label: "Accepted" },
    in_progress: { bg: "#ede9fe", color: "#5b21b6", label: "In Progress" },
    completed: { bg: "#dcfce7", color: "#166534", label: "Completed" },
    declined: { bg: "#fee2e2", color: "#991b1b", label: "Declined" },
}

//Page shell
const QuotesContainer = styled.div`
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
const PageSub = styled.p`
    font-size: 14px;
    color: ${(props) => props.theme.palette.common.black};
    margin: 0;
`

const Card = styled.div`
    border: 1px solid ${(p) => p.theme.palette.divider ?? "#eee"};
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    background: ${(p) => p.theme.palette.common.white};
`
const CardTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    flex-wrap: wrap;
    gap: 8px;
`
const ServiceName = styled.h4`
    margin: 0;
    color: ${(p) => p.theme.palette.common.black};
`
const StatusBadge = styled.span<{ $bg: string; $color: string }>`
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
    background: ${(p) => p.$bg};
    color: ${(p) => p.$color};
`
const Detail = styled.p`
    font-size: 13px;
    color: ${(p) => p.theme.palette.text?.secondary ?? "#666"};
    margin: 0 0 6px;
`
const QuoteBox = styled.div`
    margin-top: 14px;
    padding: 14px;
    background: ${(p) => p.theme.palette.action?.hover ?? "#f9f9f9"};
    border-radius: 8px;
`
const QuoteTitle = styled.p`
    font-size: 13px;
    font-weight: 600;
    margin: 0 0 8px;
`
const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 10px;
`
const PriceItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`
const PriceLabel = styled.span`
    font-size: 11px;
    color: ${(p) => p.theme.palette.text?.secondary ?? "#888"};
`
const PriceValue = styled.span`
    font-size: 15px;
    font-weight: 700;
    color: ${(p) => p.theme.palette.common.black};
`
const AdminNote = styled.p`
    font-size: 13px;
    color: ${(p) => p.theme.palette.text?.secondary ?? "#666"};
    margin: 0 0 12px;
`
const BtnRow = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`
const Btn = styled.button<{ $primary?: boolean }>`
    padding: 9px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: ${(p) => (p.$primary ? "none" : `1px solid ${p.theme.palette.primary?.main}`)};
    background: ${(p) => (p.$primary ? p.theme.palette.primary?.main : "transparent")};
    color: ${(p) => (p.$primary ? "#fff" : p.theme.palette.primary?.main)};
    &:hover {
        opacity: 0.85;
    }
`
const Empty = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: ${(p) => p.theme.palette.text?.secondary ?? "#888"};
`

interface QuoteCardProps {
    quote: QuoteRequest
    user: User
}

function QuoteCard({ quote, user }: QuoteCardProps) {
    const router = useRouter()
    const status = STATUS_COLORS[quote.status] ?? STATUS_COLORS.pending
    const quotes = useUserStore((s) => s.quotes)
    const { updateQuote } = useUserStore()

    const commitmentConfig = {
        reference: `BIT-QUOTE_COMMITMENT-${Date.now()}-${user.id}`,
        email: user.email,
        amount: (quote.commitmentAmount ?? 0) * 100,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        metadata: {
            userId: user.id,
            classType: "quote_commitment",
            itemIds: [quote.id],
            custom_fields: [
                {
                    display_name: "Email",
                    value: user?.email || "",
                    variable_name: "user_email",
                },
                {
                    display_name: "Phone",
                    value: user?.phoneNumber || "N/A",
                    variable_name: "user_phone",
                },
                {
                    display_name: "Payment Type",
                    value: "Commitment",
                    variable_name: "payment_type",
                },
                {
                    display_name: "Service Name",
                    value: quote.service,
                    variable_name: "service_name",
                },
            ],
        },
    }

    const balanceConfig = {
        reference: `BIT-QUOTE_BALANCE-${Date.now()}-${user.id}`,
        email: user.email,
        amount: (quote.balanceAmount ?? 0) * 100,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        metadata: {
            userId: user.id,
            paymentType: "quote_balance",
            itemIds: [quote.id],
            custom_fields: [
                {
                    display_name: "Email",
                    value: user?.email || "",
                    variable_name: "user_email",
                },
                {
                    display_name: "Phone",
                    value: user?.phoneNumber || "N/A",
                    variable_name: "user_phone",
                },
                {
                    display_name: "Payment Type",
                    value: "Balance",
                    variable_name: "payment_type",
                },
                {
                    display_name: "Service Name",
                    value: quote.service,
                    variable_name: "service_name",
                },
            ],
        },
    }

    const initCommitment = usePaystackPayment(commitmentConfig)
    const initBalance = usePaystackPayment(balanceConfig)

    const handleCommitment = () => {
        initCommitment({
            onSuccess: () => {
                updateQuote(quote.id, {
                    status: "in_progress",
                    commitmentPaid: true,
                    commitmentPaidAt: new Date(),
                })
                toast.success("Commitment paid! Work begins shortly.")
            },
            onClose: () => toast("Payment cancelled"),
            ...commitmentConfig,
        })
    }

    const handleBalance = () => {
        initBalance({
            onSuccess: () => {
                updateQuote(quote.id, {
                    status: "completed",
                    balancePaid: true,
                    balancePaidAt: new Date(),
                })
                toast.success("Balance paid! Project completed.")
            },
            onClose: () => toast("Payment cancelled"),
            ...balanceConfig,
        })
    }

    const SERVICE_LABELS: Record<string, string> = {
        web: "Web & App Development",
        blockchain: "Blockchain Development",
        design: "Graphics & UI/UX Design",
        event: "Event Hosting",
    }

    return (
        <Card>
            <CardTop>
                <ServiceName>{SERVICE_LABELS[quote.service] ?? quote.service}</ServiceName>
                <StatusBadge $bg={status.bg} $color={status.color}>
                    {status.label}
                </StatusBadge>
            </CardTop>

            <Detail>
                <strong>Org:</strong> {quote.orgName}
            </Detail>
            <Detail>
                <strong>Submitted:</strong> {formatDate(quote.createdAt)}
            </Detail>
            {quote.details && (
                <Detail>
                    <strong>Details:</strong> {quote.details}
                </Detail>
            )}

            {/* Show quote when admin has responded */}
            {quote.quotedPrice && (
                <QuoteBox>
                    <QuoteTitle>📋 Quote from Bitkova</QuoteTitle>
                    {quote.adminNote && <AdminNote>{quote.adminNote}</AdminNote>}
                    <PriceRow>
                        <PriceItem>
                            <PriceLabel>Total</PriceLabel>
                            <PriceValue>₦{quote.quotedPrice.toLocaleString()}</PriceValue>
                        </PriceItem>
                        <PriceItem>
                            <PriceLabel>Commitment (25%)</PriceLabel>
                            <PriceValue
                                style={{ color: quote.commitmentPaid ? "#00796b" : undefined }}
                            >
                                ₦{(quote.commitmentAmount ?? 0).toLocaleString()}
                                {quote.commitmentPaid && " ✓"}
                            </PriceValue>
                        </PriceItem>
                        <PriceItem>
                            <PriceLabel>Balance (75%)</PriceLabel>
                            <PriceValue
                                style={{ color: quote.balancePaid ? "#00796b" : undefined }}
                            >
                                ₦{(quote.balanceAmount ?? 0).toLocaleString()}
                                {quote.balancePaid && " ✓"}
                            </PriceValue>
                        </PriceItem>
                    </PriceRow>
                    <TestModeWarning />
                    <BtnRow>
                        {quote.status === "quoted" && !quote.commitmentPaid && (
                            <Btn $primary onClick={handleCommitment}>
                                Pay 25% Commitment — ₦
                                {(quote.commitmentAmount ?? 0).toLocaleString()}
                            </Btn>
                        )}
                        {quote.status === "in_progress" && !quote.balancePaid && (
                            <Btn $primary onClick={handleBalance}>
                                Pay Remaining Balance — ₦
                                {(quote.balanceAmount ?? 0).toLocaleString()}
                            </Btn>
                        )}
                        {quote.status === "completed" && (
                            <Detail style={{ color: "#166534", fontWeight: 600 }}>
                                Project completed — {formatDate(quote.balancePaidAt)}
                            </Detail>
                        )}
                    </BtnRow>
                </QuoteBox>
            )}
        </Card>
    )
}

export default function QuotesTab({ user }: { user: User }) {
    // const { data: quotes, isLoading } = useFetchUserQuotes(user.id)
    const quotes = useUserStore((s) => s.quotes)

    // if (isLoading) return <CircularProgress />

    return (
        <QuotesContainer>
            <Title>My Quote Requests</Title>
            {!quotes?.length ? (
                <Empty>
                    <p>No quote requests yet.</p>
                    <p>
                        Visit our <a href="/partnership">Partnership page</a> to request a quote.
                    </p>
                </Empty>
            ) : (
                quotes.map((q) => <QuoteCard key={q.id} quote={q} user={user} />)
            )}
        </QuotesContainer>
    )
}
