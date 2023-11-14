import React from 'react'
import io from 'socket.io-client';
import '../../../../page.css'

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
    (<div><div style={{display:'flex',justifyContent:'space-evenly'}}>
      <div><label>
        <br/><img src='/mission-yes.png' alt="yes" style={{height:'100px','cursor':'pointer'}} /><br/>
        <button onClick={()=>handleOnClick('成功')}>任務成功</button>
      </label></div>
      <div><label>
        <br/><img src='/mission-no.png' alt="no" style={{height:'100px','cursor':'pointer'}} /><br/>
        <button className='btn-red' onClick={()=>handleOnClick('失敗')}>任務失敗</button><br/><br/>
      </label></div>
      </div>
      <span className='mini-text-grey'>溫馨提醒：好人陣營只能選任務成功喔！</span><br/><br/><br/>
    </div>)
    }

    
   </>
  )
}

export default Mission