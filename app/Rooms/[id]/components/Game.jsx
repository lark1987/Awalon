import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import { doc, updateDoc } from "firebase/firestore";

const Game = (props) => {

  const {
    users,setUsers,roomId,userName,userId,
    leaderList, setLeaderList,
    leaderName, setLeaderName,
    
    userReady,setUserReady,
    selectedList, setSelectedList,
    missionResult, setMissionResult,
    voteFinalResult, setVoteFinalResult,
    
    showLeader,setShowLeader,
    showVote,setShowVote,
    showMission, setShowMission,

    scoreRecord , setScoreRecord,
    voteFailedRecord , setVoteFailedRecord ,
    gameOver,setGameOver,

  } = props;


  const [missionKeyCount, setMissionKeyCount] = useState();
  const [hideClick1,setHideClick1] = useState(true);

  // 產生隊長清單
  const chooseLeader = () => { 
    const shuffleList = userReady.slice().sort(() => Math.random() - 0.5);
    const socket = io(`http://localhost:4000/${roomId}`);
    socket.emit('leaderList',shuffleList);
    return () => {socket.disconnect(); };
   }

  // 任務結果
  const handleMissionResult = (obj) => { 
  const keyCount = Object.keys(obj).length;
  if (Object.values(obj).includes("失敗")){
    setMissionKeyCount(keyCount)
    setMissionResult('失敗')
  }
  else{ 
    setMissionKeyCount(keyCount)
    setMissionResult('成功')
  }
  }

  // 投票成功 > 任務結束 > 開啟下局
  const goNextGame = () => { 

    const leaderIndex = leaderList.indexOf(leaderName);
    const nextIndex = (leaderIndex + 1) % leaderList.length;
    const newleaderName = leaderList[nextIndex];

    const socket = io(`http://localhost:4000/${roomId}`);
    socket.emit('goNextGame',);
    socket.emit('leaderAction',newleaderName);
    return () => {socket.disconnect(); };
   }

  // 開啟下局前的全員同步清除工作
  const handleGoNextGame = () => { 
    setSelectedList('')
    setMissionResult('')
    setVoteFinalResult('')
    setHideClick1(false)
    setShowVote(false)
   }

  // 遊戲結束，清理畫面
  const handleGameOver = () => { 
    setLeaderList('')
    setShowLeader(false)
   }

  // 遊戲結束判斷，
  const judgeGameResult = () => { 

    const socket = io(`http://localhost:4000/${roomId}`);
    let successCount = 0;
    let failureCount = 0;
    scoreRecord.forEach(item => {
      if (item === '成功') {
        successCount++;}
      if (item === '失敗') {
        failureCount++;}
    });
    if (successCount === 3) {
      socket.emit('goGameOver','遊戲結束，好人陣營勝利，刺客啟動暗殺行動')
      socket.emit('goAssassin');
      return () => {socket.disconnect(); };
    }
    if (failureCount === 3 ) {
      socket.emit('goGameOver','遊戲結束，壞人陣營勝利')
      return () => {socket.disconnect(); };
    }
    return () => {socket.disconnect(); };
  }


  // 頁面加載監聽區
  const onLoad = () => { 
    const socket = io(`http://localhost:4000/${roomId}`);
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
    socket.on('getMissonResult', (obj) => {
      handleMissionResult(obj)
      return () => {socket.disconnect(); };
    });
    socket.on('goNextGame', () => {
      handleGoNextGame()
      return () => {socket.disconnect(); };
    });
    socket.on('goGameOver', (msg) => {
      setGameOver(msg)
      handleGameOver()
      return () => {socket.disconnect(); };
    });

    return () => {socket.disconnect(); };
  }
  
  useEffect(() => onLoad(), []);

  useEffect(() => {
    setScoreRecord((prev) => [...prev,missionResult]);
    judgeGameResult()
  }, [missionResult]);

  useEffect(() => {
    if(voteFinalResult == '反對'){
      setVoteFailedRecord((prev) => [...prev,'X']);
      }
  }, [voteFinalResult]);




 











  return (
   <>

   {hideClick1 && userReady && userReady.length !== users.length &&(
   <span>
    <span>請稍候，其他玩家確認中</span><br/><br/>
    {userReady.map((data, index) => (
      <span key={index}> 　{data} OK </span>))}
    </span>)}

    {userReady && userReady.length === users.length && !leaderList && (
      <div>
      <br/><button onClick={chooseLeader}>確認隊長</button><br/><br/>
      身份確認完成，點選按鈕確認此局隊長。
      </div>
    )}

    {leaderList && !showLeader &&
    (<div>隊長順序：
      {leaderList.map((item, index) => (
        <span key={index}> {item}、</span>
      ))}
    </div>)
    }

    {selectedList?
    (<div><br/>
    <div className='background-blue'>出任務人員：
      {selectedList.map((item, index) => (
        <span key={index}> {item}、</span>
      ))}
      </div>
    </div>)
    :[]}


    {
    missionResult && missionKeyCount == selectedList.length &&
    (<div>
      <br/><br/><span>任務結果：{missionResult}</span>
      <br/><br/><br/><button onClick={goNextGame}>繼續遊戲</button>
     </div>)
    }
    
   </>
    
  )
}

export default Game