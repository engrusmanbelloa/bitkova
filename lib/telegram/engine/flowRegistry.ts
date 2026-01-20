// lib/telegram/engine/flowRegistry.ts
import { statusFlow } from "@/lib/telegram/flows/status.flow"
import { TelegramFlowHandler } from "@/types/telegram"

// export const flowRegistry: Record<string, Function> = {
//     status: statusFlow,
// }

export const flowRegistry: Record<string, TelegramFlowHandler> = {
    status: statusFlow,
}
