"use client"

import { useEffect } from 'react';
import io from 'socket.io-client';

import '../../../page.css'

const OnlineUsers = (props) => {

  const { users,setUsers,roomId,userName,userId,userNumber,
    setShowLeader,setShowMission,setShowVote } = props;

 // 連接 Socket 傳遞 spaceId
 const connectSocket=() => { 
   const socket = io('http://localhost:4000');
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
   const socketRoom = io(`http://localhost:4000/${roomId}`);
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

useEffect(() => { 
  // console.log(userNumber)
  if(!users) return
  if(!userNumber) return
  if (users.length !== userNumber){
    console.log('玩家離線，遊戲中止')
    const socket = io(`http://localhost:4000/${roomId}`);
    socket.emit('goGameOver','玩家離線，遊戲中止')
    return () => {socket.disconnect(); };
  }
  
 },[users])


 return (
   <>
   
   { 
     users?
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