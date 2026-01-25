type LogLevel = "info" | "warn" | "error"

export function telegramLog(level: LogLevel, message: string, meta?: Record<string, any>) {
    const log = {
        source: "telegram-bot",
        level,
        message,
        ...meta,
        timestamp: new Date().toISOString(),
    }

    if (level === "error") {
        console.error(log)
    } else if (level === "warn") {
        console.warn(log)
    } else {
        console.log(log)
    }
}
