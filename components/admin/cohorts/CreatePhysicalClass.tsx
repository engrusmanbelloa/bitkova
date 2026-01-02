"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { physicalClassSchema } from "@/lib/schemas/classSchema"
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
    Alert,
    AlertTitle,
} from "@mui/material"
import EventAvailableIcon from "@mui/icons-material/EventAvailable"
import AppRegistrationIcon from "@mui/icons-material/AppRegistration"
import AssessmentIcon from "@mui/icons-material/Assessment"
import InfoIcon from "@mui/icons-material/Info"
import { toast } from "sonner"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
const HeaderTitle = styled.h3`
    font-weight: 500;
    margin-bottom: 5px;
    color: ${(props) => props.theme.palette.common.black};
`
const CohortInfoContainer = styled.div`
    padding: 16px;
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 8px;
    margin-bottom: 24px;
`
const InfoTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    color: #0369a1;
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
        color: #0ea5e9;
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

type PhysicalClassForm = z.infer<typeof physicalClassSchema>

export default function CreatePhysicalClass() {
    const [telegramGroups, setTelegramGroups] = useState<{ chatId: string; title: string }[]>([])
    // Fetch available cohorts
    const { data: cohorts, isLoading: cohortsLoading, error: cohortsError } = useFetchCohorts()

    const physicalForm = useForm<PhysicalClassForm>({
        resolver: zodResolver(physicalClassSchema),
        defaultValues: {
            name: "",
            location: "",
            cohortId: "",
            price: 0,
            capacity: 30,
            schedule: {
                slots: [
                    {
                        days: [],
                        time: "",
                    },
                ],
            },
            telegramGroupId: "",
            mapLink: "",
            instructors: [{ value: "" }],
            courses: [{ value: "" }],
        },
    })

    const {
        fields: instructorFields,
        append: appendInstructor,
        remove: removeInstructor,
    } = useFieldArray({
        control: physicalForm.control,
        name: "instructors",
    })

    const {
        fields: courseFields,
        append: appendCourse,
        remove: removeCourse,
    } = useFieldArray({
        control: physicalForm.control,
        name: "courses",
    })

    const {
        fields: slotFields,
        append,
        remove,
    } = useFieldArray({
        control: physicalForm.control,
        name: "schedule.slots",
    })
    const parseNumberInput = (value: string) => (value === "" ? undefined : Number(value))

    const selectedCohortId = physicalForm.watch("cohortId")
    const selectedCohort = cohorts?.find((c) => c.id === selectedCohortId)

    const onPhysicalClassSubmit = async (data: PhysicalClassForm) => {
        try {
            // const classData = {
            //     name: data.name,
            //     location: data.location,
            //     cohortId: data.cohortId,
            //     price: data.price,
            //     capacity: data.capacity,
            //     enrolled: 0,
            //     schedule: {
            //         days: ["Saturday", "Sunday"],
            //         time: data.time,
            //     },
            //     instructors: data.instructors.map((i) => i.value),
            //     courses: data.courses.map((c) => c.value),
            //     mapLink: data.mapLink || "",
            // }
            const classData = {
                name: data.name,
                location: data.location,
                cohortId: data.cohortId,
                price: data.price,
                capacity: data.capacity,
                enrolled: 0,
                schedule: data.schedule, // FROM FORM
                telegramGroupId: data.telegramGroupId || null,
                instructors: data.instructors.map((i) => i.value),
                courses: data.courses.map((c) => c.value),
                mapLink: data.mapLink || "",
            }

            await addDoc(collection(db, "physicalClasses"), classData)
            toast.success(`Physical class ${data.name} created!`)
            physicalForm.reset()
        } catch (error) {
            console.error("Error creating physical class:", error)
            toast.error("Failed to create physical class")
        }
    }

    useEffect(() => {
        async function loadGroups() {
            const snap = await getDocs(collection(db, "telegramGroups"))
            const groups = snap.docs.map((doc) => {
                const data = doc.data()
                return {
                    ...data,
                    // Ensure chatId is always a string for Zod/Select consistency
                    chatId: String(data.chatId),
                    title: data.title,
                }
            })
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
    if (cohortsError) {
        return (
            <FormCard>
                <Alert severity="error">
                    <AlertTitle>Error Loading Cohorts</AlertTitle>
                    {cohortsError instanceof Error ? cohortsError.message : "Unknown error"}
                    <br />
                    <br />
                    <strong>Check browser console for details</strong>
                </Alert>
            </FormCard>
        )
    }

    if (!cohorts || cohorts.length === 0) {
        return (
            <FormCard>
                <Alert severity="warning">
                    <AlertTitle>No Cohorts Available</AlertTitle>
                    Please create a cohort first before adding classes.
                    <br />
                    <br />
                    <strong>Debug Info:</strong> Check browser console
                </Alert>
            </FormCard>
        )
    }

    return (
        <FormCard>
            <HeaderTitle>Add Physical Class</HeaderTitle>
            <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
                Loaded {cohorts.length} cohort(s)
            </p>
            <form onSubmit={physicalForm.handleSubmit(onPhysicalClassSubmit)}>
                <FormRow>
                    <Controller
                        name="name"
                        control={physicalForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Class Name"
                                placeholder="e.g., Gombe HQ"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    />
                    <Controller
                        name="cohortId"
                        control={physicalForm.control}
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
                {/* {selectedCohort && (
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
                )} */}
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

                {/* <FormRow>
                    <Controller
                        name="schedule.days"
                        control={physicalForm.control}
                        render={({ field }) => (
                            <Select {...field} multiple fullWidth>
                                {[
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday",
                                    "Sunday",
                                ].map((day) => (
                                    <MenuItem key={day} value={day}>
                                        {day}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />

                    <Controller
                        name="schedule.time"
                        control={physicalForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Class Time"
                                placeholder="e.g. 8pm – 10pm"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    />
                    <Controller
                        name="telegramGroupId"
                        control={physicalForm.control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error}>
                                <InputLabel>Telegram Group</InputLabel>
                                <Select {...field} label="Telegram Group">
                                    {telegramGroups.map((g) => (
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
                </FormRow> */}
                <FullWidthField>
                    <Controller
                        name="telegramGroupId"
                        control={physicalForm.control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error}>
                                <InputLabel>Telegram Group</InputLabel>
                                <Select {...field} label="Telegram Group">
                                    {telegramGroups.map((g) => (
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
                </FullWidthField>
                <ArrayInput>
                    <SectionTitle>Class Schedule</SectionTitle>

                    {slotFields.map((slot, index) => (
                        <ArrayItemContainer key={slot.id}>
                            <FormRow>
                                <Controller
                                    name={`schedule.slots.${index}.days`}
                                    control={physicalForm.control}
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
                                    control={physicalForm.control}
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

                <FullWidthField>
                    <Controller
                        name="location"
                        control={physicalForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Location"
                                placeholder="Full address"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    />
                </FullWidthField>

                <FormRow>
                    <Controller
                        name="price"
                        control={physicalForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Price (₦)"
                                type="number"
                                onChange={(e) => field.onChange(parseNumberInput(e.target.value))}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="capacity"
                        control={physicalForm.control}
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

                    {/* <Controller
                        name="time"
                        control={physicalForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Schedule Time"
                                placeholder="e.g., 2pm - 5pm"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    /> */}
                </FormRow>

                <FullWidthField>
                    <Controller
                        name="mapLink"
                        control={physicalForm.control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Google Maps Link (Optional)"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                            />
                        )}
                    />
                </FullWidthField>

                <ArrayInput>
                    <SectionTitle>Instructors</SectionTitle>
                    {instructorFields.map((field, index) => (
                        <ArrayItemContainer key={field.id}>
                            <Controller
                                name={`instructors.${index}.value`}
                                control={physicalForm.control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Instructor name"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                    />
                                )}
                            />
                            {instructorFields.length > 1 && (
                                <RemoveButton onClick={() => removeInstructor(index)}>
                                    ✕
                                </RemoveButton>
                            )}
                        </ArrayItemContainer>
                    ))}
                    <AddButton variant="outlined" onClick={() => appendInstructor({ value: "" })}>
                        + Add Instructor
                    </AddButton>
                </ArrayInput>

                <ArrayInput>
                    <SectionTitle>Courses</SectionTitle>
                    {courseFields.map((field, index) => (
                        <ArrayItemContainer key={field.id}>
                            <Controller
                                name={`courses.${index}.value`}
                                control={physicalForm.control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Course name"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                    />
                                )}
                            />
                            {courseFields.length > 1 && (
                                <RemoveButton onClick={() => removeCourse(index)}>✕</RemoveButton>
                            )}
                        </ArrayItemContainer>
                    ))}
                    <AddButton variant="outlined" onClick={() => appendCourse({ value: "" })}>
                        + Add Course
                    </AddButton>
                </ArrayInput>

                <SubmitButton type="submit" variant="contained">
                    Create Physical Class
                </SubmitButton>
            </form>
        </FormCard>
    )
}
