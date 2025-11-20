// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcLdFiuIlOxkOOXXb9WOka3N4Ie2CuKnE",
  authDomain: "gladmore-7dac6.firebaseapp.com",
  projectId: "gladmore-7dac6",
  storageBucket: "gladmore-7dac6.firebasestorage.app",
  messagingSenderId: "753914478914",
  appId: "1:753914478914:web:fa05cb37f788b8206788db",
  measurementId: "G-MK420258PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
