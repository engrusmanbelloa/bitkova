"use client"
import React, { useState } from "react"
import styled from "styled-components"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Button,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"

const AdminContainer = styled.div`
    padding: 30px;
    min-height: 100vh;
`
const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`
const StyledTableContainer = styled(TableContainer as any)`
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`
const StatusChip = styled(Chip)<{ status: string }>`
    && {
        background-color: ${(props) =>
            props.status === "completed"
                ? "#E8F5E9"
                : props.status === "pending"
                  ? "#FFF3E0"
                  : "#FFEBEE"};
        color: ${(props) =>
            props.status === "completed"
                ? "#2E7D32"
                : props.status === "pending"
                  ? "#E65100"
                  : "#C62828"};
        font-weight: 600;
        text-transform: capitalize;
    }
`

const mockPayouts = [
    {
        id: 1,
        user: "Sarah M.",
        xp: 400,
        amount: 4000,
        bank: "GTBank",
        acc: "0123456789",
        status: "pending",
    },
    {
        id: 2,
        user: "James K.",
        xp: 1000,
        amount: 10000,
        bank: "Zenith",
        acc: "9876543210",
        status: "completed",
    },
]

export default function Payouts() {
    const [payouts, setPayouts] = useState(mockPayouts)

    const handleAction = (id: number, newStatus: string) => {
        setPayouts((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
    }

    return (
        <AdminContainer>
            <PageHeader>
                <h2>Payout Management</h2>
                <p>Total Pending: {payouts.filter((p) => p.status === "pending").length}</p>
            </PageHeader>

            <StyledTableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>XP / Amount</TableCell>
                            <TableCell>Bank Details</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payouts.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <strong>{row.user}</strong>
                                </TableCell>
                                <TableCell>
                                    {row.xp} XP <br />
                                    <small>₦{row.amount.toLocaleString()}</small>
                                </TableCell>
                                <TableCell>
                                    {row.bank} <br />
                                    <small>{row.acc}</small>
                                </TableCell>
                                <TableCell>
                                    <StatusChip status={row.status} label={row.status} />
                                </TableCell>
                                <TableCell align="center">
                                    {row.status === "pending" && (
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "8px",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleAction(row.id, "completed")}
                                                startIcon={<CheckCircleIcon />}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleAction(row.id, "rejected")}
                                                startIcon={<CancelIcon />}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </AdminContainer>
    )
}
