"use client"
import styled from "styled-components"
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    FormHelperText,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { toast } from "sonner"
import { cohortSchema } from "@/lib/schemas/classSchema"
import { z } from "zod"

const FormCard = styled(Card)`
    margin-bottom: 0 auto 30px;
    box-sizing: border-box;
    padding: 10px;
`
const FormRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
`
const SubmitButton = styled(Button)`
    background: ${(props) => props.theme.palette.primary.main};
    color: white;
    padding: 12px 32px;
    font-weight: 600;
    margin-top: 20px;

    &:hover {
        background: ${(props) => props.theme.palette.primary.main};
        opacity: 0.9;
    }
`
const HeaderTitle = styled.h3`
    font-weight: 500;
    margin-bottom: 5px;
    color: ${(props) => props.theme.palette.common.black};
`
type CohortForm = z.infer<typeof cohortSchema>

export default function CreateCohort() {
    const cohortForm = useForm<CohortForm>({
        resolver: zodResolver(cohortSchema),
        defaultValues: {
            name: "",
            quarter: "Q1",
            year: new Date().getFullYear(),
            startDate: "",
            endDate: "",
            registrationOpen: "",
            registrationClose: "",
            status: "upcoming",
        },
    })

    const onCohortSubmit = async (data: CohortForm) => {
        try {
            const cohortData = {
                ...data,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                registrationOpen: new Date(data.registrationOpen),
                registrationClose: new Date(data.registrationClose),
            }

            await addDoc(collection(db, "cohorts"), cohortData)
            toast.success(`Cohort ${data.name} created successfully!`)
            cohortForm.reset()
        } catch (error) {
            console.log("Error creating cohort:", error)
            toast.error("Failed to create cohort")
        }
    }

    return (
        <FormCard>
            <HeaderTitle>Create New Cohort</HeaderTitle>
            <form onSubmit={cohortForm.handleSubmit(onCohortSubmit)}>
                <FormRow>
                    <Controller
                        name="name"
                        control={cohortForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Cohort Name"
                                placeholder="e.g., Bitkova 2026A"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="quarter"
                        control={cohortForm.control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error}>
                                <InputLabel>Quarter</InputLabel>
                                <Select {...field} label="Quarter">
                                    <MenuItem value="Q1">Q1</MenuItem>
                                    <MenuItem value="Q2">Q2</MenuItem>
                                    <MenuItem value="Q3">Q3</MenuItem>
                                    <MenuItem value="Q4">Q4</MenuItem>
                                </Select>
                                {fieldState.error && (
                                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="year"
                        control={cohortForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Year"
                                type="number"
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    />
                </FormRow>

                <FormRow>
                    <Controller
                        name="startDate"
                        control={cohortForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Start Date"
                                type="date"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="endDate"
                        control={cohortForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="End Date"
                                type="date"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        )}
                    />
                </FormRow>

                <FormRow>
                    <Controller
                        name="registrationOpen"
                        control={cohortForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Registration Opens"
                                type="date"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="registrationClose"
                        control={cohortForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Registration Closes"
                                type="date"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="status"
                        control={cohortForm.control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error}>
                                <InputLabel>Status</InputLabel>
                                <Select {...field} label="Status">
                                    <MenuItem value="upcoming">Upcoming</MenuItem>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="closed">Closed</MenuItem>
                                </Select>
                                {fieldState.error && (
                                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </FormRow>

                <SubmitButton type="submit" variant="contained">
                    Create Cohort
                </SubmitButton>
            </form>
        </FormCard>
    )
}
