// components/admin/cohorts/CreateTelegramClass.tsx
"use client"
import styled from "styled-components"
import { useState, useEffect } from "react"
import { useForm, Controller, useFieldArray, SubmitHandler } from "react-hook-form"
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
import EventAvailableIcon from "@mui/icons-material/EventAvailable"
import AppRegistrationIcon from "@mui/icons-material/AppRegistration"
import AssessmentIcon from "@mui/icons-material/Assessment"
import InfoIcon from "@mui/icons-material/Info"
import { z } from "zod"
import { useQuery } from "@tanstack/react-query"
import { Cohort } from "@/types/classTypes"
import { useFetchCohorts } from "@/hooks/classes/useFetchCohorts"
import { createTelegramClass } from "@/lib/firebase/uploads/CreateClasseDoc"
import { useFetchTelegramGroups } from "@/hooks/classes/useFetchTgGroups"

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
    margin-bottom: 0px;
    align-items: flex-start;
`
const RemoveButton = styled(Button)`
    min-width: 40px;
    color: #ef4444;
    margin-top: 8px;
`
const AddButton = styled(Button)`
    margin-top: 0px;
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
const CohortInfoContainer = styled.div`
    padding: 16px;
    background: ${(props) => props.theme.mobile.mobileNavBg};
    border: 1px solid ${(props) => props.theme.mobile.horizontalrule};
    border-radius: 8px;
    margin-bottom: 24px;
`
const InfoTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    color: ${(props) => props.theme.palette.primary.main};
    margin-bottom: 12px;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.5px;
`
const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
`
const DetailItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
        font-size: 12px;
        color: ${(props) => props.theme.palette.primary.main};
        font-weight: 600;
    }

    div {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: #0c4a6e;
        font-weight: 500;
    }
`
const HeaderTitle = styled.h3`
    font-weight: 500;
    margin-bottom: 5px;
    color: ${(props) => props.theme.palette.common.black};
`

type TelegramClassForm = z.infer<typeof telegramClassSchema>

export default function CreateTelegramClass() {
    // Fetch available cohorts
    const { data: cohorts, isLoading: cohortsLoading, error: cohortsError } = useFetchCohorts()
    const { data: tgGroups = [], isLoading: tgLoading, error: tgError } = useFetchTelegramGroups()
    // Telegram Class Form
    const telegramForm = useForm<TelegramClassForm>({
        resolver: zodResolver(telegramClassSchema),
        defaultValues: {
            name: "Telegram Online Class",
            cohortId: "",
            price: 0,
            capacity: 100,
            telegramGroupId: "",
            schedule: {
                slots: [
                    {
                        days: [],
                        time: "",
                    },
                ],
            },
        },
    })

    const {
        fields: slotFields,
        append,
        remove,
    } = useFieldArray({
        control: telegramForm.control,
        name: "schedule.slots",
    })

    const parseNumberInput = (value: string) => (value === "" ? undefined : Number(value))

    // Watch selected cohort to show info
    const selectedCohortId = telegramForm.watch("cohortId")
    const selectedCohort = cohorts?.find((c) => c.id === selectedCohortId)

    const onTelegramClassSubmit: SubmitHandler<TelegramClassForm> = async (data) => {
        try {
            const classData = {
                name: data.name,
                cohortId: data.cohortId,
                price: data.price,
                capacity: data.capacity,
                enrolled: 0,
                telegramGroupId: data.telegramGroupId,
                schedule: data.schedule,
            }
            await createTelegramClass(classData)
            // await addDoc(collection(db, "telegramClasses"), classData)
            toast.success("Telegram class created successfully!")
            telegramForm.reset()
        } catch (error) {
            console.log("Error creating telegram class:", error)
            toast.error("Failed to create telegram class")
        }
    }

    if (cohortsLoading || tgLoading) {
        return (
            <FormCard>
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            </FormCard>
        )
    }

    if (tgError || cohortsError) {
        return (
            <FormCard>
                <p style={{ color: "#ef4444" }}>Failed to load Telegram groups</p>
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
            <HeaderTitle>Add Telegram Class</HeaderTitle>

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
                    <CohortInfoContainer>
                        <InfoTitle>
                            <InfoIcon fontSize="small" /> Selected Cohort Details
                        </InfoTitle>
                        <InfoGrid>
                            <DetailItem>
                                <label>Class Duration</label>
                                <div>
                                    <EventAvailableIcon fontSize="small" />
                                    {new Date(selectedCohort.startDate).toLocaleDateString()} -{" "}
                                    {new Date(selectedCohort.endDate).toLocaleDateString()}
                                </div>
                            </DetailItem>
                            <DetailItem>
                                <label>Registration Period</label>
                                <div>
                                    <AppRegistrationIcon fontSize="small" />
                                    {new Date(
                                        selectedCohort.registrationOpen,
                                    ).toLocaleDateString()}{" "}
                                    -{" "}
                                    {new Date(
                                        selectedCohort.registrationClose,
                                    ).toLocaleDateString()}
                                </div>
                            </DetailItem>
                            <DetailItem>
                                <label>Current Status</label>
                                <div>
                                    <AssessmentIcon fontSize="small" />
                                    {selectedCohort.status.toUpperCase()}
                                </div>
                            </DetailItem>
                        </InfoGrid>
                    </CohortInfoContainer>
                )}

                <ArrayInput>
                    <SectionTitle>Class Schedule</SectionTitle>

                    {slotFields.map((slot, index) => (
                        <ArrayItemContainer key={slot.id}>
                            <FormRow>
                                <Controller
                                    name={`schedule.slots.${index}.days`}
                                    control={telegramForm.control}
                                    render={({ field, fieldState }) => (
                                        <FormControl fullWidth error={!!fieldState.error}>
                                            <InputLabel>Days</InputLabel>
                                            <Select {...field} multiple label="Days">
                                                {[
                                                    "Sat",
                                                    "Sun",
                                                    "Mon",
                                                    "Tue",
                                                    "Wed",
                                                    "Thu",
                                                    "Fri",
                                                ].map((day) => (
                                                    <MenuItem key={day} value={day}>
                                                        {day}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>
                                                {fieldState.error?.message}
                                            </FormHelperText>
                                        </FormControl>
                                    )}
                                />
                            </FormRow>
                            <FormRow>
                                <Controller
                                    name={`schedule.slots.${index}.time`}
                                    control={telegramForm.control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label="Class Time"
                                            placeholder="e.g. 8:30pm – 10pm"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                            fullWidth
                                        />
                                    )}
                                />
                            </FormRow>

                            {slotFields.length > 1 && (
                                <RemoveButton variant="outlined" onClick={() => remove(index)}>
                                    Remove slot
                                </RemoveButton>
                            )}
                        </ArrayItemContainer>
                    ))}
                    <AddButton
                        variant="outlined"
                        onClick={() =>
                            append({
                                days: [],
                                time: "",
                            })
                        }
                    >
                        + Add another time slot
                    </AddButton>
                </ArrayInput>

                <FormRow>
                    <Controller
                        name="price"
                        control={telegramForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Price (₦)"
                                type="number"
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(parseNumberInput(e.target.value))}
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
                                onChange={(e) => field.onChange(parseNumberInput(e.target.value))}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="telegramGroupId"
                        control={telegramForm.control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error}>
                                <InputLabel>Telegram Group</InputLabel>
                                <Select {...field} label="Telegram Group">
                                    {tgGroups.map((g) => (
                                        <MenuItem key={g.chatId} value={g.chatId}>
                                            {g.title}
                                        </MenuItem>
                                        // ({g.chatId})
                                    ))}
                                </Select>
                                <FormHelperText>{fieldState.error?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </FormRow>

                <SubmitButton type="submit" variant="contained">
                    Create Telegram Class
                </SubmitButton>
            </form>
        </FormCard>
    )
}
