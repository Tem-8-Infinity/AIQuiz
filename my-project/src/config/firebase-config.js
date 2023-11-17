 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getAuth } from 'firebase/auth';
 import { getDatabase } from 'firebase/database';
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 
 // Your web app's Firebase configuration
 export const firebaseConfig = {
   apiKey: "AIzaSyCjPRp1E5BIIcRXkYfR_jxT7ReZ9T8gbB8",
   authDomain: "aiquiz-b0d69.firebaseapp.com",
   projectId: "aiquiz-b0d69",
   storageBucket: "aiquiz-b0d69.appspot.com",
   messagingSenderId: "524613577292",
   appId: "1:524613577292:web:4605c80b5614548bc0a2e9",
   databaseURL: "https://aiquiz-b0d69-default-rtdb.europe-west1.firebasedatabase.app/",
 };
 
 // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app); 
 export const database = getDatabase(app); 