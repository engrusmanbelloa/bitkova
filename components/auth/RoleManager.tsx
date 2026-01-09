// components/auth/RoleManager.tsx
"use client"

import { useState } from "react"
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
import styled from "styled-components"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { roleManagerSchema } from "@/lib/schemas/roleManagerSchema"
import { z } from "zod"
import { toast } from "sonner"
import { auth } from "@/lib/firebase/firebaseConfig"

type RoleForm = z.infer<typeof roleManagerSchema>

const FormCard = styled(Card)`
    padding: 16px;
`

export default function RoleManager() {
    const [assigning, setAssigning] = useState(false)

    const form = useForm<RoleForm>({
        resolver: zodResolver(roleManagerSchema),
        defaultValues: {
            email: "",
            role: "instructor",
        },
    })

    const onSubmit = async (data: RoleForm) => {
        try {
            setAssigning(true)

            const currentUser = auth.currentUser
            if (!currentUser) throw new Error("Not authenticated")

            const token = await currentUser.getIdToken()

            const res = await fetch("/api/admin/setRole/route.ts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            })

            const json = await res.json()
            if (!res.ok) throw new Error(json.error)

            await currentUser.getIdToken(true)
            toast.success(json.message)
            form.reset()
        } catch (err: any) {
            toast.error(err.message ?? "Failed to assign role")
        } finally {
            setAssigning(false)
        }
    }

    return (
        <FormCard>
            <h3>Role Manager</h3>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Target Email */}
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="User Email"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />

                {/* Role Selector */}
                <Controller
                    name="role"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth margin="normal" error={!!fieldState.error}>
                            <InputLabel>Role</InputLabel>
                            <Select {...field} label="Role">
                                <MenuItem value="instructor">Instructor</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="blog_admin">Blog Admin</MenuItem>
                                <MenuItem value="event_manager">Event Manager</MenuItem>
                                <MenuItem value="business_dev">Business Development</MenuItem>
                                <MenuItem value="none">Remove Role</MenuItem>
                            </Select>
                            <FormHelperText>{fieldState.error?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    {assigning ? (
                        <>
                            <CircularProgress size={25} color="inherit" />
                            <span style={{ marginLeft: 8 }}>Processing…</span>
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </form>
        </FormCard>
    )
}
