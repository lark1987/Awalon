"use client"

import React,{ useState } from 'react';
import io from 'socket.io-client';

import OnlineUsers from './components/OnlineUsers'
import Role from './components/Role'
import Game from './components/Game'
import Leader from './components/game/Leader'
import Vote from './components/game/Vote'
import Mission from './components/game/Mission'

const RoomIdPage = () => {

  const [users, setUsers] = useState();
  const [userReady, setUserReady] = useState();
  const [leaderList, setLeaderList] = useState();
  const [leaderName, setLeaderName] = useState();
  const [selectedList, setSelectedList] = useState();
  const [missionResult, setMissionResult] = useState();

  const [showLeader, setShowLeader] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [showMission, setShowMission] = useState(false);

  const [scoreRecord , setScoreRecord ] = useState([]);
  const [voteRecord , setVoteRecord ] = useState();
  const [leaderRecord , setLeaderRecord ] = useState(0);

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
    
    showLeader,setShowLeader,
    showVote,setShowVote,
    showMission, setShowMission,

    scoreRecord , setScoreRecord,
  }



  return (
    <>
    <div>RoomIdPage</div><br/>

    <OnlineUsers {...commonProps} /><br/><br/>
    <Role {...commonProps} />
    <Game {...commonProps} />
    <Leader {...commonProps} />
    { showVote && (<Vote {...commonProps} />)}
    <Mission {...commonProps} />
  
    

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