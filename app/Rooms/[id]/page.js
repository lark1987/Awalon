"use client"

import React,{ useState } from 'react';
import OnlineUsers from './components/OnlineUsers'
import Scoreboard from './components/Scoreboard'
import Role from './components/Role'
import Game from './components/Game'
import Vote from './components/Vote'
import Misson from './components/Misson'
import Assassin from './components/Assassin'

const RoomIdPage = () => {

  const [users, setUsers] = useState();
  const [gameRecord, setGameRecord] = useState([]);

  const roomId = sessionStorage.getItem('roomId')
  const userName = sessionStorage.getItem('userName')
  const userId = sessionStorage.getItem('userId')






  // 遊戲開始後，房間禁止進入 (未完成)
  const roomNoEntry = async() => { 
    const roomDocRef = doc(db, "Awalon-room",roomId);
    await updateDoc(roomDocRef, {
      gameStart: true
    });
  }

  // 暫停處理：計分版
  const scoreRecord = (data) => { 
    setGameRecord((prev) => [...prev,data]);
   }

  const commonProps = {
    users,setUsers,roomId,userName,userId,gameRecord,setGameRecord,
    scoreRecord,
  }

  return (
    <>
    <div>RoomIdPage</div><br/>
    <OnlineUsers {...commonProps} />
    <Role {...commonProps}/>
    <Game {...commonProps}/>
    <Vote {...commonProps}/>
    <Misson {...commonProps}/>
    <Assassin {...commonProps}/>
    <Scoreboard {...commonProps} />

    </>
  )
}

export default RoomIdPage

