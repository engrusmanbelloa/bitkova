import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import { telegramPendingInvites } from "@/types/classTypes"

export async function markInvitePending(
    data: Omit<telegramPendingInvites, "attempts" | "status" | "createdAt" | "updatedAt">,
) {
    const enrollmentId = `${data.userId}-${data.classId}`

    await adminDb
        .collection("telegramPendingInvites")
        .doc(enrollmentId)
        .set({
            ...data,
            attempts: 0,
            status: "pending",
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        })
}
