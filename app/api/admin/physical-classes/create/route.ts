// app/api/admin/physical-classes/create/route.ts
import { NextResponse } from "next/server"
import { adminApp, adminAuth, adminDb } from "@/lib/firebase/admin"
import { physicalClassSchema } from "@/lib/schemas/classSchema"

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization")
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const token = authHeader.replace("Bearer ", "")
        const decoded = await adminAuth.verifyIdToken(token)

        if (!decoded.admin && !decoded.instructor) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const body = physicalClassSchema.parse(await req.json())

        await adminDb.collection("physicalClasses").add({
            ...body,
            instructors: body.instructors.map((i) => i.value),
            courses: body.courses.map((c) => c.value),
            createdAt: new Date(),
            enrolled: 0,
        })

        return NextResponse.json({
            ok: true,
            success: true,
            message: "Physical class created successfully",
        })
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message ?? "Failed to create physical class" },
            { status: 400 },
        )
    }
}
