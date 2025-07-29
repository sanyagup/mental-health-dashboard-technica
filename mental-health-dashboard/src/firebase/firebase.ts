// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgn20FDjBiMyq6ljStNA2HYHM5F5iEL8o",
    authDomain: "mentalhealthdashboard-a77c4.firebaseapp.com",
    projectId: "mentalhealthdashboard-a77c4",
    storageBucket: "mentalhealthdashboard-a77c4.firebasestorage.app",
    messagingSenderId: "958383408145",
    appId: "1:958383408145:web:4704f121d3a2ffbdeb9db0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// Export auth and db
export { auth, db };
