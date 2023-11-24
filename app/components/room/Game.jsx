import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

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
    showLeader,setShowLeader,
    showVote,setShowVote,
    showMission, setShowMission,

    scoreRecord , setScoreRecord,
    voteFailedRecord , setVoteFailedRecord ,
    gameOver,setGameOver,

  } = props;


  const [missionWait,setMissionWait] = useState(false);
  const [missionArr,setMissionArr] = useState();

  // 產生隊長清單
  const chooseLeader = () => { 
    const shuffleList = userReady.slice().sort(() => Math.random() - 0.5);
    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('leaderList',shuffleList);
    return () => {socket.disconnect(); };
   }

  // 任務結果
  const handleMissionResult = () => { 
    const socket = io(`${socketUrl}${roomId}`);
    const failCount = missionArr.reduce((count, currentValue) => (currentValue.answer === "失敗" ? count + 1 : count), 0);

    // 正式版：七位以上第四次任務要兩張失敗
    // 測試版：兩位以上第一次任務要兩張失敗
    if(users.length > 1 && scoreRecord.length == 0 && failCount < 2){
      socket.emit('getMissionFinalResult','成功');
      return () => {socket.disconnect(); };
    }
    if (failCount > 0) { 
      socket.emit('getMissionFinalResult','失敗');
      return () => {socket.disconnect(); };
    }
    socket.emit('getMissionFinalResult','成功');
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
    setMissionArr('')
    setMissionResult('')
    setVoteFinalResult('')
    setShowVote(false)
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
      socket.emit('goGameOver','遊戲結束，好人陣營勝利！刺客啟動暗殺行動')
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
      return () => {socket.disconnect(); };
    })
    socket.on('missionRaise', (msg,leaderName) => { 
      setLeaderName(leaderName)
      setSelectedList(msg)
      setShowVote(true)
      return () => {socket.disconnect(); };
    })
    socket.on('goMissionWait', () => {
      setShowVote(false)
      setMissionWait(true)
      return () => {socket.disconnect(); };
    });
    socket.on('getMissionResult', (arr) => {
      setMissionArr(arr)
      return () => {socket.disconnect(); };
    });
    socket.on('getMissionFinalResult', (msg) => {
      setMissionResult(msg)
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
      setVoteFailedRecord('')
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
     <div>
      <br/><br/>
      <img src='/closeEyes.png' alt="closeEyes" style={{width:'250px'}} />
      <div className='mini-text-grey'>請一名玩家撥放下方指導語音，確認壞人身份！</div><br/>
      <audio controls src='/audio/closeEyes.mp3' />
      <br/><br/>
     </div>
   )}

   {userReady && userReady.length === users.length && !leaderList && (
     <div>
    <div className='mini-text-grey'>身份確認完畢，請點選下方按鈕指派隊長。</div><br/>
    <button onClick={chooseLeader}>指派隊長</button><br/><br/> 
     </div>
   )}

   {leaderList &&
   (<b style={{color:'green'}}>隊長順序：
     {leaderList.map((item, index) => (
       <span key={index}>{item}、</span>
     ))}
   </b>)
   }

   {leaderList && !showLeader && !selectedList &&
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

   {missionWait && missionArr && !showMission && missionArr.length !== selectedList.length &&
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
     <br/><br/><button onClick={goNextGame}>繼續遊戲</button><br/><br/><br/>
    </div>)
   }
   
   </>
    
  )
}

export default Game