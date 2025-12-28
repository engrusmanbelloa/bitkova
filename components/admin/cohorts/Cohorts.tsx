// app/admin/cohorts/page.tsx
"use client"
import React, { useState } from "react"
import styled from "styled-components"
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    Tabs,
    Tab,
    Box,
    FormHelperText,
} from "@mui/material"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { toast } from "sonner"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const Container = styled.div`
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
`
const PageTitle = styled.h1`
    color: ${(props) => props.theme.palette.primary.main};
    margin-bottom: 30px;
`
const FormCard = styled(Card)`
    margin-bottom: 30px;
    padding: 30px;
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

// Zod Schemas
const cohortSchema = z.object({
    name: z.string().min(1, "Cohort name is required"),
    quarter: z.enum(["Q1", "Q2", "Q3", "Q4"]),
    year: z.number().min(2024, "Year must be 2024 or later"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    registrationOpen: z.string().min(1, "Registration open date is required"),
    registrationClose: z.string().min(1, "Registration close date is required"),
    status: z.enum(["upcoming", "active", "closed"]),
})

const physicalClassSchema = z.object({
    name: z.string().min(1, "Class name is required"),
    location: z.string().min(1, "Location is required"),
    cohortId: z.string().min(1, "Cohort ID is required"),
    price: z.number().min(0, "Price must be positive"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    time: z.string().min(1, "Schedule time is required"),
    mapLink: z.string().optional(),
    instructors: z
        .array(z.object({ value: z.string().min(1, "Instructor name required") }))
        .min(1, "At least one instructor required"),
    courses: z
        .array(z.object({ value: z.string().min(1, "Course name required") }))
        .min(1, "At least one course required"),
})

const telegramClassSchema = z.object({
    name: z.string().min(1, "Class name is required"),
    cohortId: z.string().min(1, "Cohort ID is required"),
    price: z.number().min(0, "Price must be positive"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    telegramGroupId: z.string().min(1, "Telegram Group ID is required"),
    modules: z
        .array(z.object({ value: z.string().min(1, "Module name required") }))
        .min(1, "At least one module required"),
})

type CohortForm = z.infer<typeof cohortSchema>
type PhysicalClassForm = z.infer<typeof physicalClassSchema>
type TelegramClassForm = z.infer<typeof telegramClassSchema>

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

export default function CohortManagement() {
    const [tabValue, setTabValue] = useState(0)

    // Cohort Form
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

    // Physical Class Form
    const physicalForm = useForm<PhysicalClassForm>({
        resolver: zodResolver(physicalClassSchema),
        defaultValues: {
            name: "",
            location: "",
            cohortId: "",
            price: 0,
            capacity: 30,
            time: "",
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

    // Submit Handlers
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
            console.error("Error creating cohort:", error)
            toast.error("Failed to create cohort")
        }
    }

    const onPhysicalClassSubmit = async (data: PhysicalClassForm) => {
        try {
            const classData = {
                name: data.name,
                location: data.location,
                cohortId: data.cohortId,
                price: data.price,
                capacity: data.capacity,
                enrolled: 0,
                schedule: {
                    days: ["Saturday", "Sunday"],
                    time: data.time,
                },
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
            console.error("Error creating telegram class:", error)
            toast.error("Failed to create telegram class")
        }
    }

    return (
        <Container>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
                    <Tab label="Create Cohort" />
                    <Tab label="Add Physical Class" />
                    <Tab label="Add Telegram Class" />
                </Tabs>
            </Box>

            {/* COHORT FORM */}
            <TabPanel value={tabValue} index={0}>
                <FormCard>
                    <h2>Create New Cohort</h2>
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
                                            <FormHelperText>
                                                {fieldState.error.message}
                                            </FormHelperText>
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
                                            <FormHelperText>
                                                {fieldState.error.message}
                                            </FormHelperText>
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
            </TabPanel>

            {/* PHYSICAL CLASS FORM */}
            <TabPanel value={tabValue} index={1}>
                <FormCard>
                    <h2>Add Physical Class</h2>
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
                                    <TextField
                                        {...field}
                                        label="Cohort ID"
                                        placeholder="Get from Firestore"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </FormRow>

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
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
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
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                    />
                                )}
                            />

                            <Controller
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
                            />
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
                            <AddButton
                                variant="outlined"
                                onClick={() => appendInstructor({ value: "" })}
                            >
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
                                        <RemoveButton onClick={() => removeCourse(index)}>
                                            ✕
                                        </RemoveButton>
                                    )}
                                </ArrayItemContainer>
                            ))}
                            <AddButton
                                variant="outlined"
                                onClick={() => appendCourse({ value: "" })}
                            >
                                + Add Course
                            </AddButton>
                        </ArrayInput>

                        <SubmitButton type="submit" variant="contained">
                            Create Physical Class
                        </SubmitButton>
                    </form>
                </FormCard>
            </TabPanel>

            {/* TELEGRAM CLASS FORM */}
            <TabPanel value={tabValue} index={2}>
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
                                    <TextField
                                        {...field}
                                        label="Cohort ID"
                                        placeholder="Get from Firestore"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </FormRow>

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

                            <Controller
                                name="telegramGroupId"
                                control={telegramForm.control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        label="Telegram Group ID"
                                        placeholder="e.g., -100123456789"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                    />
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
                                        <RemoveButton onClick={() => removeModule(index)}>
                                            ✕
                                        </RemoveButton>
                                    )}
                                </ArrayItemContainer>
                            ))}
                            <AddButton
                                variant="outlined"
                                onClick={() => appendModule({ value: "" })}
                            >
                                + Add Module
                            </AddButton>
                        </ArrayInput>

                        <SubmitButton type="submit" variant="contained">
                            Create Telegram Class
                        </SubmitButton>
                    </form>
                </FormCard>
            </TabPanel>
        </Container>
    )
}
