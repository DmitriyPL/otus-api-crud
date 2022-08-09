// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzNh4sKQ-DnLZW617O-MSbv9oW6DPW1cI",
  authDomain: "otus-crud-api-865cc.firebaseapp.com",
  projectId: "otus-crud-api-865cc",
  storageBucket: "otus-crud-api-865cc.appspot.com",
  messagingSenderId: "373975711922",
  appId: "1:373975711922:web:c9b83dcd5be0dd8dad09ab",
  measurementId: "G-WZPG2LRV3X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
