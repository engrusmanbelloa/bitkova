// lib/schemas/roleManagerSchema.ts
import { z } from "zod"

export const roleManagerSchema = z.object({
    email: z.string().email("Enter a valid email"),
    role: z.enum(["instructor", "admin", "blog_admin", "event_manager", "business_dev", "none"]),
})
