import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyCzfxvifvLm9l__D2PVoC-mI97KOds8U7M",
    authDomain: "bitkova-digital-hub.firebaseapp.com",
    projectId: "bitkova-digital-hub",
    storageBucket: "bitkova-digital-hub.firebasestorage.app",
    messagingSenderId: "541818898111",
    appId: "1:541818898111:web:2d0d7dfdf9e80e86d9680a",
    measurementId: "G-STF7K5WZFX",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// export const createAccount = async (email: string, password: string) => {
//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//         const user = userCredential.user
//         console.log(user)
//     } catch (error) {
//         const errorCode = error.code
//         const errorMessage = error.message
//         console.log(errorMessage)
//     }
// }

// export const signIn = async (email: string, password: string) => {
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password)
//         const user = userCredential.user
//         console.log(user)
//     } catch (error: any) {
//         const errorCode = error.code
//         const errorMessage = error.message
//         console.log(errorMessage)
//     }
// }
