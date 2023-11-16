"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '../utils/firebase'
import { addDoc,getDocs,collection,query,where } from 'firebase/firestore'
import io from 'socket.io-client';
import { nanoid } from 'nanoid'
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
    await addDoc (collection(db, "Awalon-room"),{roomName,roomPassword})
    setSystemMessage('房間創建成功，請點選進入房間')
  }
  
 }

// 開始遊戲：核對房間，socket確認同名及是否遊戲中，完成後儲存sessionStorage
const getStart = async() => {
  const {userName, roomName, roomPassword } = inputData;

  const roomDocRef = collection(db, "Awalon-room");
  const qRoom = query(roomDocRef, where("roomName", "==", roomName), where("roomPassword", "==", roomPassword));
  const data = await getDocs(qRoom);
  const roomData = data.docs[0];
  
  if (data.empty) {
    setSystemMessage('房間名稱或密碼錯誤')
    return
  }

  const roomId = roomData.id

  const roomCheckPromise = new Promise(resolve => {
    const socket = io('http://localhost:4000');
    socket.emit ('roomCheck',roomId,userName)
    socket.once('roomCheck', (msg) => {
      resolve(msg); 
    });
  });
  
  const msg = await roomCheckPromise; 
  if(msg){
    console.log(msg)
    setSystemMessage(msg)
    return
  }
    
  const userId = nanoid()
  sessionStorage.setItem('roomId',roomId)
  sessionStorage.setItem('userId',userId)
  sessionStorage.setItem('userName',userName)

  router.push(`/Rooms/${roomId}`);
  // window.location.href = `/Rooms/${roomId}`;

  return () => {socket.disconnect(); };

};

const goHome = () => { 
  window.location.href = "/";
 }




  return (
   <div className='container'>

   <div className='logo' onClick={goHome}>
    <img src='/logo.png' alt="AWALON" />
    </div><br/>

    <div>
    玩家名稱　
   <input 
   type='text' name='userName' placeholder='請輸入名稱' onChange={handleChange}/><br/><br/>
    房間名稱　
   <input 
   type='text' name='roomName'placeholder='請輸入房名' onChange={handleChange}/><br/><br/>
    房間密碼　
   <input 
   type='password' name='roomPassword' placeholder='請輸入密碼' onChange={handleChange}/><br/><br/>
   </div>

    {systemMessage?
    (<b style={{color:'red'}} >{systemMessage}<br/><br/></b>)
    :[]}

   <div>
   <button onClick={createRoom}> 創建房間 </button>　　　
   <button onClick={getStart}> 進入房間 </button>
   </div>
  

 </div>
  )
}

export default Lobby