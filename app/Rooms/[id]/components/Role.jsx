
import React,{ useState,useEffect } from 'react';
import io from 'socket.io-client';
import {db} from '../../../utils/firebase'
import {updateDoc,doc} from 'firebase/firestore'

const Role = (props) => {

  const { users,setUsers,roomId,userName,userId } = props;

  const [shuffleList, setShuffleList] = useState();
  const [groupMessage, setGroupMessage] = useState();
  const [hideClick1,setHideClick1] = useState(true);
  const [hideClick2,setHideClick2] = useState(true);

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

// 創造角色按鈕：提供列表給 socket，同步生成
 const getRoleButton = () => { 
  const newList = generateShuffleList()
  const socketRoom = io(`http://localhost:4000/${roomId}`);
  socketRoom.emit('getRoleButton',newList);
  return () => {socketRoom.disconnect(); };
}

// 點選好人牌：加入好人陣營、刷新角色按鈕列表
 const good = () => { 

  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('joinGood',userName);
  socket.on('groupMessage', (msg) => { 
    setGroupMessage(msg)
  })

  let index = shuffleList.indexOf('good');
  const newList = shuffleList.slice(0, index).concat(shuffleList.slice(index + 1));
  socket.emit('getRoleButton',newList);

  setHideClick2(false)

  return () => {socket.disconnect(); };
 }

// 點選壞人牌：加入好人陣營、刷新角色按鈕列表
 const bad = () => { 
  const socket = io(`http://localhost:4000/${roomId}`);
  socket.emit('joinBad');
  socket.on('groupMessage', (msg) => { 
    setGroupMessage(msg)
  })

  let index = shuffleList.indexOf('bad');
  const newList = shuffleList.slice(0, index).concat(shuffleList.slice(index + 1));
  socket.emit('getRoleButton',newList);

  setHideClick2(false)

  return () => {socket.disconnect(); };
 }

// 頁面加載監聽事件：點選角色按鈕後之同步更新
const getReady = () => { 
  const socketRoom = io(`http://localhost:4000/${roomId}`);
  socketRoom.on('roleButton', (newList) => { 
    setShuffleList(newList)
    setHideClick1(false)
  })
  return () => {socketRoom.disconnect(); };
}


useEffect(() => getReady(), []);




// 進度在這裡 ~~~

const test = () => { 
  const socketRoom = io(`http://localhost:4000/${roomId}`);
  socketRoom.emit('getBadPeopleList')
  return () => {socketRoom.disconnect(); };
 }











// 遊戲開始後，房間禁止進入
const roomNoEntry = async() => { 
  const roomDocRef = doc(db, "Awalon-room",roomId);
  await updateDoc(roomDocRef, {
    gameStart: true
  });
 }


  return (
   <>
    <br/><br/>
    <div>
      
      {hideClick1 ?
      <div>
      <h3>請等候玩家進場，即可開始遊戲</h3>
      <button onClick={getRoleButton}>開始遊戲</button>
      </div>
      :[]}

      {hideClick2 && shuffleList ?
      (shuffleList.map((role,index) => (
        <button key={index} 
        onClick={role === 'good'? good:bad}
        >
        {role}
        </button>
      )))
      :[]}

      <div>{groupMessage}</div>
      <br/>

      {groupMessage?
      <div><button>確認陣營，繼續遊戲</button></div>
      :[]}

    </div>    

    <div><button onClick={test}>TEST</button></div>
   </>
  )
}

export default Role