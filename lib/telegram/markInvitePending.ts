import { db } from "@/lib/firebase/client"
import { doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore"
import { telegramPendingInvites } from "@/types/classTypes"
export async function markInvitePending({
    userId,
    email,
    classId,
    telegramGroupId,
    cohortName,
    className,
}: Omit<telegramPendingInvites, "attempts" | "status" | "createdAt" | "updatedAt">) {
    telegramGroupId
    const enrollmentId = `${userId}-${classId}`

    const inviteData: telegramPendingInvites = {
        userId,
        email,
        classId,
        telegramGroupId,
        cohortName,
        className,
        attempts: 0,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    await setDoc(doc(db, "telegramPendingInvites", enrollmentId), inviteData)
    //  await setDoc(doc(db, "telegramPendingInvites", enrollmentId), {
    //      userId,
    //      email,
    //      classId,
    //      cohortName,
    //      className,
    //      telegramGroupId,
    //      attempts: 0,
    //      status: "pending",
    //      createdAt: new Date(),
    //      updatedAt: new Date(),
    //  })
}
