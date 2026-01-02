import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { PhysicalClass, TelegramClass } from "@/types/classTypes"

export async function createPhysicalClass(data: Omit<PhysicalClass, "id" | "enrolled">) {
    return addDoc(collection(db, "physicalClasses"), {
        ...data,
        enrolled: 0,
        createdAt: serverTimestamp(),
    })
}

export async function createTelegramClass(
    data: Omit<TelegramClass, "id" | "enrolled" | "createdAt">,
) {
    return addDoc(collection(db, "telegramClasses"), {
        ...data,
        enrolled: 0,
        createdAt: serverTimestamp(),
    })
}
