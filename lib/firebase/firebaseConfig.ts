import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check"
// 6LeFBWgrAAAAAOnMzI-wn7e4cu0xgocPr2soXkjC
const firebaseConfig = {
    apiKey: "AIzaSyCzfxvifvLm9l__D2PVoC-mI97KOds8U7M",
    authDomain: "bitkova-digital-hub.firebaseapp.com",
    projectId: "bitkova-digital-hub",
    storageBucket: "bitkova-digital-hub.firebasestorage.app",
    messagingSenderId: "541818898111",
    appId: "1:541818898111:web:2d0d7dfdf9e80e86d9680a",
    measurementId: "G-STF7K5WZFX",
}
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaEnterpriseProvider("6LeFBWgrAAAAAOnMzI-wn7e4cu0xgocPr2soXkjC"),
//     isTokenAutoRefreshEnabled: true,
// })

// const auth = getAuth(app)
export { app, auth, db }
