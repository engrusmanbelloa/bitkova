import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

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
export const analytics = getAnalytics(app)
