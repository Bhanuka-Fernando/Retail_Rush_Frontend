// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKvefFhuN2bsje3JSIt4TzRPW05CHyhK4",
  authDomain: "retailrushdb.firebaseapp.com",
  projectId: "retailrushdb",
  storageBucket: "retailrushdb.appspot.com",
  messagingSenderId: "1095952706171",
  appId: "1:1095952706171:web:cc5a5882cafe56129710de",
  measurementId: "G-B3SM9B5R6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };