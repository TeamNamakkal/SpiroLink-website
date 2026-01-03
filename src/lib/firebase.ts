// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaYqi5aSIC4-NFfrLZQzosaJi77G8pp44",
  authDomain: "spirolinkweb.firebaseapp.com",
  projectId: "spirolinkweb",
  storageBucket: "spirolinkweb.firebasestorage.app",
  messagingSenderId: "1069212184136",
  appId: "1:1069212184136:web:4e2bbe8557c4d2580a327d",
  measurementId: "G-KBYFFZRRJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Test Firebase connection
console.log("✅ Firebase connected successfully!", app);

export { app, analytics };
