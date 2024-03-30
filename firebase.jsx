// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider , getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDawdTdDW9fvixiVQOppzUaK3w6BiUZPPU",
  authDomain: "uber-nextjs-sr.firebaseapp.com",
  projectId: "uber-nextjs-sr",
  storageBucket: "uber-nextjs-sr.appspot.com",
  messagingSenderId: "37167083286",
  appId: "1:37167083286:web:6a2faa98c11cbdf7b12a37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
const auth = getAuth()

export {app , provider, auth}