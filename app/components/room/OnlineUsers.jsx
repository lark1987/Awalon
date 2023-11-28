"use client"

import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const OnlineUsers = (props) => {

  const { users,setUsers,roomId,userName,userId,userNumber,
    setShowRule,setShowLeader,setShowMission,setShowVote } = props;

  const [connectOK,setConnectOK] = useState(false);

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
    setConnectOK(true)
  };
  const socketRoom = io(`${socketUrl}${roomId}`);
  onloadData(socketRoom);
  return () => {socketRoom.disconnect(); };
}, []);


// 判斷是否玩家中離！這裡要再改
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


 return (
   <>


   
   { 
     connectOK && users && !userNumber ?
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