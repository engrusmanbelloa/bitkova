// components/admin/quotes/AdminQuotesPanel.tsx
"use client"
import { useState } from "react"
import styled from "styled-components"
import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { auth } from "@/lib/firebase/client"
import { QuoteRequest } from "@/types/quotes/quoteTypes"
import { formatDate } from "@/utils/formatDate"
import { toDate } from "@/utils/formatDate"
import { toast } from "sonner"
import TextField from "@mui/material/TextField"
import CircularProgress from "@mui/material/CircularProgress"
import { mobile } from "@/responsive"

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
    background: ${(p) =>
        p.$status === "pending"
            ? "#fef3c7"
            : p.$status === "quoted"
              ? "#e8f4fd"
              : p.$status === "in_progress"
                ? "#ede9fe"
                : p.$status === "completed"
                  ? "#dcfce7"
                  : "#f3f4f6"};
    color: ${(p) =>
        p.$status === "pending"
            ? "#92400e"
            : p.$status === "quoted"
              ? "#1565c0"
              : p.$status === "in_progress"
                ? "#5b21b6"
                : p.$status === "completed"
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
    background: #1565c0;
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

function AdminQuoteCard({ quote }: { quote: QuoteRequest }) {
    const [price, setPrice] = useState("")
    const [note, setNote] = useState("")
    const [loading, setLoading] = useState(false)

    const handleRespond = async () => {
        if (!price || isNaN(Number(price))) return toast.error("Enter a valid price")
        setLoading(true)
        try {
            const token = await auth.currentUser?.getIdToken()
            const res = await fetch("/api/admin/quotes/respond", {
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
                    <Btn onClick={handleRespond} disabled={loading}>
                        {loading ? "Sending..." : "Send Quote"}
                    </Btn>
                </QuoteForm>
            )}
        </Card>
    )
}

export default function AdminQuotesPanel() {
    const { data: quotes, isLoading } = useQuery({
        queryKey: ["adminQuotes"],
        queryFn: async () => {
            const q = query(collection(db!, "quoteRequests"), orderBy("createdAt", "desc"))
            const snap = await getDocs(q)
            return snap.docs.map((d) => {
                const data = d.data()
                return {
                    ...data,
                    createdAt: toDate(data.createdAt),
                    updatedAt: toDate(data.updatedAt),
                    quotedAt: toDate(data.quotedAt),
                } as QuoteRequest
            })
        },
        staleTime: 60 * 1000,
    })

    if (isLoading) return <CircularProgress />

    const pending = quotes?.filter((q) => q.status === "pending") ?? []
    const others = quotes?.filter((q) => q.status !== "pending") ?? []

    return (
        <QuotesContainer>
            <Title>Quote Requests ({quotes?.length ?? 0})</Title>
            {pending.length > 0 && (
                <>
                    <h4 style={{ color: "#92400e", margin: "0 0 12px" }}>
                        ⏳ Needs Response ({pending.length})
                    </h4>
                    {pending.map((q) => (
                        <AdminQuoteCard key={q.id} quote={q} />
                    ))}
                </>
            )}
            {others.length > 0 && (
                <>
                    <h4 style={{ margin: "20px 0 12px" }}>All Quotes</h4>
                    {others.map((q) => (
                        <AdminQuoteCard key={q.id} quote={q} />
                    ))}
                </>
            )}
        </QuotesContainer>
    )
}
