import { z } from "zod"

export const enrollStudentSchema = z
    .object({
        targetEmail: z.string().email(),
        itemType: z.enum(["async_course", "telegram_class", "physical_class"]),
        itemId: z.string().min(1),
        cohortId: z.string().optional(),
        telegramGroupId: z.string().optional(),
    })
    .refine(
        (d) => d.itemType === "async_course" || (d.telegramGroupId && d.telegramGroupId.length > 0),
        {
            message: "Telegram group required for this enrollment type",
            path: ["telegramGroupId"],
        },
    )
