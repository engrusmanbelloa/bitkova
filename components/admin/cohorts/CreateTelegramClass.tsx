// components/admin/cohorts/CreateTelegramClass.tsx
"use client"
import styled from "styled-components"
import { useState, useEffect } from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { telegramClassSchema } from "@/lib/schemas/classSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { toast } from "sonner"
import {
    TextField,
    Button,
    Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    CircularProgress,
} from "@mui/material"
import { z } from "zod"
import { useQuery } from "@tanstack/react-query"
import { Cohort } from "@/types/classTypes"
import { useFetchCohorts } from "@/hooks/classes/useFetchCohorts"

const FormCard = styled(Card)`
    margin-bottom: 0 auto 30px;
    padding: 10px;
    box-sizing: border-box;
`
const FormRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
`
const FullWidthField = styled.div`
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
const ArrayInput = styled.div`
    margin-bottom: 20px;
`
const ArrayItemContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    align-items: flex-start;
`
const RemoveButton = styled(Button)`
    min-width: 40px;
    color: #ef4444;
    margin-top: 8px;
`
const AddButton = styled(Button)`
    color: ${(props) => props.theme.palette.primary.main};
    border-color: ${(props) => props.theme.palette.primary.main};
`
const SectionTitle = styled.h4`
    margin: 20px 0 10px;
    color: ${(props) => props.theme.palette.common.black};
`
const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`
const CohortInfo = styled.div`
    padding: 12px;
    background: #f0f9ff;
    border-radius: 6px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #0369a1;
`
const HelpText = styled.div`
    padding: 12px;
    background: #fef3c7;
    border-radius: 6px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #92400e;
`

type TelegramClassForm = z.infer<typeof telegramClassSchema>

export default function CreateTelegramClass() {
    const [telegramGroups, setTelegramGroups] = useState<{ chatId: string; title: string }[]>([])
    // Fetch available cohorts
    const { data: cohorts, isLoading: cohortsLoading, error: cohortsError } = useFetchCohorts()
    // Telegram Class Form
    const telegramForm = useForm<TelegramClassForm>({
        resolver: zodResolver(telegramClassSchema),
        defaultValues: {
            name: "Telegram Online Class",
            cohortId: "",
            price: 0,
            capacity: 100,
            telegramGroupId: "",
            modules: [{ value: "" }],
        },
    })

    const {
        fields: moduleFields,
        append: appendModule,
        remove: removeModule,
    } = useFieldArray({
        control: telegramForm.control,
        name: "modules",
    })

    // Watch selected cohort to show info
    const selectedCohortId = telegramForm.watch("cohortId")
    const selectedCohort = cohorts?.find((c) => c.id === selectedCohortId)

    const onTelegramClassSubmit = async (data: TelegramClassForm) => {
        try {
            const classData = {
                name: data.name,
                cohortId: data.cohortId,
                price: data.price,
                capacity: data.capacity,
                enrolled: 0,
                modules: data.modules.map((m) => m.value),
                telegramGroupId: data.telegramGroupId,
            }

            await addDoc(collection(db, "telegramClasses"), classData)
            toast.success("Telegram class created successfully!")
            telegramForm.reset()
        } catch (error) {
            console.log("Error creating telegram class:", error)
            toast.error("Failed to create telegram class")
        }
    }

    useEffect(() => {
        async function loadGroups() {
            const snap = await getDocs(collection(db, "telegramGroups"))
            const groups = snap.docs.map((doc) => doc.data()) as any[]
            setTelegramGroups(groups)
        }
        loadGroups()
    }, [])

    if (cohortsLoading) {
        return (
            <FormCard>
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            </FormCard>
        )
    }

    if (!cohorts || cohorts.length === 0) {
        return (
            <FormCard>
                <h2>Add Telegram Class</h2>
                <p style={{ color: "#ef4444" }}>
                    No cohorts available. Please create a cohort first.
                </p>
            </FormCard>
        )
    }

    return (
        <FormCard>
            <h2>Add Telegram Class</h2>

            <form onSubmit={telegramForm.handleSubmit(onTelegramClassSubmit)}>
                <FormRow>
                    <Controller
                        name="name"
                        control={telegramForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Class Name"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="cohortId"
                        control={telegramForm.control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error}>
                                <InputLabel>Select Cohort</InputLabel>
                                <Select {...field} label="Select Cohort">
                                    {cohorts.map((cohort) => (
                                        <MenuItem key={cohort.id} value={cohort.id}>
                                            {cohort.name} ({cohort.quarter} {cohort.year}) -{" "}
                                            {cohort.status}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {fieldState.error && (
                                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </FormRow>

                {selectedCohort && (
                    <CohortInfo>
                        <strong>Selected Cohort Details:</strong>
                        <br />
                        📅 Duration: {new Date(
                            selectedCohort.startDate,
                        ).toLocaleDateString()} -{" "}
                        {new Date(selectedCohort.endDate).toLocaleDateString()}
                        <br />
                        📝 Registration:{" "}
                        {new Date(selectedCohort.registrationOpen).toLocaleDateString()} -{" "}
                        {new Date(selectedCohort.registrationClose).toLocaleDateString()}
                        <br />
                        📊 Status: {selectedCohort.status.toUpperCase()}
                    </CohortInfo>
                )}

                <FormRow>
                    <Controller
                        name="price"
                        control={telegramForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Price (₦)"
                                type="number"
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="capacity"
                        control={telegramForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Capacity"
                                type="number"
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    />

                    {/* <Controller
                        name="telegramGroupId"
                        control={telegramForm.control}
                        render={({ field, fieldState }) => (
                            // <TextField
                            //     {...field}
                            //     label="Telegram Group ID"
                            //     placeholder="e.g., -100123456789"
                            //     error={!!fieldState.error}
                            //     helperText={fieldState.error?.message}
                            //     fullWidth
                            // />
                            <Select>
                                {telegramGroups.map((g) => (
                                    <MenuItem key={g.chatId} value={g.chatId}>
                                        {g.title} ({g.chatId})
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    /> */}
                    <Controller
                        name="telegramGroupId"
                        control={telegramForm.control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error}>
                                <InputLabel>Telegram Group</InputLabel>
                                <Select {...field} label="Telegram Group">
                                    {telegramGroups.map((g) => (
                                        <MenuItem key={g.chatId} value={g.chatId}>
                                            {g.title} ({g.chatId})
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{fieldState.error?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </FormRow>

                <ArrayInput>
                    <SectionTitle>Course Modules</SectionTitle>
                    {moduleFields.map((field, index) => (
                        <ArrayItemContainer key={field.id}>
                            <Controller
                                name={`modules.${index}.value`}
                                control={telegramForm.control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Module name"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                    />
                                )}
                            />
                            {moduleFields.length > 1 && (
                                <RemoveButton onClick={() => removeModule(index)}>✕</RemoveButton>
                            )}
                        </ArrayItemContainer>
                    ))}
                    <AddButton variant="outlined" onClick={() => appendModule({ value: "" })}>
                        + Add Module
                    </AddButton>
                </ArrayInput>

                <SubmitButton type="submit" variant="contained">
                    Create Telegram Class
                </SubmitButton>
            </form>
        </FormCard>
    )
}
