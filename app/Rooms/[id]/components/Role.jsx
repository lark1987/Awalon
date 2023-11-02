
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
// 依照人數生成好人壞人的列表，成功之後亂序排列

// 可依照列表生成好人壞人的按鈕
 const setRole=() => { 
  const roles = ['good','good','bad'];
  const roleButtons = roles.map((role,index) => (
    <button key={index} onClick={role === 'good'? good:bad}>
      {role}
    </button>
  ));
  setRoleButtons(roleButtons)
}
  




  return (
   <>
    <button onClick={good}>good</button>
    <button onClick={bad}>bad</button>
    <button onClick={message}>message</button>

    <br/><br/>

    <button onClick={setRole}>setRole</button>
    <br/><br/>
    <div>
      {roleButtons ? roleButtons:[]}
    </div>

    <br/><br/>
   </>
  )
}

export default Role