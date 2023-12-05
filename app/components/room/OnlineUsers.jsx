"use client"

import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const OnlineUsers = (props) => {

  const { users,setUsers,roomId,userName,userId,userNumber,gameOver,
    setShowRule,setShowLeader,setShowMission,setShowVote } = props;

 // 提供使用者資料，用來接收userid專屬訊息！
 const createUserData=(socket) => { 
  socket.emit('setUserName', userName,userId);
  socket.on('leaderAction', () => { 
  setShowRule(false)
  setShowLeader(true)
  })
  socket.on('goMission', () => { 
  setShowVote(false)
  setShowMission(true)
  })
 }
 // 獲取線上使用者
 const getOnlineUsers=(socket) => { 
  socket.emit('getOnlineUsers');
  socket.on('onlineUsers', (msg) => { 
    const users = Object.values(msg).map(item => item.userName);
    setUsers(users)
  })
 }

// 連線掛載
 useEffect(() => { 
  const onloadData = async (socketRoom) => {
    createUserData(socketRoom)
    await Promise.resolve(getOnlineUsers(socketRoom));
  };
  const socketRoom = io(`${socketUrl}${roomId}`);
  onloadData(socketRoom);
  return () => {socketRoom.disconnect(); };
}, []);


// 判斷是否玩家中離
useEffect(() => { 
  if(!users) return
  if(!userNumber) return
  if (users.length !== userNumber){
    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('goGameOver','玩家離線，遊戲中止')
    socket.emit('roomOpen')
    return () => {socket.disconnect(); };
  }
 },[users])

// 關閉頁面處理
useEffect(() => {
  const socket = io(`${socketUrl}${roomId}`);

  const handleBeforeUnload = (event) => {
    if(userNumber){
      socket.emit('goGameOver', '玩家離線，遊戲中止');
      socket.emit('roomOpen');
    }
    socket.disconnect(); 
    const message = '您確定要離開嗎？';
    event.returnValue = message;
    return message;
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => {
    socket.disconnect();
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);


 return (
   <>
   { 
     users && !userNumber && !gameOver ?
     (<><br/><br/>
        <div className='onlineUsers'>
        目前在線人員<br/>
        {users.map((user,index) => (
        <span key={index}>
        <img src='/leaf.png' alt="leaf" /> {user}　
        </span>
        ))}
        </div>
        <br/>
        <div className='mini-text-grey'>
        請留意，遊戲中若關閉或刷新頁面，將導致遊戲中斷
        <hr/>
        </div>
        <br/>
      </>)
     :[]
   }
   </>
 )

}

export default OnlineUsers