
import React,{ useState } from 'react';
import io from 'socket.io-client';

const Role = (props) => {

  const { users,setUsers,roomId,userName,userId } = props;

  const [roleButtons, setRoleButtons] = useState();
  

 const good = (index) => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('joinGood');
  socket.on('groupMessage', (msg) => { 
    console.log(msg)
  })
  return () => {socket.disconnect(); };
 }

 const bad = (index) => { 
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

 let buttons = null;

 const setRole=() => { 

  if (users.length < 6) {
    buttons = (
      <div>
        <button onClick={good}>Good</button>
        <button onClick={good}>Good</button>
        <button onClick={bad}>Bad</button>
      </div>
    );
    setRoleButtons(buttons)
  }

  
  }










  return (
   <>
    <button onClick={good}>good</button>
    <button onClick={bad}>bad</button>
    <button onClick={message}>message</button>

    <br/><br/>

    <button onClick={setRole}>setRole</button>
    <br/><br/>
    <div>{roleButtons}</div>



    <br/><br/>
    {/* <div>
      { users?
        users.map((user, index) => (
        <button key={index} onClick={index < 2 ? good(index) : bad(index)}> role
        </button>))
        :[]
      }
    </div> */}
   </>
  )
}

export default Role