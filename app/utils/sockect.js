import React, { useEffect  } from 'react';
import io from 'socket.io-client';

const OnlineUsersCounter = () => {

  useEffect (() => {
    const socket = io('http://localhost:4000/123456');
    return () => {
      socket.disconnect();
    };
  }, []);

  const test=() => { 

  }

  const test2=() => { 
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