import { statusFlow } from "@/lib/telegram/flows/status.flow"

export const flowRegistry: Record<string, Function> = {
    status: statusFlow,
}
