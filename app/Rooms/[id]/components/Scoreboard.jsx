import React from 'react'
import io from 'socket.io-client';

const Scoreboard = (props) => {

  const { users,setUsers,roomId,userName,userId,gameRecord, } = props;

 



  return (
   <>
    <div>Scoreboard</div>
    <div>
      {gameRecord?
      gameRecord.map((record,index)=>(
        <div key={index}>{record}
        </div>
      ))
      :[]
      }
    </div>
    <br/><br/>
   </>
  )
}

export default Scoreboard