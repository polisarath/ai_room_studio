// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-roomdesign-ee1f5.firebaseapp.com",
  projectId: "ai-roomdesign-ee1f5",
  storageBucket: "ai-roomdesign-ee1f5.firebasestorage.app",
  messagingSenderId: "616535220884",
  appId: "1:616535220884:web:cdbf87fe97e804fa6dca81",
  measurementId: "G-E5Z8D59KPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage=getStorage(app)