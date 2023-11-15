"use client"

import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {nanoid} from 'nanoid'
import {db} from '../utils/firebase'
import {addDoc,getDocs,collection,query,where } from 'firebase/firestore'
import '../page.css'
import io from 'socket.io-client';

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

// 開始遊戲：核對房間，儲存資訊於sessionStorage
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

  const nameCheckPromise = new Promise(resolve => {
    const socket = io('http://localhost:4000');
    socket.emit ('nameCheck',roomId)
    socket.once('nameCheck', (arr) => {
      const isNamed = arr.some(item => item.userName === userName);
      resolve(isNamed); 
    });
  });
  
  const isNamed = await nameCheckPromise; 
  if(isNamed){
    setSystemMessage('玩家名稱已被使用');
    return
  }
  
  
  // if(roomData.data().gameStart){
  //   setSystemMessage('遊戲進行中，無法進入')
  //   return
  // }

  
  const userId = nanoid()
  sessionStorage.setItem('roomId',roomId)
  sessionStorage.setItem('userId',userId)
  sessionStorage.setItem('userName',userName)

  router.push(`/Rooms/${roomId}`);

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


// const usersDocRef = collection(db, "Awalon-room",roomData.id,'players')
  // const qName = query(usersDocRef, where("userName", "==", userName));
  // const sameName = await getDocs(qName);
  // if(!sameName.empty){
  //   setSystemMessage('使用者名稱已被使用')
  //   return
  // }
  // 還沒解決離開房間刪名字的問題
  // const userData = await addDoc (collection(db, "Awalon-room",roomData.id,'players'),{userName})