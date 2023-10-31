import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const OnlineUsersCounter = () => {

  const socket = io('http://localhost:4000');

  socket.on('roomNotification', (message) => {
    console.log(message)
  });

  const test=() => { 
    socket.emit('joinRoom', 'roomA');
   }

   const test2=() => { 
    socket.emit('leaveRoom', 'roomA');
   }





   


  return (
    <div>
      <p>這裡是OnlineUsersCounter</p>
      <button onClick={test}>TEST</button>
      <button onClick={test2}>TEST</button>
    </div>
  );
};

export default OnlineUsersCounter;