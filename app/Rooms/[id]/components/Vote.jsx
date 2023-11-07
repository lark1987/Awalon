import React,{ useState } from 'react';
import io from 'socket.io-client';

const Vote = (props) => {

 const { users,setUsers,roomId,userName,userId } = props;
 const [voteResult, setVoteResult] = useState();
 const [voteFinalResult, setVoteFinalResult] = useState();

// 發送投票到後端，待整合資訊後回傳
 const handleOnClick = (answer) => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('getVote',userId,userName,answer);
  socket.on('getVote',(obj) => { 
    checkVoteResult(obj)
   });
  }

// 收到資訊後，儲存結果 
 const checkVoteResult = (obj) => { 
  const voteRecord = []
  Object.keys(obj).forEach(key => {
   const value = obj[key];
   voteRecord.push(value)
 });
 setVoteResult(voteRecord)
 }

// 投票結果按鈕 
const handleResultOnclick = () => { 
  voteCaculate()
}
// 計算投票結果
const voteCaculate = () => { 
  const answers = voteResult.map(item => item.answer);
  let countAgree = 0
  let countAgainst = 0
 
  answers.forEach(item => {
   if (item === "同意") { 
     countAgree++;
   } else if (item === "反對") {
     countAgainst++;
   }});
 
   if (countAgree > countAgainst) {
     setVoteFinalResult("票選結果：同意")
   } else if (countAgree < countAgainst) {
     setVoteFinalResult("票選結果：反對")
   } else {
     setVoteFinalResult("票選結果：平票")
   }
}




  return (
    <>
    <div>Vote</div><br/>
    <button onClick={()=>handleOnClick('同意')}>同意</button>
    <button onClick={()=>handleOnClick('反對')}>反對</button>
    <br/><br/>
    <button onClick={handleResultOnclick}>投票結果</button>
    <br/><br/>
    <div>{voteFinalResult}</div><br/>
    {
      voteFinalResult?
      voteResult.map((data,index) => (
        <div key={index}>{data.userName}：{data.answer}</div>
      ))
      :[]
    }
    <br/>
   </>
  )
}

export default Vote