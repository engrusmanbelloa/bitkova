// components/admin/EnrollStudent.tsx
"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Card,
    CircularProgress,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { enrollStudentSchema } from "@/lib/schemas/enrollStudentSchema"
import { z } from "zod"
import { toast } from "sonner"
import { auth } from "@/lib/firebase/firebaseConfig"
import { useFetchCohorts } from "@/hooks/classes/useFetchCohorts"
import { useFetchTelegramGroups } from "@/hooks/classes/useFetchTgGroups"
import { useFetchPhysicalClasses } from "@/hooks/classes/useFetchPhysicalClasses"
import { useFetchTelegramClass } from "@/hooks/classes/useFetchTelegramClass"
import { useFetchAsyncCourses } from "@/hooks/classes/useFetchAsyncCourses"

type EnrollForm = z.infer<typeof enrollStudentSchema>

const FormCard = styled(Card)`
    padding: 16px;
`

export default function EnrollStudent() {
    const [isEnrolling, setIsEnrolling] = useState(false)
    const { data: cohorts = [] } = useFetchCohorts()
    const { data: telegramGroups = [] } = useFetchTelegramGroups()

    const form = useForm<EnrollForm>({
        resolver: zodResolver(enrollStudentSchema),
        defaultValues: {
            targetEmail: "",
            itemType: "async_course",
            itemId: "", // ✅ REQUIRED
            cohortId: "",
            telegramGroupId: "",
        },
    })

    const itemType = form.watch("itemType")
    const cohortId = form.watch("cohortId")

    const { data: physicalClasses = [] } = useFetchPhysicalClasses(cohortId)
    const { data: telegramClasses = [] } = useFetchTelegramClass(cohortId)
    const { data: asyncCourses = [] } = useFetchAsyncCourses()

    useEffect(() => {
        form.setValue("itemId", "")
    }, [itemType, form])

    const onSubmit = async (data: EnrollForm) => {
        setIsEnrolling(true)
        try {
            const currentUser = auth.currentUser
            if (!currentUser) throw new Error("Not authenticated")

            const token = await currentUser.getIdToken()

            const res = await fetch("/api/enrollStudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            })

            const json = await res.json()
            if (!res.ok) throw new Error(json.error)

            toast.success(json.message)
            form.reset()
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsEnrolling(false)
        }
    }

    return (
        <FormCard>
            <h3>Enroll Student</h3>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Student Email */}
                <Controller
                    name="targetEmail"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Student Email"
                            fullWidth
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            margin="normal"
                        />
                    )}
                />

                {/* Item Type */}
                <Controller
                    name="itemType"
                    control={form.control}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Enrollment Type</InputLabel>
                            <Select {...field} label="Enrollment Type">
                                <MenuItem value="async_course">Async Course</MenuItem>
                                <MenuItem value="telegram_class">Telegram Class</MenuItem>
                                <MenuItem value="physical_class">Physical Class</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                {/* Cohort (optional but recommended) */}
                <Controller
                    name="cohortId"
                    control={form.control}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Cohort (optional)</InputLabel>
                            <Select {...field} label="Cohort">
                                <MenuItem value="">None</MenuItem>
                                {cohorts.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.name} ({c.quarter} {c.year})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />

                {/* Item Selector */}
                <Controller
                    name="itemId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth margin="normal" error={!!fieldState.error}>
                            <InputLabel>
                                {itemType === "async_course" && "Select Course"}
                                {itemType === "telegram_class" && "Select Telegram Class"}
                                {itemType === "physical_class" && "Select Physical Class"}
                            </InputLabel>

                            <Select {...field} label="Item">
                                {itemType === "physical_class" &&
                                    physicalClasses.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>
                                            {c.name}
                                        </MenuItem>
                                    ))}

                                {/* Uncomment when hooks exist */}
                                {itemType === "telegram_class" &&
                                    telegramClasses.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>
                                            {c.name}
                                        </MenuItem>
                                    ))}

                                {itemType === "async_course" &&
                                    asyncCourses.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>
                                            {c.title}
                                        </MenuItem>
                                    ))}
                            </Select>

                            <FormHelperText>{fieldState.error?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                {/* Telegram Group (conditional) */}
                {itemType !== "async_course" && (
                    <Controller
                        name="telegramGroupId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth margin="normal" error={!!fieldState.error}>
                                <InputLabel>Telegram Group</InputLabel>
                                <Select {...field} label="Telegram Group">
                                    {telegramGroups.map((g) => (
                                        <MenuItem key={g.chatId} value={g.chatId}>
                                            {g.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{fieldState.error?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                )}

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    {isEnrolling ? (
                        <>
                            <CircularProgress size={20} color="inherit" />
                            <span> Processing...</span>
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </form>
        </FormCard>
    )
}
