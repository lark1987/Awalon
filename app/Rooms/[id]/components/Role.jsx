
import io from 'socket.io-client';

const Role = () => {

  const roomId = sessionStorage.getItem('roomId')

 const good = () => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('joinGood');
  socket.on('groupMessage', (msg) => { 
    console.log(msg)
  })
  return () => {socket.disconnect(); };
 }

 const bad = () => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('joinBad');
  socket.on('groupMessage', (msg) => { 
    console.log(msg)
  })
  return () => {socket.disconnect(); };
 }

 const message = () => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('checkGroup');
  return () => {socket.disconnect(); };
 }




  return (
   <>
    <button onClick={good}>good</button>
    <button onClick={bad}>bad</button>
    <button onClick={message}>message</button>
   </>
  )
}

export default Role