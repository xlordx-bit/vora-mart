// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJPu6HFXJpDra05pmBgHaiHkx9L7Nhljg",
  authDomain: "vora-mart.firebaseapp.com",
  projectId: "vora-mart",
  storageBucket: "vora-mart.firebasestorage.app",
  messagingSenderId: "5365976566",
  appId: "1:5365976566:web:4241c51dd1ba2b26010bd7",
  measurementId: "G-74TX02FNJ7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
