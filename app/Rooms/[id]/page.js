"use client"

import React,{ useState } from 'react';
import OnlineUsers from './components/OnlineUsers'
import Role from './components/Role'
import Game from './components/Game'
import Vote from './components/Vote'
import Misson from './components/Misson'

const RoomIdPage = () => {

  const [users, setUsers] = useState(false);
  const [openGame, setOpenGame] = useState(false);

  const roomId = sessionStorage.getItem('roomId')
  const userName = sessionStorage.getItem('userName')
  const userId = sessionStorage.getItem('userId')

  const commonProps = {
    users,setUsers,roomId,userName,userId
  }



  // 遊戲開始後，房間禁止進入 (未完成)
  const roomNoEntry = async() => { 
    const roomDocRef = doc(db, "Awalon-room",roomId);
    await updateDoc(roomDocRef, {
      gameStart: true
    });
  }

  return (
    <>
    <div>RoomIdPage</div><br/>
    <OnlineUsers {...commonProps} />
    <Role {...commonProps}/>
    <Game {...commonProps}/>
    <Vote {...commonProps}/>
    <Misson {...commonProps}/>

    </>
  )
}

export default RoomIdPage

