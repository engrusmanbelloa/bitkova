// app/api/quotes/submit/route.ts
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { adminAuth, adminDb } from "@/lib/firebase/admin"
import { getBusinessDevEmails } from "@/lib/email/getStaffEmails"
import { sendQuoteEmail } from "@/lib/email/sendQuoteEmail"

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

    console.log("New quote request submitted with ID:", ref.id)

    await sendQuoteEmail({
        event: "new_request",
        to: await getBusinessDevEmails(),
        isAdmin: true,
        orgName: body.orgName,
        userName: userData?.name ?? "",
        service: body.service,
        quoteId: ref.id,
    })

    console.log("Notification email sent to business development team for quote ID:", ref.id)

    return NextResponse.json({ ok: true, id: ref.id })
}
