// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  onAuthStateChanged,  
  signInWithEmailAndPassword, 
  signOut  } from "firebase/auth";

const firebaseConfig = {
  apiKey:  process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "news-app-81617.firebaseapp.com",
  projectId: "news-app-81617",
  storageBucket: "news-app-81617.appspot.com",
  messagingSenderId: "412510093313",
  appId: "1:412510093313:web:f4b7b002c32d4aa2f98000",
  measurementId: "G-DLVG59L5BH"
};


initializeApp(firebaseConfig); 
const auth = getAuth();

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
  }
