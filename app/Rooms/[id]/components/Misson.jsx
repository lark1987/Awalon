import React from 'react'
import io from 'socket.io-client';

const Misson = (props) => {

 const { users,setUsers,roomId,userName,userId,scoreRecord} = props;

 const handleOnClick = async(answer) => { 

  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('getMissonResult',userId,answer);
  const missonResult = await new Promise((resolve, reject) => {
    socket.on('getMissonResult', (obj) => {
      resolve(checkMissonResult(obj));
    });
  });
  // scoreRecord(missonResult) 記分板稍後
  }

  const checkMissonResult = (obj) => { 
    
  let missonResult = ''
   const missonRecord = []
   Object.keys(obj).forEach(key => {
    const value = obj[key];
    missonRecord.push(value)
  });
   if (missonRecord.includes("失敗")) {
    console.log('失敗')
    return missonResult = '失敗'
  } else {
    console.log('成功')
    return missonResult = '成功'
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