"use client"

import React,{ useState,useEffect,useMemo } from 'react';
import io from 'socket.io-client';

const RoomIdPage = () => {

  const [users, setUsers] = useState(false);

  const roomId = sessionStorage.getItem('roomId')
  const userName = sessionStorage.getItem('userName')

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

  const connectRoom=() => { 
    const socketRoom = io(`http://localhost:4000/${roomId}`);
    socketRoom.emit('setUserName', userName);
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


  const good = () => { 
    const socket = io(`http://localhost:4000/${roomId}`);
    socket.emit('joinGood');
    socket.on('groupMessage', (msg) => { 
      console.log(msg)
    })
   }

   const bad = () => { 
    const socket = io(`http://localhost:4000/${roomId}`);
    socket.emit('joinBad');
    socket.on('groupMessage', (msg) => { 
      console.log(msg)
    })
   }

   const message = () => { 
    const socket = io(`http://localhost:4000/${roomId}`);
    socket.emit('checkGroup');
   }

 

  


  

  return (
    <>
    <div>RoomIdPage</div><br/>
    <button onClick={getOnlineUsers}>getOnlineUsers</button><br/><br/>
    <div>目前在線人員：</div><br/>
    { 
      users?
      users.map((user) => (<div key={user}>{user}<br/><br/></div>))
      :(<div>Loading...</div>)
    }

    <button onClick={good}>good</button>
    <button onClick={bad}>bad</button>
    <button onClick={message}>message</button>
    
    </>
  )
}

export default RoomIdPage

