// lib/server/cartServer.ts
import { db } from "@/lib/firebase/firebaseConfig"
import { doc, writeBatch, arrayRemove, updateDoc } from "firebase/firestore"

// export async function removeCoursesFromCartServer(userId: string, courseIds: string[]) {
//     const userRef = doc(db, "users", userId)

//     for (const courseId of courseIds) {
//         await updateDoc(userRef, {
//             cart: arrayRemove(courseId),
//         })
//     }
// }

export async function removeCoursesFromCartServer(userId: string, courseIds: string[]) {
    const batch = writeBatch(db)
    const userRef = doc(db, "users", userId)

    batch.update(userRef, {
        cart: arrayRemove(...courseIds),
    })

    await batch.commit()
}
