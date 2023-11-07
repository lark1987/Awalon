"use client"

import React,{ useState } from 'react';
import io from 'socket.io-client';

import OnlineUsers from './components/OnlineUsers'
import Role from './components/Role'
import Game from './components/Game'

const RoomIdPage = () => {

  const [users, setUsers] = useState();
  const [gameUsers, setGameUsers] = useState();

  const [showRole, setShowRole] = useState(true);
  const [showGame, setShowGame] = useState(false);


  // const [gameRecord, setGameRecord] = useState([]);

  const roomId = sessionStorage.getItem('roomId')
  const userName = sessionStorage.getItem('userName')
  const userId = sessionStorage.getItem('userId')

  // 進度到這 ~~~ 要處理回傳的物件數量 = users 才 setter 有可能需要操作 await 
const toGame = () => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('goGame',userId,userName);
  socket.on('goGame',(obj) => { 
    console.log(obj)
    // setShowRole(false)
    // setShowGame(true)
   });
 }

   const commonProps = {
    users,setUsers,roomId,userName,userId,
    toGame
  }



  return (
    <>
    <div>RoomIdPage</div><br/>

    <OnlineUsers {...commonProps} />
    {showRole && <Role {...commonProps} />}
    {showGame && <Game {...commonProps} />}
    

    </>
  )
}

export default RoomIdPage

    // 暫停處理：遊戲開始後，房間禁止進入 (未完成)
    // const roomNoEntry = async() => { 
    //   const roomDocRef = doc(db, "Awalon-room",roomId);
    //   await updateDoc(roomDocRef, {
    //     gameStart: true
    //   });
    // }
  
    // 暫停處理：計分版
    // const scoreRecord = (data) => { 
    //   setGameRecord((prev) => [...prev,data]);
    //  }