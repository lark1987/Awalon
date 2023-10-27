"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {db} from './utils/firebase'
import {addDoc,getDocs,collection,query,where,} from 'firebase/firestore'
import './page.css'

export default function Home() {

  const [inputData, setInputData] = useState({
    userName: '', roomName: '', roomPassword: ''
  });

  const router = useRouter();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,[name]:value,
    }));
  };

  const createRoom = async() => { 
    const {userName, roomName, roomPassword } = inputData;
    const roomDocRef = collection(db, "Awalon-room");
    const q = query(roomDocRef, where("roomName", "==", roomName))
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('房間名字已被使用')
    }
    else{
      await addDoc (collection(db, "Awalon-room"),{roomName,roomPassword})
      console.log('房間創建成功！')
    }
    
   }

  const getStart = async() => {
    const {userName, roomName, roomPassword } = inputData;
    const roomDocRef = collection(db, "Awalon-room");
    const q = query(roomDocRef, where("roomName", "==", roomName), where("roomPassword", "==", roomPassword));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      router.push(`/Rooms/${docSnap.id}`);
    }
    else{
      console.log('進入房間失敗')
    }
  };

  return (
    <div className='container'>

      <h1>Welcome to Awalon</h1>

      <input 
      type='text' name='userName' placeholder='請輸入名稱' onChange={handleChange}/><br/><br/>
      <input 
      type='text' name='roomName'placeholder='請輸入房名' onChange={handleChange}/><br/><br/>
      <input 
      type='password' name='roomPassword' placeholder='請輸入密碼' onChange={handleChange}/><br/><br/>
      
      <button onClick={createRoom}> 創建房間 </button><br/><br/>
      <button onClick={getStart}> 進入房間 </button><br/><br/>
      

    </div>
  )
}
