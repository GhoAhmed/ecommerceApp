// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqwDq7NcTqI4tSgwpXN1D56msc7_oaz5E",
  authDomain: "myecommapp-4eabd.firebaseapp.com",
  projectId: "myecommapp-4eabd",
  storageBucket: "myecommapp-4eabd.appspot.com",
  messagingSenderId: "377332500339",
  appId: "1:377332500339:web:39e08ca33fa7c58a1b2706",
  measurementId: "G-GTGZTR8N34"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;