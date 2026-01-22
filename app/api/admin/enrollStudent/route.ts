// app/api/enrollStudent/route.ts
import { NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { adminApp } from "@/lib/firebase/admin"
import { getFirestore } from "firebase-admin/firestore"
import { Enrollment } from "@/types/userType"
import { enrollStudentServer } from "@/lib/server/enrollStudentServer"
const auth = getAuth(adminApp)
const db = getFirestore(adminApp)

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { targetEmail, itemId, itemType, cohortId, telegramGroupId } = body as {
            targetEmail?: string
            itemId?: string
            itemType?: "async_course" | "telegram_class" | "physical_class"
            cohortId?: string | null
            telegramGroupId?: string
        }

        if (!targetEmail || !itemId || !itemType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // 🔐 AUTH
        const authHeader = req.headers.get("Authorization")
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const token = authHeader.replace("Bearer ", "")
        const decoded = await auth.verifyIdToken(token)

        // Custom claims are available directly on the decoded token
        const isAdmin = decoded.admin === true
        const isInstructor = decoded.instructor === true

        console.log("Decoded claims:", {
            admin: decoded.admin,
            instructor: decoded.instructor,
            isAdmin,
            isInstructor,
        })

        if (!isAdmin && !isInstructor) {
            return NextResponse.json(
                {
                    error: "Forbidden: Admin or Instructor role required",
                },
                { status: 403 },
            )
        }

        // 👤 TARGET USER
        const user = await auth.getUserByEmail(targetEmail)
        const userId = user.uid

        const enrollmentId = `${userId}-${itemId}`
        const enrollmentRef = db.collection("enrollments").doc(enrollmentId)

        // ♻️ IDEMPOTENCY
        if ((await enrollmentRef.get()).exists) {
            return NextResponse.json({
                success: true,
                message: "User already enrolled",
            })
        }

        // 📦 VALIDATE ITEM EXISTS
        const collectionMap = {
            async_course: "courses",
            telegram_class: "telegramClasses",
            physical_class: "physicalClasses",
        } as const

        const itemSnap = await db.collection(collectionMap[itemType]).doc(itemId).get()

        if (!itemSnap.exists) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 })
        }

        const item = itemSnap.data()!

        // 🧠 BUILD ENROLLMENT
        await enrollStudentServer({
            userId,
            payerEmail: targetEmail,
            itemId,
            itemType,
            cohortId: cohortId ?? "Not applicable",
            className: item.name ?? item.title,
            telegramGroupId,
            paymentReference: "ADMIN_MANUAL",
            enrolledBy: "admin",
        })

        return NextResponse.json({
            success: true,
            message: "Student enrolled successfully",
        })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Enrollment failed" }, { status: 500 })
    }
}
