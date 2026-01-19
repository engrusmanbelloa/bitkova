// lib/telegram/registry.ts
import start from "./commands/start"
import status from "./commands/status"
import help from "./commands/help"
import classes from "./commands/classes"
import schedule from "./commands/schedule"
import payment from "./commands/payment"
import support from "./commands/support"
import calendar from "./commands/calendar"
import { TelegramContext } from "@/types/telegram"

type CommandHandler = (ctx: TelegramContext) => Promise<void>

export const commandRegistry: Record<string, CommandHandler> = {
    "/start": start,
    "/status": status,
    "/help": help,
    "/classes": classes,
    "/calendar": calendar,
    "/schedule": schedule,
    "/payment": payment,
    "/support": support,
}
