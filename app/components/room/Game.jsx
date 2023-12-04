import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';
import GameRule from './GameRule'

const Game = (props) => {

  const {
    users,setUsers,roomId,userName,userId,
    leaderList, setLeaderList,
    leaderName, setLeaderName,
    
    userReady,setUserReady,
    selectedList, setSelectedList,
    missionResult, setMissionResult,
    voteFinalResult, setVoteFinalResult,
    
    showGame, setShowGame,
    showRule, setShowRule,
    showLeader,setShowLeader,
    showVote,setShowVote,
    showMission, setShowMission,

    scoreRecord , setScoreRecord,
    voteFailedRecord , setVoteFailedRecord ,
    gameOver,setGameOver,

    roleScenarios,missionScenario,

  } = props;


  const [missionWait,setMissionWait] = useState(false);
  const [missionArr,setMissionArr] = useState();
  const [failCount,setFailCount] = useState();

  // 說明遊戲規則，提供隊長列表
  const goRule = () => { 
    const shuffleList = users.slice().sort(() => Math.random() - 0.5);
    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('leaderList',shuffleList);
    return () => {socket.disconnect(); };
   }
  
  const goLeader = () => { 
    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('leaderAction',leaderList[0]);
    return () => {socket.disconnect(); };
   }

  // 任務結果
  const handleMissionResult = () => { 
    const socket = io(`${socketUrl}${roomId}`);
    const failCount = missionArr.reduce((count, currentValue) => (currentValue.answer === "失敗" ? count + 1 : count), 0);
    
    // 測試版：兩位以上第一次任務要兩張失敗
    // if(users.length > 1 && scoreRecord.length == 0 && failCount < 2){
    //   socket.emit('getMissionFinalResult','成功',failCount);
    //   return () => {socket.disconnect(); };
    // }
    // 正式版：七位以上第四次任務要兩張失敗
    if(users.length > 6 && scoreRecord.length == 3 && failCount < 2){
      socket.emit('getMissionFinalResult','成功',failCount);
      return () => {socket.disconnect(); };
    }
    if (failCount > 0) { 
      socket.emit('getMissionFinalResult','失敗',failCount);
      return () => {socket.disconnect(); };
    }
    socket.emit('getMissionFinalResult','成功',failCount);
    return () => {socket.disconnect(); };


    

  }

  // 投票成功 > 任務結束 > 開啟下局
  const goNextGame = () => { 

    const leaderIndex = leaderList.indexOf(leaderName);
    const nextIndex = (leaderIndex + 1) % leaderList.length;
    const newleaderName = leaderList[nextIndex];

    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('goNextGame',);
    socket.emit('leaderAction',newleaderName);
    return () => {socket.disconnect(); };
   }

  // 開啟下局前的全員同步清除工作
  const handleGoNextGame = () => { 
    setSelectedList('')
    setShowVote(false)
    setVoteFinalResult('')
    setMissionArr('')
    setMissionResult('')
    setFailCount('')
   }

  // 遊戲結束判斷
  const judgeGameResult = () => { 

    const socket = io(`${socketUrl}${roomId}`);
    let successCount = 0;
    let failureCount = 0;
    scoreRecord.forEach(item => {
      if (item === '成功') {
        successCount++;}
      if (item === '失敗') {
        failureCount++;}
    });
    if (successCount > 2) {
      socket.emit('goGameOver','任務成功三次，刺客啟動暗殺行動！')
      socket.emit('goAssassin');
      return () => {socket.disconnect(); };
    }
    if (failureCount > 2 ) {
      socket.emit('goGameOver','遊戲結束，壞人陣營勝利！')
      return () => {socket.disconnect(); };
    }
    return () => {socket.disconnect(); };
  }




  // 頁面加載監聽區
  const onLoad = () => { 
    const socket = io(`${socketUrl}${roomId}`);
    socket.on('leaderList', (msg) => { 
      setLeaderList(msg)
      setShowRule(true)
      return () => {socket.disconnect(); };
    })
    socket.on('goLeaderWait', (leaderName) => { 
      setShowRule(false)
      setLeaderName(leaderName)
      return () => {socket.disconnect(); };
    })

    socket.on('missionRaise', (msg,leaderName) => { 
      setSelectedList(msg)
      setShowVote(true)
      return () => {socket.disconnect(); };
    })
    socket.on('goMissionWait', () => {
      setVoteFailedRecord('')
      setShowVote(false)
      setMissionWait(true)
      return () => {socket.disconnect(); };
    });
    socket.on('getMissionResult', (arr) => {
      setMissionArr(arr)
      return () => {socket.disconnect(); };
    });
    socket.on('getMissionFinalResult', (msg,failCount) => {
      setMissionResult(msg)
      setFailCount(failCount)
      return () => {socket.disconnect(); };
    });
    socket.on('goNextGame', () => {
      handleGoNextGame()
      return () => {socket.disconnect(); };
    });
    return () => {socket.disconnect(); };
  }
  
  useEffect(() => onLoad(), []);



  // 投票結果
  useEffect(() => {
    if(voteFinalResult == '反對'){
      setVoteFailedRecord((prev) => [...prev,'反對']);
      }
  }, [voteFinalResult]);

  // 任務結果
  useEffect(() => {
    if(!selectedList) return
    if(!missionArr) return
    if(missionArr.length == selectedList.length){
      setScoreRecord((prev) => [...prev,missionResult]);
      setMissionWait(false)
    }
  }, [missionResult]);

  // 勝敗判斷
  useEffect(() => {
    judgeGameResult()
  }, [scoreRecord]);





  return (
   <>

  {userReady && userReady.length !== users.length && !leaderList && (
  <span>
   <span>請稍候，其他玩家確認中</span><br/><br/>
   {userReady.map((data, index) => (
     <span key={index}> 　✅{data} </span>))}
   </span>)}

   {userReady && userReady.length === users.length && !leaderList && (
    <>
      <br/><br/>
      <div><img src='/closeEyes.png' alt="closeEyes" style={{width:'250px'}} /></div>
      <div className='mini-text-grey'>請一名玩家撥放下方指導語音，確認壞人身份！</div><br/>
      <audio controls src='/audio/closeEyes.mp3' />
      <br/><br/>
      <div className='mini-text-grey'>壞人陣營確認完畢，請點選下方按鈕繼續遊戲。</div><br/>
      <div><button onClick={goRule}>繼續遊戲</button></div><br/><br/> 
     </>
   )}

   {showRule && 
    (<>
    <GameRule/><br/> 
    <div><button onClick={goLeader}>了解規則，開始指派隊長</button></div><br/>
    </>)
   }

   {leaderList && !showRule &&
   (<b style={{color:'green'}}>隊長順序：
     {leaderList.map((item, index) => (
       <span key={index}>{item == leaderName? '🎯':''}{item}、</span>
     ))}
   </b>)
   }

   {leaderList && !showLeader && !selectedList && !showRule &&
   (<div>
     <br/><img src='/wait-1.png' alt="wait" style={{width:'150px'}} /><br/>
     <b style={{color:'red'}}>隊長選擇中．．．</b>
     </div>)
   }

   {selectedList && 
   (<div><br/>
   <div className='background-blue'>出任務人員：
     {selectedList.map((item, index) => (
       <span key={index}> {item}、</span>
     ))}
     </div>
   </div>)
   }

   {missionWait && !showMission && 
   (<div>
   <br/><img src='/goMission.png' alt="goMission" style={{width:'150px'}} /><br/><br/>
   <b style={{color:'red'}}>出任務中．．．</b>
   </div>)
   }

   {missionArr && missionArr.length == selectedList.length && !missionResult && 
   (<div><br/>任務結束，請確認任務結果<br/><br/>
   <button onClick={handleMissionResult}>任務結果</button>
   </div>)

   }


   {
   missionResult && 
   (<div>
     <br/>
     {missionResult.includes("成功")?
     (<img src='/mission-sucess.png' alt="sucess" style={{width:'200px'}} />):
     (<img src='/mission-fail.png' alt="fail" style={{width:'200px'}} />)
     }
     <br/><b style={{color:'red'}}>任務結果：{missionResult}</b>
     <br/><br/>

     <div style={{display:'flex',justifyContent:'space-evenly'}}>
      <div>
        <img src='/mission-sad.png' alt="sad" style={{width:'20px'}}/>
        <div>×{failCount}</div>
      </div>
      <div>
        <button onClick={goNextGame}>繼續遊戲</button>
      </div>
      <div>
        <img src='/mission-happy.png' alt="happy" style={{width:'20px'}}/>
        <div>×{selectedList.length - failCount}</div>
      </div>
      </div>
    </div>)
   }


   
   </>
    
  )
}

export default Game