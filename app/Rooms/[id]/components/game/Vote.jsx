import React,{ useState,useEffect } from 'react';
import io from 'socket.io-client';

const Vote = (props) => {

 const {
  users,roomId,userName,userId,leaderName,leaderList,
  selectedList,missionResult,voteFailedRecord,
  showVote,
  voteFinalResult, setVoteFinalResult,gameOver
} = props;

 const [voteResult, setVoteResult] = useState();
//  const [voteFinalResult, setVoteFinalResult] = useState();


// 投票按鈕：發送答案到後端整合，紀錄投票結果
 const handleOnClick = (answer) => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('getVote',userId,userName,answer);
  socket.on('getVote',(obj) => { 
    checkVoteResult(obj)
   });
  return () => {socket.disconnect(); };
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
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('getVoteResult',voteResult);
  return () => {socket.disconnect(); };
 }
// 計算投票結果
 const handleVoteFinalResult = (obj) => { 
  const answers = obj.map(item => item.answer);
  let countAgree = 0
  let countAgainst = 0
 
  answers.forEach(item => {
   if (item === "同意") { 
     countAgree++;
   } else if (item === "反對") {
     countAgainst++;
   }});
 
   if (countAgree > countAgainst) {
     setVoteFinalResult("同意")
   } else {
     setVoteFinalResult("反對")
   }
 }


// 投票結果處理
 const handleNextOnclick = () => {

  // 投票同意：提供名單給後端，後端給發出任務給被選擇的人。
  if(voteFinalResult == '同意'){
    const socket = io(`http://localhost:4000/${roomId}`);
    socket.emit('goMission',selectedList);
    return () => {socket.disconnect(); };
  }

  //投票反對：開啟下一局，紀錄反對次數 
  if(voteFinalResult == '反對'){
    const socket = io(`http://localhost:4000/${roomId}`);

    if(voteFailedRecord.length > 3){
      socket.emit('goGameOver','遊戲結束，壞人陣營勝利',)
      return
    }

    const leaderIndex = leaderList.indexOf(leaderName);
    const nextIndex = (leaderIndex + 1) % leaderList.length;
    const newleaderName = leaderList[nextIndex];
    socket.emit('goNextGame',);
    socket.emit('leaderAction',newleaderName);

    return () => {socket.disconnect(); };
  };
}


// 監聽加載
const onload = () => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.on('getVoteResult',(obj) => { 
    handleVoteFinalResult(obj)
   });
  return () => {socket.disconnect(); };
}

useEffect(() => onload(), []);



  return (
    <>

    { showVote && !voteResult &&
      (<div>
        是否同意上述人員出任務？　
      <button onClick={()=>handleOnClick('同意')}>同意</button>　
      <button onClick={()=>handleOnClick('反對')}>反對</button>
      </div>)
    }

    {
      voteResult && voteResult.length !== users.length &&
      (<div>請稍候，其他玩家投票中　
        {voteResult.map((data,index) => (
          <span key={index}>{data.userName} OK　</span>
        ))}
      </div>)
    }

    {
    voteResult && voteResult.length === users.length && !voteFinalResult &&
     (<div>投票結束，請確認投票結果<br/><br/>
      <button onClick={handleResultOnclick}>投票結果</button>
      </div>)
    }

    
    {
     voteFinalResult && !missionResult && !gameOver &&
      (
        <div>
        投票結果：{voteFinalResult}<br/><br/>
        {voteResult.map((data,index) => (
          <div key={index}>{data.userName}：{data.answer}</div>
        ))}
        <button onClick={handleNextOnclick}>繼續遊戲</button>
        </div>
      )
    }




   </>
  )
}

export default Vote