import { NextRequest, NextResponse } from "next/server"
import { telegramClassSchema } from "@/lib/schemas/classSchema"
import { adminAuth, adminDb } from "@/lib/firebase/admin"

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization")
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const token = authHeader.split(" ")[1]
        const decoded = await adminAuth.verifyIdToken(token)

        if (!decoded.admin && !decoded.instructor) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const body = await req.json()
        const parsed = telegramClassSchema.parse(body)

        await adminDb.collection("telegramClasses").add({
            ...parsed,
            enrolled: 0,
            createdAt: new Date(),
            createdBy: decoded.uid,
        })

        //   return NextResponse.json({ ok: true })
        return NextResponse.json({
            ok: true,
            success: true,
            message: "Telegram class created successfully",
        })
    } catch (err: any) {
        console.error("Create Telegram Class error:", err)
        return NextResponse.json(
            { success: false, error: err.message ?? "Internal server error" },
            { status: 400 },
        )
    }
}
