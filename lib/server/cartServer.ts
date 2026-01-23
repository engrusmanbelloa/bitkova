// lib/server/cartServer.ts
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"

export async function removeCoursesFromCartServer(userId: string, courseIds: string[]) {
    await adminDb
        .collection("users")
        .doc(userId)
        .update({
            cart: FieldValue.arrayRemove(...courseIds),
        })
}
