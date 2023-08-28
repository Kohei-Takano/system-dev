// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider}from"firebase/auth";
import {getFirestore}from"firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGuIhbT_O6jEFAnHiEabSH9ZpteYucv5k",
  authDomain: "friend-system-52722.firebaseapp.com",
  projectId: "friend-system-52722",
  storageBucket: "friend-system-52722.appspot.com",
  messagingSenderId: "557084821839",
  appId: "1:557084821839:web:3eaaf72074f5bc8f9c1d3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
const db=getFirestore(app);

export {auth,provider,db};