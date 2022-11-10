import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut,} from "firebase/auth";
import {getFirestore, query, getDocs, collection, where, addDoc, doc, setDoc} from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



const createDB = async () =>{

  console.log("started");

  for (let index = 1; index <= 9; index++) {

  await setDoc(doc(db, "hostels", "B15", "room", "00" + index), {
    Full : false,
    p1 : "EMPTY",
    p2 : "EMPTY"
  });

  await setDoc(doc(db, "hostels", "B18", "room", "00" + index), {
    Full : false,
    p1 : "EMPTY",
    p2 : "EMPTY"
  });

}
  console.log("end");
}

const logout = () => {
    signOut(auth);
};

export {
    app,
    auth,
    db,
    signInWithGoogle,
    logout,
    createDB
  };