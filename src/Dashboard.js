import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from"./Navbar"
import Bookform from "./Book";
import { app ,auth, db, logout} from "./firebase";
import {getFirestore, query, getDocs, collection, where, addDoc, doc, setDoc} from "firebase/firestore";

// window.B15 = [];





function Dashboard() {

  return (
    <div>
    <Navbar />
    <Bookform />
    </div>
  );
}
export default Dashboard;