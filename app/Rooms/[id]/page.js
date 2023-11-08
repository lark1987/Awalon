"use client"

import React,{ useState } from 'react';
import io from 'socket.io-client';

import OnlineUsers from './components/OnlineUsers'
import Role from './components/Role'
import Game from './components/Game'
import Leader from './components/game/Leader'
import Vote from './components/game/Vote'
import Mission from './components/game/Mission'

const RoomIdPage = () => {

  const [users, setUsers] = useState();
  const [userReady, setUserReady] = useState();
  const [selectedList, setSelectedList] = useState();

  const [showLeader, setShowLeader] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [showMission, setShowMission] = useState(false);


  // const [gameRecord, setGameRecord] = useState([]);

  const roomId = sessionStorage.getItem('roomId')
  const userName = sessionStorage.getItem('userName')
  const userId = sessionStorage.getItem('userId')

  // 從 role 轉至 Game
const toGame = async() => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('goGame',userId,userName);
  socket.on('goGame', (obj) => {
    let ready = []
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      ready.push(value)
     })
     setUserReady(ready)
  })
  return () => {socket.disconnect(); };
}

   const commonProps = {
    users,setUsers,roomId,userName,userId,
    toGame,userReady,
    selectedList, setSelectedList,
    
    showLeader,setShowLeader,
    showVote,setShowVote,
    showMission, setShowMission
  }



  return (
    <>
    <div>RoomIdPage</div><br/>

    <OnlineUsers {...commonProps} /><br/><br/>
    <Role {...commonProps} />
    <Game {...commonProps} />
    <Leader {...commonProps} />
    <Vote {...commonProps} />
    <Mission {...commonProps} />
  
    

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