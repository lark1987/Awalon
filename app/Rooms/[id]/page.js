"use client"

import React,{ useState,useEffect,useMemo } from 'react';
import io from 'socket.io-client';

const RoomIdPage = () => {

  // const [spaceState, setSpaceState] = useState(false);

  const roomId = sessionStorage.getItem('roomId')
  const userName = sessionStorage.getItem('userName')

  const connectSocket=() => { 
    const socket = io('http://localhost:4000');
    socket.emit ('spaceId',roomId)
    socket.on('answer', (msg) => { 
      console.log(msg)
      connectRoom()
     })
    return () => {socket.disconnect(); };
  }

  const connectRoom=() => { 
    const socketRoom = io(`http://localhost:4000/${roomId}`);
    socketRoom.emit('setUserName', userName);
    return () => {socketRoom.disconnect(); };
  }

  useEffect(() => connectSocket(), []);





   





  // useEffect (() => {
  //   const socket = io(`http://localhost:4000/${roomId}`);
  //   return () => {socket.disconnect(); };
  // }, []);

  // socket.on('error', (error) => {
  //   console.error('Socket.IO error:', error);
  // });





  


  

  return (
    <>
    <div>RoomIdPage</div><br/><br/>
    {/* <button onClick={test}>TEST</button> */}
    </>
  )
}

export default RoomIdPage

