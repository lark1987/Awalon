
import React,{ useState,useEffect } from 'react';
import io from 'socket.io-client';

const Role = (props) => {

  const { users,setUsers,roomId,userName,userId } = props;

  const [shuffleList, setShuffleList] = useState();
  

 const good = (index) => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('joinGood');
  socket.on('groupMessage', (msg) => { 
    console.log(msg)
  })
  return () => {socket.disconnect(); };
 }
 const bad = (index) => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('joinBad');
  socket.on('groupMessage', (msg) => { 
    console.log(msg)
  })
  return () => {socket.disconnect(); };
 }
 const message = () => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('checkGroup');
  return () => {socket.disconnect(); };
 }


// 好人壞人人數配置
const scenarios = [
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
// 好人壞人列表生成
const generateList = (total, badCount, goodCount) =>{
  const listItems = [];
  for (let i = 0; i < total; i++) {
    if (i < badCount) {
      listItems.push('bad');
    } else {
      listItems.push('good');
    }
  }
  return listItems;
}
// 依照參與人數，生成好人壞人列表，並隨機亂序
const generateShuffleList = () => { 
  const newList = scenarios.map((scenario) => (
    users.length === scenario.total?
    generateList(scenario.total, scenario.badCount, scenario.goodCount):null)
    ).filter(item => item !== null)[0];
  const shuffleList = newList.slice().sort(() => Math.random() - 0.5);
  return shuffleList
 }

// 創造角色按鈕 - 啟動
 const getRoleButton = () => { 
  const newList = generateShuffleList()
  const socketRoom = io(`http://localhost:4000/${roomId}`);
  socketRoom.emit('getGameStart',newList);
  return () => {socketRoom.disconnect(); };
}

// 創造角色按鈕 - 同步
const getReady = () => { 
  const socketRoom = io(`http://localhost:4000/${roomId}`);
  socketRoom.on('gameStart', (newList) => { 
    setShuffleList(newList)
    console.log(newList)    
  })
  return () => {socketRoom.disconnect(); };
}


useEffect(() => getReady(), []);


  return (
   <>
    <br/><br/>
    <button onClick={getRoleButton}>getRoleButton</button>
    <br/><br/>
    <div>
      {
      shuffleList ?
      (shuffleList.map((role,index) => (
        <button key={index} onClick={role === 'good'? good:bad}>
        {role}
        </button>
      )))
      :[]
      }
    </div>
    <br/>
    <button onClick={message}>message</button>






    <br/><br/>

    

   </>
  )
}

export default Role