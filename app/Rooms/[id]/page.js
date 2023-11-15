"use client"

import React,{ useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import io from 'socket.io-client';

import OnlineUsers from './components/OnlineUsers'
import ScoreBoard from './components/ScoreBoard'

import Role from './components/Role'
import Game from './components/Game'
import Leader from './components/game/Leader'
import Vote from './components/game/Vote'
import Mission from './components/game/Mission'
import Assassin from './components/game/Assassin'

import '../../page.css'

const RoomIdPage = () => {

  const [users, setUsers] = useState();
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

  const roomId = sessionStorage.getItem('roomId')
  const userName = sessionStorage.getItem('userName')
  const userId = sessionStorage.getItem('userId')


   const commonProps = {
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
    showAssassin, setShowAssassin,

    scoreRecord , setScoreRecord,
    voteFailedRecord , setVoteFailedRecord ,
    gameOver,setGameOver,
  }

  const router = useRouter();

  const goHome = () => {
    window.location.href = "/";
    // router.push('/');
   }


  return (
    <>
    <div className='container'>
      
    <div className='logo' onClick={goHome}>
    <img src='/logo.png' alt="AWALON" />
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

export default RoomIdPage

    // 暫停處理：遊戲開始後，房間禁止進入 (未完成)
    // const roomNoEntry = async() => { 
    //   const roomDocRef = doc(db, "Awalon-room",roomId);
    //   await updateDoc(roomDocRef, {
    //     gameStart: true
    //   });
    // }
  
    // 暫停處理：計分版
    // const scoreRecord = (data) => { 
    //   setGameRecord((prev) => [...prev,data]);
    //  }

    // 暫停處理：得到壞人列表 
    // const getBadPeopleList = () => { 
    //   const socketRoom = io(`http://localhost:4000/${roomId}`);
    //   socketRoom.emit('getBadPeopleList')
    //   return () => {socketRoom.disconnect(); };
    //  }