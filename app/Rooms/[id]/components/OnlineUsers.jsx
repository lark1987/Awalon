"use client"

import React,{ useState,useEffect } from 'react';
import io from 'socket.io-client';

const OnlineUsers = () => {

 const [users, setUsers] = useState(false);

 const roomId = sessionStorage.getItem('roomId')
 const userName = sessionStorage.getItem('userName')
 const userId = sessionStorage.getItem('userId')

 // 連接 Socket 傳遞 spaceId
 const connectSocket=() => { 
   const socket = io('http://localhost:4000');
   socket.emit ('spaceId',roomId)
   socket.on('answer', (msg) => { 
     console.log(msg)
     connectRoom()
     getOnlineUsers()
    })
   return () => {socket.disconnect(); };
 }
 // 創建 room 提供 userName 回傳
 const connectRoom=() => { 
   const socketRoom = io(`http://localhost:4000/${roomId}`);
   socketRoom.emit('setUserName', userName,userId);
   return () => {socketRoom.disconnect(); };
 }
 // 如果無法做到實時更新可以每秒觸發一次
 const getOnlineUsers=() => { 
   const socketRoom = io(`http://localhost:4000/${roomId}`);
   socketRoom.emit('getOnlineUsers');
   socketRoom.on('onlineUsers', (msg) => { 
     console.log(msg)
     const users = Object.values(msg).map(item => item.userName);
     setUsers(users)
   })
   return () => {socketRoom.disconnect(); };
 }

 useEffect(() => connectSocket(), []);


 return (
   <>
   <button onClick={getOnlineUsers}>getOnlineUsers</button><br/><br/>
   <div>目前在線人員：</div><br/>
   { 
     users?
     users.map((user) => (<div key={user}>{user}<br/><br/></div>))
     :(<div>Loading...</div>)
   }
   </>
 )

}

export default OnlineUsers