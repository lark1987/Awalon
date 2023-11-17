"use client"

import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const OnlineUsers = (props) => {

  const { users,setUsers,roomId,userName,userId,userNumber,
    setShowLeader,setShowMission,setShowVote } = props;

    const [connectOK,setConnectOK] = useState(false);

 // 連接 Socket 傳遞 spaceId
 const connectSocket=() => { 
   const socket = io('http://localhost:4000');

   if (!socket.connected){
    setConnectOK(false)
   }

   socket.emit ('spaceId',roomId)
   socket.on('spaceId', () => { 
     connectRoom()
     getOnlineUsers()
     return () => {socket.disconnect(); };
    })
   return () => {socket.disconnect(); };
 }
 // 創建 room 提供 userName 回傳！這裡很特別！用來接收userid專屬訊息！
 const connectRoom=() => { 
   const socketRoom = io(`${socketUrl}${roomId}`);
   socketRoom.emit('setUserName', userName,userId);

   socketRoom.on('leaderAction', (msg) => { 
    console.log(msg)
    setShowLeader(true)
    return () => {socketRoom.disconnect(); };
  })

   socketRoom.on('goMission', (msg) => { 
    console.log(msg)
    setShowVote(false)
    setShowMission(true)
    return () => {socketRoom.disconnect(); };
  })
   return () => {socketRoom.disconnect(); };
 }
 // 獲取線上使用者，並setUsers
 const getOnlineUsers=() => { 
   const socketRoom = io(`${socketUrl}${roomId}`);
   socketRoom.emit('getOnlineUsers');
   socketRoom.on('onlineUsers', (msg) => { 
     const users = Object.values(msg).map(item => item.userName);
     setUsers(users)
     setConnectOK(true)
     return () => {socketRoom.disconnect(); };
   })
   return () => {socketRoom.disconnect(); };
 }

// 連線掛載
useEffect(() => connectSocket(), []);

// 判斷是否玩家中離
useEffect(() => { 
  if(!users) return
  if(!userNumber) return
  if (users.length !== userNumber){
    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('goGameOver','玩家離線，遊戲結束')
    socket.emit('roomOpen')
    return () => {socket.disconnect(); };
  }
  
 },[users])


 return (
   <>
   
   { 
     connectOK?
     (<div><br/>
        <div className='onlineUsers'>
        目前在線人員<br/>
        {users.map((user,index) => (
        <span key={index}>
        <img src='/leaf.png' alt="leaf" /> {user}　
        </span>
        ))}
        </div>
      </div>)
     :(<span>Loading...</span>)
   }
   </>
 )

}

export default OnlineUsers