// components/admin/quotes/AdminQuotesPanel.tsx
"use client"
import styled from "styled-components"
import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { QuoteRequest } from "@/types/quotes/quoteTypes"
import { toDate } from "@/utils/formatDate"
import CircularProgress from "@mui/material/CircularProgress"
import AdminQuoteCard from "./AdminQuoteCard"
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
