import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbm5oQYXgPXeeNX8j8qT5epPi86VqHYdY",
  authDomain: "roadcare-ca8c4.firebaseapp.com",
  projectId: "roadcare-ca8c4",
  storageBucket: "roadcare-ca8c4.firebasestorage.app",
  messagingSenderId: "981497410536",
  appId: "1:981497410536:web:e58f7a095793b145586a5d",
  measurementId: "G-5TW6TVM8P0",
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();