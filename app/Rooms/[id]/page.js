"use client"

import React,{ useEffect } from 'react';
import io from 'socket.io-client';

const RoomIdPage = () => {

  const roomId = sessionStorage.getItem('roomId')


  useEffect (() => {
    const socket = io(`http://localhost:4000/${roomId}`);
    return () => {socket.disconnect(); };
  }, []);




  


  

  return (
    <>
    <div>RoomIdPage</div><br/><br/>
    </>
  )
}

export default RoomIdPage

