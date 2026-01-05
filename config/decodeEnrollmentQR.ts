// config/decodeEnrollmentQR.ts
export function decodeEnrollmentQR(qrCode?: string): {
    inviteLink?: string
    enrollmentId?: string
    userId?: string
    classId?: string
} | null {
    if (!qrCode) return null

    try {
        // Remove base64 header if present
        const base64 = qrCode.split(",")[1]
        const decoded = atob(base64)

        return JSON.parse(decoded)
    } catch (err) {
        console.error("Invalid QR payload", err)
        return null
    }
}
