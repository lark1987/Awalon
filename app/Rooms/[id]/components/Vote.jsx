import React,{ useState } from 'react';
import io from 'socket.io-client';

const Vote = (props) => {

 const { users,setUsers,roomId,userName,userId } = props;
 const [voteResult, setVoteResult] = useState();

 const handleOnClick = (answer) => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('getVote',userId,userName,answer);
  socket.on('getVote',(obj) => { 
    checkVoteResult(obj)
   });
  }

 const checkVoteResult = (obj) => { 

  const voteRecord = []
  Object.keys(obj).forEach(key => {
   const value = obj[key];
   voteRecord.push(value)
 });

 setVoteResult(voteRecord)
 console.log(voteRecord)
 }

// 進度到這 ~~~ 這裡要做 票選結果 (每人+最終)
 const handleVoteResult = () => { 

 const answers = voteResult.map(item => item.answer);
 console.log(answers); 
  }




  return (
    <>
    <div>Vote</div><br/>
    <button onClick={()=>handleOnClick('贊成')}>贊成</button>
    <button onClick={()=>handleOnClick('反對')}>反對</button>
    <br/><br/>
    <button onClick={handleVoteResult}>投票結果</button>
    <br/>
    <br/>
   </>
  )
}

export default Vote