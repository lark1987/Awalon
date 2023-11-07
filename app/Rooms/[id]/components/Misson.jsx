import React from 'react'
import io from 'socket.io-client';

const Misson = (props) => {

 const { users,setUsers,roomId,userName,userId } = props;

 const handleOnClick = (answer) => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('getMissonResult',userId,answer);
  socket.on('getMissonResult',(obj) => { 
   checkMissonResult(obj)
   });
  }

  const checkMissonResult = (obj) => { 

   const missonRecord = []
   Object.keys(obj).forEach(key => {
    const value = obj[key];
    missonRecord.push(value)
  });
   if (missonRecord.includes("失敗")) {
    console.log("结果失敗");
  } else {
    console.log("结果成功");
  }
   
  }


  return (
   <>
    <div>Misson</div><br/>
    <button onClick={()=>handleOnClick('成功')}>任務成功</button>
    <button onClick={()=>handleOnClick('失敗')}>任務失敗</button>
    <br/>
    <br/>
   </>
  )
}

export default Misson