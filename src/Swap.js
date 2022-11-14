import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { app ,auth, db, logout} from "./firebase";
import {getFirestore, query, getDocs, collection, where, addDoc, doc, setDoc, updateDoc, getDoc, deleteField} from "firebase/firestore";

// window.B15 = [];





function Swapform() {

  const [user, loading, error] = useAuthState(auth);
  const [email, setemail] = useState("");
  const [hostel, setHostel] = useState("");
  let room = "";
  const [p1, setp1] = useState("");
  const [p2, setp2] = useState("");
  const [OccupiedRooms,setOccupiedRooms]=useState([]);
  const [OccupiedRoomsData,setOccupiedRoomsData]=useState([]);
  let selectedHostel = "";
  let uid = "";
  let selectedRoom = '';
  let selectedRoomie = "";
  let ref; 

  const navigate = useNavigate();
  const fetchUseremail = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      uid = doc.docs[0].id;
      window.data = doc;
      window.uid = uid;
      setemail(data.email);

      if (data.hostel === undefined) {
        setHostel("");
      }
      else{
        setHostel(data.hostel);
      }

      if (data.room === undefined) {
       window.room = "";
      }
      else{
        window.room = data.room;
      }

    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUseremail();
  }, [user, loading]);


const fetchOccupiedRooms = async () => {
  console.log(selectedHostel);
    try {
      const q1 = query(collection(db, "hostels",selectedHostel,"room"), where("Empty", "==", false));
      const querySnapshot1 = await getDocs(q1);
      querySnapshot1.forEach((doc) => {
            setOccupiedRooms(prevState => ([...prevState, doc.id]));
            setOccupiedRoomsData(prevState => ([...prevState, doc.data()]));
      });     

    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

const fetchRoomies = async () => {
    console.log(selectedHostel);
      try {
        window.ref = doc(db, "hostels", window.selectedHostel, "room",window.selectedRoom);
        const docSnap = await getDoc(window.ref);
        if (docSnap.data().p1 === "Occupied") {
            setp1("Occupied");
        }
        else{
            setp1(docSnap.data().p1);
        }
        if (docSnap.data().p2 === "Occupied") {
            setp2("Occupied");
        }
        else{
            setp2(docSnap.data().p2);
        }
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };

  const handleChangeRoom = event => {
    window.selectedRoom = event.target.value;
    fetchRoomies();
  };

  const handleChangeHostel = event => {
    selectedHostel = event.target.value
    setOccupiedRooms([]);
    setOccupiedRoomsData([]);
    console.log(selectedHostel);
    window.selectedHostel = selectedHostel;
    fetchOccupiedRooms();
  
  };

  const handleChangeRoomies = event =>{
    selectedRoomie = event.target.value;
  };

  const swapRoom = async () => {
    console.log(OccupiedRooms)
    console.log(OccupiedRoomsData)

    console.log(window.selectedRoomie)
    if (selectedRoomie === "EMPTY") {
      alert("Can't swap with EMPTY. Use book function")
      return
    }
    else{

    try {
     

      let selectIndex = OccupiedRooms.indexOf(window.selectedRoom);
      window.selectData = OccupiedRoomsData[selectIndex];
      let ref = doc(db, "hostels", window.selectedHostel, "room", window.selectedRoom);

      console.log("done0");

        if (selectedRoomie === 'p1') {

            window.emailbechara = window.selectData['p1'];

            await updateDoc(ref, {
                p1 : email
              });

              window.selectData['p1'] = email;
            
        } else if(selectedRoomie === 'p2') {

          window.emailbechara = window.selectData['p2'];

          await updateDoc(ref, {
              p2 : email
            });
            
          window.selectData['p2'] = email;
        }
      
        console.log("done1")
////////////////////////////////////
        ref = doc(db, "hostels", hostel, "room", window.room);

        let doc1 = await getDoc(ref);
        
        let data1 = doc1.data();
        
        if (data1.p1 === email) {

          await updateDoc(ref, {
            p1 : window.emailbechara
          });

        }
        else{

          await updateDoc(ref, {
            p2 : window.emailbechara
          });

        }
        console.log("done2")
////////////////////////////////////////////

  ref = doc(db, "users", window.uid);

  await updateDoc(ref, {
    hostel : window.selectedHostel,
    room : window.selectedRoom
  });


  let q = query(collection(db, "users"), where("email", "==", window.emailbechara));
  let doc2 = await getDocs(q);

  let uid2 = doc2.docs[0].id;
  console.log(uid2);

  let useref2 = doc(db, "users", uid2);

  await updateDoc(useref2, {
    hostel : hostel,
    room : window.room
  });

  setHostel(window.selectedHostel);
  room = selectedRoom;

  console.log("done3")

///////////////////////////////////////////////
     
      

      // let selectIndex = OccupiedRooms.indexOf(window.selectedRoom);
        // window.selectData = OccupiedRoomsData[selectIndex];

        // window.ref = doc(db, "hostels", window.selectedHostel, "room", window.selectedRoom);
        // console.log(window.ref)
        // let emailbechara = ""

        // console.log("done0");

        // if (selectedRoomie === 'p1') {

        //     emailbechara = window.selectData['p1']
        //     await updateDoc(window.ref, {
        //         p1 : email
        //       });
        //     window.selectData['p1'] = email;
            
        // } else if(window.selectData['p2'] === 'Occupied') {

        //   emailbechara = window.selectData['p2']
        //   await updateDoc(window.ref, {
        //       p2 : email
        //     });
        //   window.selectData['p2'] = email;

        // }
        // console.log("done1")

        // window.ref = doc(db, "hostels", hostel, "room", window.room);
        // let doc1 = await getDocs(window.ref);
        // let data1 = doc1.docs[0].data();
        // if (data1.p1 === email) {
        //   await updateDoc(window.ref, {
        //     p1 : email
        //   });
        // }
        // else{
        //   await updateDoc(window.ref, {
        //     p2 : email
        //   });
        // }
        // console.log("done2")
///////////////////user part/////////////////////////

      //   window.ref = doc(db, "users", window.uid);

      //   await updateDoc(window.ref, {
      //     hostel : window.selectedHostel,
      //     room : selectedRoom
      //   });
        

      // let q = query(collection(db, "users"), where("email", "==", emailbechara));
      // const doc = await getDocs(q);

      //   await updateDoc(doc.docs[0], {
      //     hostel : hostel,
      //     room : room
      //   });
      //   setHostel(window.selectedHostel);
      //   room = selectedRoom;
      
      //   console.log("done3")
//////////////////////////////////////////////////////////


    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    } 
  }
  };
  

  return (
    
    <div>
  <p>hostel : {hostel}</p>
  <p>room : {room} </p>
 
    <legend>Select hostel</legend>

    <div class="mb-3">
    <select class="form-select" aria-label="Default select example" onChange={handleChangeHostel}>
        <option value>Select hostel</option>
        <option value="B15">B15</option>
        <option value="B18">B18</option>
    </select> 
    <select class="form-select" aria-label="Default select example" onChange={handleChangeRoom}>
        <option value>Select room</option>
        {OccupiedRooms.map(room => <option>{room}</option>)}
    </select> 
    <select class="form-select" aria-label="Default select example" onChange={handleChangeRoomies}>
        <option value>Select hostel</option>
        <option value="p1">{p1}</option>
        <option value="p2">{p2}</option>
    </select> 
    </div>
    <button class="btn btn-primary" onClick={swapRoom}>Swap</button>
</div>

  );
}
export default Swapform;