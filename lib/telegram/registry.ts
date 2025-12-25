import start from "./commands/start"
import help from "./commands/help"
import classes from "./commands/classes"
import schedule from "./commands/schedule"
import payment from "./commands/payment"
import access from "./commands/access"
import support from "./commands/support"
import bitkovaCalendar from "./commands/bitkovaCalendar"
import { TelegramContext } from "@/types/telegram"

type CommandHandler = (ctx: TelegramContext) => Promise<void>

export const commandRegistry: Record<string, CommandHandler> = {
    "/start": start,
    "/help": help,
    "/classes": classes,
    "/bitkovaCalendar": bitkovaCalendar,
    "/schedule": schedule,
    "/payment": payment,
    "/access": access,
    "/support": support,
}
