"use client"

import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import {nanoid} from 'nanoid'
import {db} from '../../../utils/firebase'
import {deleteDoc,doc, } from 'firebase/firestore'

const OnlineUsers = (props) => {

  const { users, setUsers,roomId,userName,userId,setShowLeader,setShowMission,setVoteFailedRecord } = props;

 // 連接 Socket 傳遞 spaceId
 const connectSocket=() => { 
   const socket = io('http://localhost:4000');
   socket.emit ('spaceId',roomId)
   socket.on('answer', (msg) => { 
     connectRoom()
     getOnlineUsers()
     return () => {socketRoom.disconnect(); };
    })
   return () => {socket.disconnect(); };
 }
 // 創建 room 提供 userName 回傳！這裡很特別！用來接收userid專屬訊息！
 const connectRoom=() => { 
   const socketRoom = io(`http://localhost:4000/${roomId}`);
   socketRoom.emit('setUserName', userName,userId);

   socketRoom.on('leaderAction', (msg) => { 
    console.log(msg)
    setShowLeader(true)
    return () => {socketRoom.disconnect(); };
  })

   socketRoom.on('goMission', (msg) => { 
    console.log(msg)
    setShowMission(true)
    setVoteFailedRecord('')
    return () => {socketRoom.disconnect(); };
  })

    
   return () => {socketRoom.disconnect(); };
 }
 // 獲取線上使用者，並setUsers
 const getOnlineUsers=() => { 
   const socketRoom = io(`http://localhost:4000/${roomId}`);
   socketRoom.emit('getOnlineUsers');
   socketRoom.on('onlineUsers', (msg) => { 
     const users = Object.values(msg).map(item => item.userName);
     setUsers(users)
     return () => {socketRoom.disconnect(); };
   })
   return () => {socketRoom.disconnect(); };
 }


useEffect(() => connectSocket(), []);


 return (
   <>
   <span>目前在線人員：
   { 
     users?
     (users.map((user) => (<span key={nanoid()}>　{user}</span>)))
     :(<span>Loading...</span>)
   }
   </span>
   </>
 )

}

export default OnlineUsers