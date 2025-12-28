import styled from "styled-components"
import { Card, Button } from "@mui/material"
import { z } from "zod"

/* =======================
   Zod Schemas
======================= */
export const cohortSchema = z.object({
    name: z.string().min(1, "Cohort name is required"),
    quarter: z.enum(["Q1", "Q2", "Q3", "Q4"]),
    year: z.number().min(2024, "Year must be 2024 or later"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    registrationOpen: z.string().min(1, "Registration open date is required"),
    registrationClose: z.string().min(1, "Registration close date is required"),
    status: z.enum(["upcoming", "active", "closed"]),
})

export const physicalClassSchema = z.object({
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

export const telegramClassSchema = z.object({
    name: z.string().min(1, "Class name is required"),
    cohortId: z.string().min(1, "Cohort ID is required"),
    price: z.number().min(0, "Price must be positive"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    telegramGroupId: z.string().min(1, "Telegram Group ID is required"),
    modules: z
        .array(z.object({ value: z.string().min(1, "Module name required") }))
        .min(1, "At least one module required"),
})
