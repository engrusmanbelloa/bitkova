// app/api/admin/courses/create/route.ts
import { NextResponse } from "next/server"
import { courseSchema } from "@/lib/schemas/courseSchema"
import { uploadNewCourse } from "@/lib/firebase/uploads/uploadCourseWithDetails"
import { adminApp } from "@/lib/firebase/admin"
import { getAuth } from "firebase-admin/auth"

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization")
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const token = authHeader.replace("Bearer ", "")
        const decoded = await getAuth(adminApp).verifyIdToken(token)

        if (!decoded.admin && !decoded.instructor) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }
        const body = await req.json()

        const parsed = courseSchema.safeParse(body.course)
        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: parsed.error.errors[0].message },
                { status: 400 },
            )
        }

        await uploadNewCourse(body)

        return NextResponse.json({
            ok: true,
            success: true,
            message: "Course Uploaded successfully",
        })
    } catch (err) {
        console.error("Create course error:", err)
        return NextResponse.json(
            { success: false, error: "Failed to upload course" },
            { status: 500 },
        )
    }
}
