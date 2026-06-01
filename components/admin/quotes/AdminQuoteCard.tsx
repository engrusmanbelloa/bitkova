// components/admin/quotes/AdminQuoteCard.tsx
"use client"
import { useState } from "react"
import styled from "styled-components"
import { auth } from "@/lib/firebase/client"
import { QuoteRequest } from "@/types/quotes/quoteTypes"
import { formatDate } from "@/utils/formatDate"
import { toast } from "sonner"
import TextField from "@mui/material/TextField"
import EnrollButton from "@/components/EnrollButton"

const Card = styled.div`
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    background: #fff;
`
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
`
const Label = styled.span`
    font-size: 12px;
    color: #888;
    display: block;
    margin-bottom: 2px;
`
const Value = styled.span`
    font-size: 14px;
    font-weight: 500;
`
const StatusBadge = styled.span<{ $status: string }>`
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
    background: ${(props) =>
        props.$status === "pending"
            ? "#fef3c7"
            : props.$status === "quoted"
              ? "#e8f4fd"
              : props.$status === "in_progress"
                ? "#ede9fe"
                : props.$status === "completed"
                  ? "#dcfce7"
                  : "#f3f4f6"};
    color: ${(props) =>
        props.$status === "pending"
            ? "#92400e"
            : props.$status === "quoted"
              ? "#1565c0"
              : props.$status === "in_progress"
                ? "#5b21b6"
                : props.$status === "completed"
                  ? "#166534"
                  : "#555"};
`
const QuoteForm = styled.div`
    margin-top: 14px;
    padding: 14px;
    background: #f9f9f9;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const Btn = styled.button`
    padding: 9px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: ${(props) => props.theme.palette.primary.main};
    color: #fff;
    &:hover {
        opacity: 0.85;
    }
    &:disabled {
        opacity: 0.5;
    }
`
const PaymentRow = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 8px;
`
const PayItem = styled.div`
    font-size: 13px;
    span {
        font-weight: 600;
        color: #00796b;
    }
`
export default function AdminQuoteCard({ quote }: { quote: QuoteRequest }) {
    const [price, setPrice] = useState("")
    const [note, setNote] = useState("")
    const [loading, setLoading] = useState(false)

    const handleRespond = async () => {
        if (!price || isNaN(Number(price))) return toast.error("Enter a valid price")
        setLoading(true)
        try {
            const token = await auth.currentUser?.getIdToken()
            const res = await fetch("/api/quotes/respond", {
                // api/admin/quotes/respond app/api/quotes/respond/route.ts
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    quoteId: quote.id,
                    quotedPrice: Number(price),
                    adminNote: note,
                }),
            })
            if (!res.ok) throw new Error("Failed")
            toast.success("Quote sent to user")
        } catch {
            toast.error("Failed to send quote")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <Row>
                <div>
                    <Label>Organization</Label>
                    <Value>{quote.orgName}</Value>
                </div>
                <StatusBadge $status={quote.status}>{quote.status.replace("_", " ")}</StatusBadge>
            </Row>
            <Row>
                <div>
                    <Label>Service</Label>
                    <Value>{quote.service}</Value>
                </div>
                <div>
                    <Label>Email</Label>
                    <Value>{quote.email}</Value>
                </div>
                <div>
                    <Label>Phone</Label>
                    <Value>{quote.phone}</Value>
                </div>
                <div>
                    <Label>Submitted</Label>
                    <Value>{formatDate(quote.createdAt)}</Value>
                </div>
            </Row>
            <div>
                <Label>Details</Label>
                <Value>{quote.details}</Value>
            </div>

            {/* Payment tracking */}
            {quote.quotedPrice && (
                <PaymentRow>
                    <PayItem>
                        Total: <span>₦{quote.quotedPrice.toLocaleString()}</span>
                    </PayItem>
                    <PayItem>
                        Commitment (25%):{" "}
                        <span>₦{(quote.commitmentAmount ?? 0).toLocaleString()}</span>
                        {quote.commitmentPaid ? " ✅" : " ⏳"}
                    </PayItem>
                    <PayItem>
                        Balance (75%): <span>₦{(quote.balanceAmount ?? 0).toLocaleString()}</span>
                        {quote.balancePaid ? " ✅" : " ⏳"}
                    </PayItem>
                </PaymentRow>
            )}

            {/* Respond form — only for pending quotes */}
            {quote.status === "pending" && (
                <QuoteForm>
                    <Label>Send Quote to User</Label>
                    <TextField
                        size="small"
                        label="Total Price (₦)"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        size="small"
                        label="Note to user (optional)"
                        multiline
                        rows={2}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <EnrollButton
                        type="submit"
                        onClick={handleRespond}
                        disabled={loading}
                        variant="contained"
                    >
                        {loading ? "Sending..." : "Send Quote"}
                    </EnrollButton>
                    {/* <Btn onClick={handleRespond} disabled={loading}>
                        {loading ? "Sending..." : "Send Quote"}
                    </Btn> */}
                </QuoteForm>
            )}
        </Card>
    )
}
