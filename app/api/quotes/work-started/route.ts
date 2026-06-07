// app/api/quotes/work-started/route.ts
import { NextRequest, NextResponse } from "next/server"
import { adminAuth, adminDb } from "@/lib/firebase/admin"
import { sendQuoteEmail } from "@/lib/email/sendQuoteEmail"

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = await adminAuth.verifyIdToken(authHeader.replace("Bearer ", ""))
    if (!decoded.admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const { quoteId, workNote, deliverables } = await req.json()
    // deliverables: [{ label: "GitHub", url: "https://..." }, ...]

    const quoteSnap = await adminDb.collection("quoteRequests").doc(quoteId).get()
    const quote = quoteSnap.data()
    const userSnap = await adminDb.collection("users").doc(quote?.userId).get()
    const userEmail = userSnap.data()?.email

    await adminDb
        .collection("quoteRequests")
        .doc(quoteId)
        .update({
            status: "work_started",
            workStartedAt: new Date(),
            workNote: workNote ?? "",
            deliverables: deliverables ?? [],
            updatedAt: new Date(),
        })

    await sendQuoteEmail({
        event: "work_started",
        to: userEmail,
        orgName: quote?.orgName,
        userName: quote?.userName,
        service: quote?.service,
        balanceAmount: quote?.balanceAmount,
        workNote,
        deliverables,
        quoteId,
    })

    return NextResponse.json({ ok: true })
}
