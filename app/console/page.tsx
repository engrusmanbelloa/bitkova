import React from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Panel from "@/components/admin/AdminPannel"
import { User } from "@/userType"
import { getUserById } from "@/lib/firebase/queries/getUserById"
import { verifySession } from "@/session/verifySession"
import { toast } from "sonner"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { adminAuth } from "@/lib/firebase/admin"
import { adminDb } from "@/lib/firebase/admin" // Client-side Firebase

export default async function page() {
    // Get session cookie
    // const cookieStore = await cookies()
    // const session = cookieStore.get("session")?.value
    // // Check if session is available
    // if (!session) {
    //     console.log("No session cookie found")
    //     return redirect("/")
    // }
    // // Verify session cookie
    // const decodedToken = await verifySession()
    // if (!decodedToken) {
    //     console.log("Invalid or expired session")
    //     return redirect("/")
    // }
    // // Get user by id
    // const user = (await getUserById(decodedToken.uid)) as User
    // if (!user) {
    //     // console.log("User details does not exist")
    //     toast.error("User details does not exist")
    //     redirect("/")
    // } else {
    //     // console.log("User details ", user)
    // }
    return (
        <div>
            <Panel />
        </div>
    )
}

// // Define the authorized emails and roles
// const authorizedEmails = ["usmanbelloa@gmail.com"]
// const authorizedRoles = ["admin", "instructor"]

// export default async function Page() {
//     let isAuthenticated = false
//     let currentUserRole = ""
//     let currentUserEmail = ""

//     try {
//         const sessionCookie = (await cookies()).get("__session")?.value
//         if (!sessionCookie) {
//             console.log("No session cookie found")
//             return //redirect("/")
//         }

//         const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
//         const userDocRef = adminDb.collection("users").doc(decodedClaims.uid)
//         const userDoc = await userDocRef.get()
//         // const userDocRef = doc(db, "users", decodedClaims.uid)
//         // const userDoc = await getDoc(userDocRef)

//         // if (userDoc.exists()) {
//         //     const userData = userDoc.data() as User
//         //     currentUserRole = userData.role
//         //     currentUserEmail = userData.email

//         //     if (
//         //         authorizedRoles.includes(currentUserRole) ||
//         //         authorizedEmails.includes(currentUserEmail)
//         //     ) {
//         //         isAuthenticated = true
//         //     }
//         // }
//         if (userDoc.exists) {
//             const userData = userDoc.data() as User
//             const currentUserRole = userData.role
//             const currentUserEmail = userData.email
//             console.log("User role:", currentUserRole)
//             console.log("User email:", currentUserEmail)

//             // Check if the user's role or email is authorized
//             if (
//                 authorizedRoles.includes(currentUserRole) ||
//                 authorizedEmails.includes(currentUserEmail)
//             ) {
//                 isAuthenticated = true
//             }
//         }
//     } catch (error) {
//         console.error("Authorization failed:", error)
//         return redirect("/")
//     }

//     if (!isAuthenticated) {
//         // Redirect to an unauthorized page or the home page
//         return redirect("/")
//     }

//     // If the user is authorized, render the Panel component
//     return (
//         <div>
//             <Panel />
//         </div>
//     )
// }
