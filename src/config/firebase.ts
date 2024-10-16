
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyDJiePcTaB1cBSQb62FQHpJcIRJpSsW5gE",
  authDomain: "humanime-3a494.firebaseapp.com",
  projectId: "humanime-3a494",
  storageBucket: "humanime-3a494.appspot.com",
  messagingSenderId: "617798201986",
  appId: "1:617798201986:web:8dd8c4d3d028d133e63a9b",
  measurementId: "G-3G3MDK5ML2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
