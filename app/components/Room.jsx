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
  const [showLeader, setShowLeader] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [showAssassin, setShowAssassin] = useState(false);

  const [scoreRecord , setScoreRecord ] = useState([]);
  const [voteFailedRecord , setVoteFailedRecord ] = useState([]);
  const [gameOver,setGameOver]= useState()


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
    showLeader,setShowLeader,
    showVote,setShowVote,
    showMission, setShowMission,
    showAssassin, setShowAssassin,

    scoreRecord , setScoreRecord,
    voteFailedRecord , setVoteFailedRecord ,
    gameOver,setGameOver,
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