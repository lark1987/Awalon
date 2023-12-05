"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '../utils/firebase'
import { addDoc,getDocs,collection,query,where } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import io from 'socket.io-client';
import { socketUrl } from '../utils/socketUrl';
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
  const roomRef = collection(db, "Awalon-room");
  const q = query(roomRef, where("roomName", "==", roomName))
  const roomDouble = await getDocs(q);

  if (!roomDouble.empty) {
    setSystemMessage('房間名字已被使用')
  }
  else{
    await addDoc (collection(db, "Awalon-room"),{roomName,roomPassword})
    setSystemMessage('房間創建成功，請點選進入房間')
  }
  
 }

// 開始遊戲：確認房間狀況(密碼+同名+關閉)，儲存sessionStorage
const getStart = async() => {

  if(!inputData){
    setSystemMessage('尚有內容未填寫')
    return
  }

  const {userName, roomName, roomPassword } = inputData;

  if(!userName || !roomName || !roomPassword){
    setSystemMessage('尚有內容未填寫')
    return
  }

  setSystemMessage('Loading...')

  const roomRef = collection(db, "Awalon-room");
  const qRoom = query(roomRef, where("roomName", "==", roomName), where("roomPassword", "==", roomPassword));
  const data = await getDocs(qRoom);

  if (data.empty) {
    setSystemMessage('房間名稱或密碼錯誤')
    return
  }

  const roomData = data.docs[0];
  const roomId = roomData.id

  // 確認是否玩家同名、遊戲進行中
  const roomCheckPromise = new Promise(resolve => {
  
  // const socket = io(socketUrl, {
  //   withCredentials: true,
  //   extraHeaders: {
  //     "Access-Control-Allow-Origin": "https://awalon.vercel.app"
  // }
  // });
    const socket = io(socketUrl);
    
    // 開後端房間
    socket.emit ('spaceId',roomId)
    socket.emit ('roomCheck',roomId,userName)
    socket.once('roomCheck', (msg) => {
      resolve(msg); 
    });
  });
  
  const msg = await roomCheckPromise; 
  if(msg){
    setSystemMessage(msg)
    return
  }
    
  const userId = nanoid()
  sessionStorage.setItem('roomId',roomId)
  sessionStorage.setItem('userId',userId)
  sessionStorage.setItem('userName',userName)

  router.push(`/rooms/${roomId}`);

  return () => {socket.disconnect(); };

};

const goGuide = () => { 
  router.push('/guide');
 }



  return (
   <div className='container'>

   <div className='logo'><img src='/logo.png' alt="logo" /></div><br/>

    <div>
    玩家名稱　
   <input style={{padding:'5px',borderRadius: '5px'}}
   type='text' name='userName' placeholder='請輸入名稱' onChange={handleChange}/><br/><br/>
    房間名稱　
   <input style={{padding:'5px',borderRadius: '5px'}}
   type='text' name='roomName'placeholder='請輸入房名' onChange={handleChange}/><br/><br/>
    房間密碼　
   <input style={{padding:'5px',borderRadius: '5px'}}
   type='password' name='roomPassword' placeholder='請輸入密碼' onChange={handleChange}/><br/><br/>
   </div>

    {systemMessage?
    (<b style={{color:'blue'}} >{systemMessage}<br/><br/></b>)
    :[]}

   <div style={{display:'flex',justifyContent:'space-evenly',}}>
   <button onClick={goGuide}> 網站說明 </button>
   <button onClick={createRoom}> 創建房間 </button>
   <button onClick={getStart}> 進入房間 </button>
   </div>
   <br/>
  

 </div>
  )
}

export default Lobby