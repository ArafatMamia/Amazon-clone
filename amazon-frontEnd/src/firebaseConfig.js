import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBN1b5cANoz-H2zn_Fz1zb8eaBGmDXfCvc",
  authDomain: "challenge-52747.firebaseapp.com",
  projectId: "challenge-52747",
  storageBucket: "challenge-52747.appspot.com",
  messagingSenderId: "758390140217",
  appId: "1:758390140217:web:7267be49982192e9a54ce8",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const auth = firebase.auth();

export { auth };
