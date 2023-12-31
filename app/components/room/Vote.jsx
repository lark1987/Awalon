import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const Vote = (props) => {

 const {
  users,roomId,userName,userId,leaderName,leaderList,
  selectedList,missionResult,voteFailedRecord,
  showVote,
  voteFinalResult, setVoteFinalResult,gameOver
} = props;

 const [voteResult, setVoteResult] = useState();
 const [isToggled, setIsToggled] = useState(false);


// 投票按鈕：發送答案到後端整合，紀錄投票結果
 const handleOnClick = (answer) => { 
  const socket = io(`${socketUrl}${roomId}`);
  socket.emit('getVote',userId,userName,answer,roomId);
  socket.on('getVote',(obj) => { 
    checkVoteResult(obj)
    return () => {socket.disconnect(); };
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
  const socket = io(`${socketUrl}${roomId}`);
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

// 投票結果下一步
 const handleNextOnclick = () => {

  // 投票同意：提供名單給後端，後端給發出任務給被選擇的人。
  if(voteFinalResult == '同意'){
    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('goMission',selectedList);
    return () => {socket.disconnect(); };
  }

  //投票反對：開啟下一局，紀錄反對次數 
  if(voteFinalResult == '反對'){
    const socket = io(`${socketUrl}${roomId}`);

    if(voteFailedRecord.length > 4){
      socket.emit('goGameOver','遊戲結束，壞人陣營勝利',)
      return () => {socket.disconnect(); };
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
  const socket = io(`${socketUrl}${roomId}`);
  socket.on('getVoteResult',(obj) => { 
    handleVoteFinalResult(obj)
    return () => {socket.disconnect(); };
   });
  return () => {socket.disconnect(); };
}

useEffect(() => onload(), []);

const showVoteDetail = () => { 
  setIsToggled(!isToggled);
 }



  return (
    <>

    { showVote && !voteResult &&
      (<div>
        <br/>是否同意上述人員出任務？<br/><br/>
      <span className='vote-click' onClick={()=>handleOnClick('同意')}><img src='/yes.png' alt="yes" /></span>　
      <span className='vote-click' onClick={()=>handleOnClick('反對')}><img src='/no.png' alt="no" /></span>
      </div>)
    }

    {
      voteResult && voteResult.length !== users.length &&
      (<div><br/><b style={{color:'red'}}>其他玩家投票中．．．</b><br/><br/>
        {voteResult.map((data,index) => (
          <span key={index}>✅{data.userName}　</span>
        ))}
      </div>)
    }

    {
    voteResult && voteResult.length === users.length && !voteFinalResult &&
     (<div><br/>投票結束，請確認投票結果<br/><br/>
      <button onClick={handleResultOnclick}>投票結果</button>
      </div>)
    }

    
    {
     voteFinalResult && !missionResult && !gameOver &&
      (
        <>
        <div>
        <br/>
        {voteFinalResult.includes("同意")?
        (<img src='/agree.png' alt="yes" style={{width:'150px'}}/>):
        (<img src='/reject.png' alt="no" style={{width:'150px'}}/>)
        }

        


        <br/><br/>
        <span className='vote-info' onClick={showVoteDetail}>
        <img src='/icon-info.png' alt="info" />
        <b style={{color:'red'}}>投票結果：{voteFinalResult}</b>
        </span><br/><br/>  

        {isToggled &&
        ( <div className='voteResult'>
          { voteResult.map((data,index) => (
          <div key={index} >{data.userName}：{data.answer}</div>
          )) }
          </div>
        )
        }

        <br/>
        <button onClick={handleNextOnclick}>繼續遊戲</button>
        </div>


        </>
      )
    }


    <br/>

   </>
  )
}

export default Vote