"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {db} from './utils/firebase'
import {addDoc,collection} from 'firebase/firestore'
import './page.css'
import { nanoid } from 'nanoid';

export default function Home() {

  const [inputData, setInputData] = useState({
    userName: '', roomName: '', roomPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,[name]:value,
    }));
  };

  const router = useRouter();
  const creatUserAndRoom = async() => {
    const {userName,roomName,roomPassword} =inputData
    await addDoc (collection(db, "Awalon-room"),{roomName,roomPassword})
    await addDoc (collection(db, "Awalon-user"),{userName})

    const randomID = nanoid();
    router.push(`/Rooms/${randomID}`);
  };


      

  const downloadRoomData = async() => { 

    const { roomName, roomPassword } = inputData;
    const roomDocRef = collection(db, "Awalon-room");
    const q = query(roomDocRef, where("roomName", "==", roomName), where("roomPassword", "==", roomPassword));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      const newData = {
        'roomID': docSnap.id,
        'roomName': docSnap.data().roomName,
        'roomPassword': docSnap.data().roomPassword,
        'userName': docSnap.data().userName
      };
      console.log(newData);
      setRoomData(newData);
    } else {
      console.log("No such document!");
    }

  }



 const test=() => { 

  }





  return (
    <div className='container'>

      <h1>Welcome to Awalon</h1>

      <input 
      type='text' name='userName' placeholder='請輸入名稱' onChange={handleChange}/><br/><br/>
      <input 
      type='text' name='roomName'placeholder='請輸入房名' onChange={handleChange}/><br/><br/>
      <input 
      type='password' name='roomPassword' placeholder='請輸入密碼' onChange={handleChange}/><br/><br/>
      
      <button onClick={creatUserAndRoom}> START </button><br/><br/>
      

    </div>
  )
}
