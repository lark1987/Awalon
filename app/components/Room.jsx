"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import io from 'socket.io-client';
import { socketUrl } from '../utils/socketUrl';

import OnlineUsers from './room/OnlineUsers'
import ScoreBoard from './room/ScoreBoard'

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

  const [users, setUsers] = useState();
  const [userNumber, setUserNumber] = useState();
  const [userReady, setUserReady] = useState();

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
    2: {1:2, 2:2, 3:1, 4:1, 5:1,},
    3: {1:1, 2:1, 3:1, 4:1, 5:1,},
    4: {1:1, 2:1, 3:1, 4:1, 5:1,},
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
  }

  const router = useRouter();
  const goHome = () => {
    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('roomOpen')
    router.push('/');
    // window.location.href = "/";
    return () => {socket.disconnect(); };
   }


  return (
    <>

    <div className='container'>

    <div className='room-logo' onClick={goHome}>
    <img src='/logo.png' alt="logo" />
    </div>

    <div onClick={goHome} className='leave-btn'>
    <img src='/leave.png' alt="exit"/>
    </div>

    <hr/>

    
    { !gameOver && (<Role {...commonProps} />)}
    { !gameOver && showGame && (<Game {...commonProps} />)}
    { !gameOver && showLeader && (<Leader {...commonProps} />)}
    { !gameOver && showVote && (<Vote {...commonProps} />)}
    { !gameOver && showMission && (<Mission {...commonProps} />)}
    { showAssassin && (<Assassin {...commonProps} />)}
    <ScoreBoard {...commonProps} />
    { leaderName && (<GameInfo {...commonProps}/>) }
    <OnlineUsers {...commonProps} />
    
  

    
    </div>
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