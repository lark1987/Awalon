"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {db} from '../utils/firebase'
import {addDoc,getDocs,collection,query,where } from 'firebase/firestore'
import {nanoid} from 'nanoid'
import '../page.css'

const Lobby = () => {

 const [inputData, setInputData] = useState();
 const [systemMessage, setSystemMessage] = useState();

const router = useRouter();

const handleChange = (e) => {
  const { name, value } = e.target;
  setInputData((prevData) => ({
    ...prevData,[name]:value,
  }));
};

// 創建房間：核對房名 > 於 firebase 創建房間
const createRoom = async() => { 
  const {userName, roomName, roomPassword } = inputData;
  const roomDoc = collection(db, "Awalon-room");
  const q = query(roomDoc, where("roomName", "==", roomName))
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    setSystemMessage('房間名字已被使用')
  }
  else{
    const newData = await addDoc (collection(db, "Awalon-room"),{roomName,roomPassword})
    setSystemMessage('房間創建成功，請點選進入房間')
  }
  
 }

// 開始遊戲：核對密碼 > 將 roomId、userName、userId 存放於 sessionStorage
const getStart = async() => {
  const {userName, roomName, roomPassword } = inputData;
  const roomDocRef = collection(db, "Awalon-room");
  const q = query(roomDocRef, where("roomName", "==", roomName), where("roomPassword", "==", roomPassword));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];

    if(!docSnap.data().gameStart){
      const userId = nanoid()
      sessionStorage.setItem('roomId',docSnap.id)
      sessionStorage.setItem('userName',userName)
      sessionStorage.setItem('userId',userId)
      router.push(`/Rooms/${docSnap.id}`);
    }
    else{
      setSystemMessage('遊戲進行中，無法進入')
    }
  }
  else{
    setSystemMessage('進入房間失敗')
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
   <div>{systemMessage}</div>     

 </div>
  )
}

export default Lobby