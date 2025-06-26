import { getAuth } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { User as FirebaseUser } from "firebase/auth"
import { User, UserCourseProgress } from "@/userType"
import { app } from "@/firebase/firebaseConfig"

const db = getFirestore(app)

export default async function createOrUpdateUserDoc(user: FirebaseUser) {
    if (!user) return

    const userRef = doc(db, "users", user.uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
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
            enrolledCourses: [],
            completedCourses: [],
            archivedCourses: [],
            wishList: [],
            cart: [],
        }

        await setDoc(userRef, newUser)
        console.log("User document created")
    } else {
        console.log("User document already exists")
    }
}
