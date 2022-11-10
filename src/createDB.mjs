import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut,} from "firebase/auth";
import {getFirestore, query, getDocs, collection, where, addDoc,setDoc,doc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBt0ridAizlsEyDa6u6EepoEws7_lc8nuM",
    authDomain: "hostel-booking-system-9725b.firebaseapp.com",
    databaseURL: "https://hostel-booking-system-9725b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hostel-booking-system-9725b",
    storageBucket: "hostel-booking-system-9725b.appspot.com",
    messagingSenderId: "658790337563",
    appId: "1:658790337563:web:c007492c47cd0943047cbe",
    measurementId: "G-XCRKVKHW8Q"
  };

const app =initializeApp(firebaseConfig);

const db = getFirestore(app);


const createDB = async () => {

  
  try {
    console.log("started");
      await addDoc(collection(db, "hostelss"), {
        p1 : "EMPTY",
        p2 : "EMPTY"
      });
      console.log("stopped");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }


};

// createDB();

const citiesRef = collection(db, "cities");

await setDoc(doc(citiesRef, "SF"), {
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });
await setDoc(doc(citiesRef, "LA"), {
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
await setDoc(doc(citiesRef, "DC"), {
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
await setDoc(doc(citiesRef, "TOK"), {
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
await setDoc(doc(citiesRef, "BJ"), {
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });
