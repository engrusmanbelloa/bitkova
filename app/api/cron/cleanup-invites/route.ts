// app/api/cron/cleanup-invites/route.ts
import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase/admin"

export async function GET(req: Request) {
    // 1. Security Check
    const auth = req.headers.get("authorization")
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response("Unauthorized", { status: 401 })
    }

    try {
        // 2. Query for "sent" or "failed" records
        // We limit to 400 because a Firestore batch has a limit of 500 operations

        const snapshot = await adminDb
            .collection("telegramPendingInvites")
            .where("status", "in", ["sent", "failed"])
            .limit(400)
            .get()

        if (snapshot.empty) {
            return NextResponse.json({ message: "No records to clean up" })
        }

        // 3. Add deletions to batch
        const batch = adminDb.batch()

        snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref)
        })

        await batch.commit()

        return NextResponse.json({
            success: true,
            deletedCount: snapshot.size,
        })
    } catch (error: any) {
        console.error("Cleanup Job Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
