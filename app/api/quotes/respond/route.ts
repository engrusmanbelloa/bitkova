// app/api/quotes/respond/route.ts
import { NextRequest, NextResponse } from "next/server"
import { adminAuth, adminDb } from "@/lib/firebase/admin"
import { sendQuoteEmail } from "@/lib/email/sendQuoteEmail"

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = await adminAuth.verifyIdToken(token)

    if (!decoded.admin && !decoded.businessDev) {
        console.warn(
            "Unauthorized access attempt to quote response endpoint only admins and business devs allowed. claim: ",
            decoded,
        )
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // console.log("Admin authenticated for quote response:", decoded.uid)

    const { quoteId, quotedPrice, adminNote } = await req.json()

    if (!quoteId || !quotedPrice) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const commitmentAmount = Math.round(quotedPrice * 0.25)
    const balanceAmount = quotedPrice - commitmentAmount

    // fetch quote to get user email
    const quoteSnap = await adminDb.collection("quoteRequests").doc(quoteId).get()
    const quote = quoteSnap.data()
    const userSnap = await adminDb.collection("users").doc(quote?.userId).get()
    const userEmail = userSnap.data()?.email

    await adminDb
        .collection("quoteRequests")
        .doc(quoteId)
        .update({
            status: "quoted",
            quotedPrice,
            adminNote: adminNote ?? "",
            commitmentAmount,
            balanceAmount,
            quotedAt: new Date(),
            updatedAt: new Date(),
        })

    await sendQuoteEmail({
        event: "quote_sent",
        to: userEmail,
        orgName: quote?.orgName,
        userName: quote?.userName,
        service: quote?.service,
        quotedPrice,
        commitmentAmount,
        balanceAmount,
        adminNote: adminNote ?? "",
        quoteId,
    })

    return NextResponse.json({ ok: true })
}
