// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyBFQ9Dp75xMuug-YeRU7ke5JW2Ip5M-bfg",
  authDomain: "pagina-p-80038.firebaseapp.com",
  projectId: "pagina-p-80038",
  storageBucket: "pagina-p-80038.appspot.com",
  messagingSenderId: "293398574507",
  appId: "1:293398574507:web:6dd44cd52ca88bd4a1ceee"
};

// Initialize Firebase
const appFireBase = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(appFireBase);

export default appFireBase;