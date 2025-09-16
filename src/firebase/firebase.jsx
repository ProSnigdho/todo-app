import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyB-KMqdy78rITUkUAiueHnTrD1ozGvaHzU",
    authDomain: "login-67764.firebaseapp.com",
    projectId: "login-67764",
    storageBucket: "login-67764.appspot.com",
    messagingSenderId: "792411972843",
    appId: "1:792411972843:web:9b7b4b889a7ecd4ee58aae",
    measurementId: "G-DBCJX15MYS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };