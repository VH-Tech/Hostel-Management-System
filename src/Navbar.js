import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { app ,auth, db, logout} from "./firebase";
import {getFirestore, query, getDocs, collection, where, addDoc, doc, setDoc} from "firebase/firestore";

// window.B15 = [];





function Navbar() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);


  
  return (
    <div className="Navbar">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">HMS</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="/">Home <span class="sr-only"></span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#">{name}</a>
      </li>
      
      <li>
        <button className="btn btn-outline-danger my-2 my-sm-0" onClick={logout}>logout</button>
      </li>
    </ul>
  </div>
</nav>

     </div>

  );
}
export default Navbar;