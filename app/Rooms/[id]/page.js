"use client"

import { useState,useEffect } from 'react';
import {db} from '../../utils/firebase'
import {collection,onSnapshot } from 'firebase/firestore'

const RoomIdPage = () => {

  const [players, setPlayers] = useState()

  const getData=() => { 
    const pathName= window.location.pathname.split('/');
    const roomId = pathName[pathName.length - 1]; 
    const playersRef = collection(db, "Awalon-room", roomId, "players");
    onSnapshot(playersRef, (shot) => { 
      const newData = [];
      shot.forEach((doc) => {
      newData.push({
        id: doc.id,
        name: doc.data().player,
      })
      setPlayers(newData)
      });
    });
  }

  

  useEffect( ()=>{
    getData()
  }, [players])


  //     const playerId = sessionStorage.getItem('playerId')
  //     await deleteDoc(doc(db, "Awalon-room", roomId, "players",playerId));


  


  

  return (
    <>
    <div>RoomIdPage</div><br/><br/>
    { players?
      players.map( (player, index)=>(
      <div key={player.id}>玩家：{player.name}</div>))
      :
      <div>Loading...</div>
    }

    </>
  )
}

export default RoomIdPage

