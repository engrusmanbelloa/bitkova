// app/api/quotes/submit/route.ts
import { NextRequest, NextResponse } from "next/server"
import { adminAuth, adminDb } from "@/lib/firebase/admin"
import { z } from "zod"

const schema = z.object({
    orgName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    service: z.enum(["web", "blockchain", "design", "event"]),
    details: z.string().min(1),
})

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = await adminAuth.verifyIdToken(token)

    const userDoc = await adminDb.collection("users").doc(decoded.uid).get()
    const userData = userDoc.data()

    const body = schema.parse(await req.json())

    const ref = adminDb.collection("quoteRequests").doc()
    await ref.set({
        id: ref.id,
        userId: decoded.uid,
        userName: userData?.name ?? "",
        ...body,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    return NextResponse.json({ ok: true, id: ref.id })
}
