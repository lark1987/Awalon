import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const OnlineUsersCounter = () => {
  const socket = io('http://localhost:4000/');

  socket.on('updateOnlineUsers', (onlineUsers) => {
   console.log('在線使用者：',onlineUsers)
 });

  return (
    <div>
      <p>這裡是OnlineUsersCounter</p>
    </div>
  );
};

export default OnlineUsersCounter;