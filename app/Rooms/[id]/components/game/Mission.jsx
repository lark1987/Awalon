import React from 'react'
import io from 'socket.io-client';

const Mission = (props) => {

 const { roomId,userId,showMission,setShowMission } = props;

 const handleOnClick = (answer) => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('getMissonResult',userId,answer);
  setShowMission(false)
  return () => {socket.disconnect(); };
 }

  return (
   <>
    {showMission &&
    (<div>
      <button onClick={()=>handleOnClick('成功')}>任務成功</button>
      <button onClick={()=>handleOnClick('失敗')}>任務失敗</button><br/><br/>
      </div>)
    }

    
   </>
  )
}

export default Mission