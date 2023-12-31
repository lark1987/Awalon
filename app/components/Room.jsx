"use client"

import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation'

import Header from './room/Header'
import OnlineUsers from './room/OnlineUsers'
import GameOver from './room/GameOver'

import Role from './room/Role'
import Game from './room/Game'
import Leader from './room/Leader'
import Vote from './room/Vote'
import Mission from './room/Mission'
import Assassin from './room/Assassin'
import GameInfo from './room/GameInfo'

import '../page.css'

const Room = () => {

  const roomId = sessionStorage.getItem('roomId')
  const userName = sessionStorage.getItem('userName')
  const userId = sessionStorage.getItem('userId')

  const router = useRouter();
  if(!userId){
    router.push('/');
  }

  const [users, setUsers] = useState();
  const [userNumber, setUserNumber] = useState();
  const [userReady, setUserReady] = useState();
  const [groupMessage, setGroupMessage] = useState();

  const [leaderList, setLeaderList] = useState();
  const [leaderName, setLeaderName] = useState();

  const [selectedList, setSelectedList] = useState();
  const [missionResult, setMissionResult] = useState();
  const [voteFinalResult, setVoteFinalResult] = useState();

  const [showGame, setShowGame] = useState(true);
  const [showRule, setShowRule] = useState(false);
  const [showLeader, setShowLeader] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [showAssassin, setShowAssassin] = useState(false);

  const [scoreRecord , setScoreRecord ] = useState([]);
  const [voteFailedRecord , setVoteFailedRecord ] = useState([]);
  const [gameOver,setGameOver]= useState()

  const roleScenarios = [
    { total: 1, badCount: 0, goodCount: 1 },
    { total: 2, badCount: 1, goodCount: 1 },
    { total: 3, badCount: 1, goodCount: 2 },
    { total: 4, badCount: 1, goodCount: 3 },
    { total: 5, badCount: 2, goodCount: 3 },
    { total: 6, badCount: 2, goodCount: 4 },
    { total: 7, badCount: 3, goodCount: 4 },
    { total: 8, badCount: 3, goodCount: 5 },
    { total: 9, badCount: 3, goodCount: 6 },
    { total: 10, badCount: 4, goodCount: 6 },
  ];

  const missionScenario = {
    1: {1:1, 2:1, 3:1, 4:1, 5:1,},
    2: {1:2, 2:1, 3:1, 4:1, 5:1,},
    3: {1:3, 2:1, 3:1, 4:1, 5:1,},
    4: {1:4, 2:1, 3:1, 4:1, 5:1,},
    5: {1:2, 2:3, 3:2, 4:3, 5:3,},
    6: {1:2, 2:3, 3:4, 4:3, 5:4,},
    7: {1:2, 2:3, 3:3, 4:4, 5:4,},
    8: {1:3, 2:4, 3:4, 4:5, 5:5,},
    9: {1:3, 2:4, 3:4, 4:5, 5:5,},
    10: {1:3, 2:4, 3:4, 4:5, 5:5,},
  };

  const commonProps = {
    users,setUsers,roomId,userName,userId,
    userNumber, setUserNumber,
    leaderList, setLeaderList,
    leaderName, setLeaderName,
    groupMessage, setGroupMessage,
    
    userReady,setUserReady,
    selectedList, setSelectedList,
    missionResult, setMissionResult,
    voteFinalResult, setVoteFinalResult,

    showGame, setShowGame,
    showRule, setShowRule,
    showLeader,setShowLeader,
    showVote,setShowVote,
    showMission, setShowMission,
    showAssassin, setShowAssassin,

    scoreRecord , setScoreRecord,
    voteFailedRecord , setVoteFailedRecord ,
    gameOver,setGameOver,

    roleScenarios,missionScenario,
  };


  return (
    <>
      <div className='container' 
      style={{display: gameOver? 'none':'flex'}}
      >
        
      <Header {...commonProps} />
      <Role {...commonProps} />
      { showGame && (<Game {...commonProps} />)}
      { showLeader && (<Leader {...commonProps} />)}
      { showVote && (<Vote {...commonProps} />)}
      { showMission && (<Mission {...commonProps} />)}
      { leaderName && (<GameInfo {...commonProps}/>) }
      <OnlineUsers {...commonProps} />
      </div>

      <GameOver {...commonProps} />
      { showAssassin && (<Assassin {...commonProps} />)}

    </>
  )
}

export default Room


    // 暫停處理：得到壞人列表 
    // const getBadPeopleList = () => { 
    //   const socketRoom = io(`${socketUrl}${roomId}`);
    //   socketRoom.emit('getBadPeopleList')
    //   return () => {socketRoom.disconnect(); };
    //  }