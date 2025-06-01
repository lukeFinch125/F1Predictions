// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvBICsqjsxJmrKr1RInDhwr6ETMxu_8Gw",
  authDomain: "f1predictions-19bc9.firebaseapp.com",
  projectId: "f1predictions-19bc9",
  storageBucket: "f1predictions-19bc9.firebasestorage.app",
  messagingSenderId: "286066256752",
  appId: "1:286066256752:web:9e918f033b9adf46eb7db5",
  measurementId: "G-P7CQFCCVBM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };