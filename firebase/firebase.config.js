
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI34CO0qxcvNqd9fgBDoLCs-kojcQl17o",
  authDomain: "testes-67342.firebaseapp.com",
  projectId: "testes-67342",
  storageBucket: "testes-67342.appspot.com",
  messagingSenderId: "726746059380",
  appId: "1:726746059380:web:91e66d3e61162817833721",
  measurementId: "G-L6DJWL5TKQ"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default getFirestore()