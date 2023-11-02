"use client"

import React,{ useState } from 'react';
import OnlineUsers from './components/OnlineUsers'
import Role from './components/Role'

const RoomIdPage = () => {

  const [users, setUsers] = useState(false);

  const roomId = sessionStorage.getItem('roomId')
  const userName = sessionStorage.getItem('userName')
  const userId = sessionStorage.getItem('userId')

  const commonProps = {
    users,setUsers,roomId,userName,userId
  }

  return (
    <>
    <div>RoomIdPage</div><br/>
    <OnlineUsers {...commonProps} />
    <Role {...commonProps}/>

    </>
  )
}

export default RoomIdPage

