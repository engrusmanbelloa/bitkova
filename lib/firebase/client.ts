// lib/firebase/client.ts
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import {
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
} from "firebase/firestore"

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
const auth = getAuth(app)

/**
 * Firestore with modern IndexedDB persistence
 * - Uses persistent cache
 * - Supports multiple tabs safely
 */
const db =
    typeof window !== "undefined"
        ? initializeFirestore(app, {
              localCache: persistentLocalCache({
                  tabManager: persistentMultipleTabManager(),
              }),
          })
        : undefined

// const db = getFirestore(app)

export { app, auth, db }
