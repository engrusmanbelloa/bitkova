// app/api/admin/quotes/respond/route.ts
import { NextRequest, NextResponse } from "next/server"
import { adminAuth, adminDb } from "@/lib/firebase/admin"

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = await adminAuth.verifyIdToken(token)
    if (!decoded.admin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { quoteId, quotedPrice, adminNote } = await req.json()

    if (!quoteId || !quotedPrice) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const commitmentAmount = Math.round(quotedPrice * 0.25)
    const balanceAmount = quotedPrice - commitmentAmount

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

    return NextResponse.json({ ok: true })
}
