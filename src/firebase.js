// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvNjDoRynVeEjZwCS5BKsAVGyeSOVbM2g",
  authDomain: "inventory-management-e5970.firebaseapp.com",
  projectId: "inventory-management-e5970",
  storageBucket: "inventory-management-e5970.appspot.com",
  messagingSenderId: "740755613176",
  appId: "1:740755613176:web:41daf6980bfebc22dca20d",
  measurementId: "G-SNY9MC8E2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}