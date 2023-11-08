import { useState,useEffect } from 'react';
import io from 'socket.io-client';

const Game = (props) => {

  const {
    users,roomId,userReady,
    setShowVote,
    selectedList, setSelectedList,
    missionResult, setMissionResult,
  } = props;

  const [leaderList, setLeaderList] = useState();
  const [missionKeyCount, setMissionKeyCount] = useState();

  const chooseLeader = () => { 
    const shuffleList = userReady.slice().sort(() => Math.random() - 0.5);
    const socket = io(`http://localhost:4000/${roomId}`);
    socket.emit('leaderList',shuffleList);
    return () => {socket.disconnect(); };
   }

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


  const onLoad = () => { 
    const socket = io(`http://localhost:4000/${roomId}`);
    socket.on('leaderList', (msg) => { 
      setLeaderList(msg)
      return () => {socket.disconnect(); };
    })
    socket.on('missionRaise', (msg) => { 
      setSelectedList(msg)
      setShowVote(true)
      return () => {socket.disconnect(); };
    })
    socket.on('getMissonResult', (obj) => {
      handleMissionResult(obj)
      return () => {socket.disconnect(); };
   });

    return () => {socket.disconnect(); };
  }
  


   useEffect(() => onLoad(), []);
 





  return (
   <>
   {userReady && userReady.length !== users.length &&(
   <span>
    <span>請稍候，其他玩家確認中</span>
    {userReady.map((data, index) => (
      <span key={index}> 　{data} OK </span>))}
    </span>)}

    {userReady && userReady.length === users.length && !leaderList && (
      <div>全部玩家完成身份確認，點擊下方按鈕，確認隊長順序<br/><br/>
      <button onClick={chooseLeader}>確認隊長順序</button>
      </div>
    )}

    {leaderList?
    <div>隊長順序：
      {leaderList.map((item, index) => (
        <span key={index}> {item}、</span>
      ))}
    </div>
    :[]
    }

    {selectedList?
    (<div><br/><br/>本局隊長選擇人員：
      {selectedList.map((item, index) => (
        <span key={index}> {item}、</span>
      ))}
    </div>)
    :[]}


    {
    missionResult && missionKeyCount == selectedList.length &&
    (<div>
      <br/><br/><span>任務結果：{missionResult}</span>
      <br/><br/><br/><button>繼續遊戲</button>
     </div>)
    }

    
   </>
    
  )
}

export default Game