import React, { useState } from "react"
import styled from "styled-components"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`
const MetricsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
`
const MetricCard = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    text-align: center;
`
const MetricTitle = styled.p`
    color: #666;
`
const MetricValue = styled.h3`
    margin: 8px 0;
    font-weight: bold;
`
const MetricChange = styled.p<{ $positive?: boolean; $negative?: boolean }>`
    margin: 0;
    padding: 0;
    color: ${(props) => (props.$positive ? "#2ecc71" : props.$negative ? "#e74c3c" : "#888")};
`
const ContentRow = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    flex-direction: column;
`
const Card = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    flex: 1;
    min-width: 300px;
`
const ChartCard = styled(Card)``
const TransactionsCard = styled(Card)`
    flex: 1;
`
const PartnersCard = styled(Card)`
    flex: 1;
    display: flex;
    flex-direction: column;
`
const SectionTitle = styled.h3`
    margin-bottom: 16px;
    color: #333;
`
const FilterButtons = styled.div`
    margin-bottom: 12px;
`
const FilterButton = styled.button`
    background: none;
    border: 1px solid #888;
    color: #888;
    padding: 6px 12px;
    margin-right: 8px;
    border-radius: 4px;
    cursor: pointer;
    &.active {
        background: #888;
        color: #fff;
    }
`
const ChartContainer = styled.div`
    width: 100%;
    height: 300px;
`
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    th {
        text-align: left;
        padding: 8px;
        color: #555;
        border-bottom: 1px solid #ddd;
    }
    td {
        padding: 8px;
        border-bottom: 1px solid #eee;
    }
`
const StatusBadge = styled.span<{ $status: string }>`
    background-color: ${(props) =>
        props.$status === "Completed"
            ? "#2ecc71"
            : props.$status === "Pending"
              ? "#f1c40f"
              : "#e74c3c"};
    color: #fff;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    text-transform: uppercase;
`
const PartnerItem = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
`
const Avatar = styled.div`
    width: 40px;
    height: 40px;
    background-color: #888;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
`
const PartnerInfo = styled.div`
    flex: 1;
`
const PartnerName = styled.div`
    font-weight: 500;
    color: #333;
`
const PartnerEmail = styled.div`
    font-size: 0.85rem;
    color: #666;
`
const PartnerLocation = styled.div`
    font-size: 0.85rem;
    color: #666;
`

export default function DashboardOverview() {
    // const DashboardContent: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<"7d" | "30d" | "90d">("7d")

    // Dummy data for chart
    const data7 = [
        { date: "Day 1", sales: 50 },
        { date: "Day 2", sales: 80 },
        { date: "Day 3", sales: 65 },
        { date: "Day 4", sales: 90 },
        { date: "Day 5", sales: 100 },
        { date: "Day 6", sales: 120 },
        { date: "Day 7", sales: 140 },
    ]
    const data30 = Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        sales: Math.floor(Math.random() * 100) + 50,
    }))
    const data90 = Array.from({ length: 90 }, (_, i) => ({
        date: `Day ${i + 1}`,
        sales: Math.floor(Math.random() * 100) + 50,
    }))

    const chartData = activeFilter === "7d" ? data7 : activeFilter === "30d" ? data30 : data90

    // Dummy data for transactions
    const transactions = [
        {
            id: 1,
            status: "Completed",
            payment: "PayPal",
            amount: "$150.00",
            date: "2023-08-15",
            bank: "Wells Fargo",
        },
        {
            id: 2,
            status: "Pending",
            payment: "Stripe",
            amount: "$220.00",
            date: "2023-08-14",
            bank: "Bank of America",
        },
        {
            id: 3,
            status: "Canceled",
            payment: "Credit Card",
            amount: "$99.99",
            date: "2023-08-13",
            bank: "Chase",
        },
    ]

    // Dummy data for new partners
    const partners = [
        { id: 1, name: "John Doe", email: "john@example.com", location: "New York" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", location: "Los Angeles" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", location: "Chicago" },
    ]

    return (
        <Container>
            {/* Top Metrics */}
            <MetricsContainer>
                <MetricCard>
                    <MetricTitle>Total Sales</MetricTitle>
                    <MetricValue>$5,430</MetricValue>
                    <MetricChange $positive>+12.5%</MetricChange>
                </MetricCard>
                <MetricCard>
                    <MetricTitle>Total Students</MetricTitle>
                    <MetricValue>1,250</MetricValue>
                    <MetricChange $positive>+5.2%</MetricChange>
                </MetricCard>
                <MetricCard>
                    <MetricTitle>New Students</MetricTitle>
                    <MetricValue>85</MetricValue>
                    <MetricChange $positive>+8.9%</MetricChange>
                </MetricCard>
                <MetricCard>
                    <MetricTitle>Total Certificates</MetricTitle>
                    <MetricValue>320</MetricValue>
                    <MetricChange $negative>-3.1%</MetricChange>
                </MetricCard>
            </MetricsContainer>

            {/* Chart and Transactions */}
            <ContentRow>
                <ChartCard>
                    <SectionTitle>Course Sales Report</SectionTitle>
                    <FilterButtons>
                        <FilterButton
                            className={activeFilter === "7d" ? "active" : ""}
                            onClick={() => setActiveFilter("7d")}
                        >
                            7D
                        </FilterButton>
                        <FilterButton
                            className={activeFilter === "30d" ? "active" : ""}
                            onClick={() => setActiveFilter("30d")}
                        >
                            30D
                        </FilterButton>
                        <FilterButton
                            className={activeFilter === "90d" ? "active" : ""}
                            onClick={() => setActiveFilter("90d")}
                        >
                            90D
                        </FilterButton>
                    </FilterButtons>
                    <ChartContainer>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <XAxis dataKey="date" tick={{ fill: "#888" }} />
                                <YAxis tick={{ fill: "#888" }} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                    dot={{ r: 3 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </ChartCard>
            </ContentRow>

            {/* New Partners */}
            <ContentRow>
                <TransactionsCard>
                    <SectionTitle>Recent Transactions</SectionTitle>
                    <Table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Bank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.id}>
                                    <td>
                                        <StatusBadge $status={tx.status}>{tx.status}</StatusBadge>
                                    </td>
                                    <td>{tx.payment}</td>
                                    <td>{tx.amount}</td>
                                    <td>{tx.date}</td>
                                    <td>{tx.bank}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TransactionsCard>
                <PartnersCard>
                    <SectionTitle>New Partners</SectionTitle>
                    {partners.map((partner) => (
                        <PartnerItem key={partner.id}>
                            <Avatar>{partner.name.charAt(0)}</Avatar>
                            <PartnerInfo>
                                <PartnerName>{partner.name}</PartnerName>
                                <PartnerEmail>{partner.email}</PartnerEmail>
                            </PartnerInfo>
                            <PartnerLocation>{partner.location}</PartnerLocation>
                        </PartnerItem>
                    ))}
                </PartnersCard>
            </ContentRow>
        </Container>
    )
}
