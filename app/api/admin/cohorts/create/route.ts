// app/api/admin/cohorts/create/route.ts
import { NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { adminApp } from "@/lib/firebase/admin"
import { cohortSchema } from "@/lib/schemas/classSchema"
import { getFirestore } from "firebase-admin/firestore"

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

        const body = cohortSchema.parse(await req.json())

        const db = getFirestore(adminApp)
        await db.collection("cohorts").add({
            ...body,
            startDate: new Date(body.startDate),
            endDate: new Date(body.endDate),
            registrationOpen: new Date(body.registrationOpen),
            registrationClose: new Date(body.registrationClose),
            createdAt: new Date(),
        })

        return NextResponse.json({ ok: true, success: true, message: "Cohort created" })
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message ?? "Failed to create cohort" },
            { status: 400 },
        )
    }
}
