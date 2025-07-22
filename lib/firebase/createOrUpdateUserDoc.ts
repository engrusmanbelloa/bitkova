import { getAuth } from "firebase/auth"
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore"
import { User as FirebaseUser } from "firebase/auth"
import { User, UserCourseProgress } from "@/userType"
import { app } from "@/lib/firebase/firebaseConfig"

const db = getFirestore(app)

export default async function createUserIfNotExists(user: FirebaseUser) {
    if (!user?.uid) return
    // console.log(user.uid)

    try {
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
            // Optional: Check if another doc with this email exists
            const q = query(collection(db, "users"), where("email", "==", user.email))
            const querySnap = await getDocs(q)

            if (!querySnap.empty) {
                console.warn("User with this email already exists in another document")
                return
            }

            const newUser: User = {
                id: user.uid,
                name: user.displayName || "Guest User",
                email: user.email || "",
                role: "guest",
                username: user.displayName?.split(" ").join("").toLowerCase() || "guest",
                phoneNumber: user.phoneNumber || "",
                skill: "",
                bio: "",
                registrationDate: new Date().toISOString(),
            }

            await setDoc(userRef, newUser, { merge: true })
            console.log("New user document created")
        } else {
            console.log("User document already exists")
        }
    } catch (error) {
        console.error("Error creating or checking user document:", error)
        throw error
    }
}
