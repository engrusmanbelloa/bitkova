"use client"
import styled from "styled-components"
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
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
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

type PhysicalClassForm = z.infer<typeof physicalClassSchema>

export default function CreatePhysicalClass() {
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

    const selectedCohortId = physicalForm.watch("cohortId")
    const selectedCohort = cohorts?.find((c) => c.id === selectedCohortId)

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
