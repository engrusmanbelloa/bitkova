"use client"
import React from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import { toast } from "sonner"
import EnrollButton from "@/components/EnrollButton"

// Schema for validation
const withdrawalSchema = z.object({
    amountXp: z.number().min(100, "Minimum withdrawal is 100 XP"),
    bankName: z.string().min(1, "Bank name is required"),
    accountNumber: z.string().length(10, "Account number must be 10 digits"),
    accountName: z.string().min(1, "Account name is required"),
})

type WithdrawalFormData = z.infer<typeof withdrawalSchema>

const ConversionBox = styled.div`
    background: ${(props) => props.theme.palette.primary.main}10;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px dashed ${(props) => props.theme.palette.primary.main};
    text-align: center;
`
const ConversionText = styled.p`
    margin: 0;
    font-weight: 600;
    color: ${(props) => props.theme.palette.primary.main};
`
const FormField = styled.div`
    margin-bottom: 16px;
`
const StyledTextField = styled(TextField)`
    && {
        width: 100%;
        .MuiOutlinedInput-root {
            border-radius: 8px;
        }
    }
`
const ErrorMessage = styled.div`
    color: ${(props) => props.theme.mobile.error};
    font-size: 12px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
`

interface WithdrawalModalProps {
    open: boolean
    onClose: () => void
    currentXp: number
}

export default function WithdrawalModal({ open, onClose, currentXp }: WithdrawalModalProps) {
    const xpToNairaRate = 10 // Example: 1 XP = 10 Naira

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<WithdrawalFormData>({
        resolver: zodResolver(withdrawalSchema),
        defaultValues: { amountXp: currentXp },
    })

    const requestedXp = watch("amountXp") || 0
    const nairaValue = requestedXp * xpToNairaRate

    const onSubmit = async (data: WithdrawalFormData) => {
        try {
            // API call logic here
            await new Promise((resolve) => setTimeout(resolve, 1500))
            toast.success("Withdrawal request submitted!")
            onClose()
        } catch (error) {
            toast.error("Failed to process withdrawal.")
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>
                Withdraw Earnings
                <IconButton onClick={onClose} style={{ position: "absolute", right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ConversionBox>
                    <ConversionText>
                        Conversion: {requestedXp} XP = ₦{nairaValue.toLocaleString()}
                    </ConversionText>
                    <small>Rate: 1 XP = ₦{xpToNairaRate}</small>
                </ConversionBox>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField>
                        <StyledTextField
                            {...register("amountXp", { valueAsNumber: true })}
                            label="XP to Withdraw"
                            type="number"
                            variant="outlined"
                            error={!!errors.amountXp}
                        />
                        {errors.amountXp && <ErrorMessage>{errors.amountXp.message}</ErrorMessage>}
                    </FormField>

                    <FormField>
                        <StyledTextField
                            {...register("bankName")}
                            label="Bank Name"
                            variant="outlined"
                            error={!!errors.bankName}
                        />
                        {errors.bankName && <ErrorMessage>{errors.bankName.message}</ErrorMessage>}
                    </FormField>

                    <FormField>
                        <StyledTextField
                            {...register("accountNumber")}
                            label="Account Number"
                            variant="outlined"
                            error={!!errors.accountNumber}
                        />
                        {errors.accountNumber && (
                            <ErrorMessage>{errors.accountNumber.message}</ErrorMessage>
                        )}
                    </FormField>

                    <FormField>
                        <StyledTextField
                            {...register("accountName")}
                            label="Account Name"
                            variant="outlined"
                            error={!!errors.accountName}
                        />
                        {errors.accountName && (
                            <ErrorMessage>{errors.accountName.message}</ErrorMessage>
                        )}
                    </FormField>

                    <EnrollButton type="submit" disabled={isSubmitting}>
                        {isSubmitting
                            ? "Processing..."
                            : `Withdraw ₦${nairaValue.toLocaleString()}`}
                    </EnrollButton>
                </form>
            </DialogContent>
        </Dialog>
    )
}
