
import React,{ useState } from 'react';
import io from 'socket.io-client';

const Role = (props) => {

  const { users,setUsers,roomId,userName,userId } = props;

  const [roleButtons, setRoleButtons] = useState();
  

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
// 角色按鈕生成
const generateRoleButton = () => { 

  // 依照參與人數，生成好人壞人列表，並隨機亂序
  const newList = scenarios.map((scenario) => (
    users.length === scenario.total?
    generateList(scenario.total, scenario.badCount, scenario.goodCount):null
  )).filter(item => item !== null)[0];
  const shuffleList = newList.slice().sort(() => Math.random() - 0.5);
  console.log(shuffleList)

  // 依照亂序列表生成好人壞人的按鈕
  const roleButtons = shuffleList.map((role,index) => (
    <button key={index} onClick={role === 'good'? good:bad}>
      {role}
    </button>
  ));
  setRoleButtons(roleButtons)
 }


  return (
   <>
    <button onClick={good}>good</button>
    <button onClick={bad}>bad</button>
    <button onClick={message}>message</button>

    <br/><br/>

    <button onClick={generateRoleButton}>generateRoleButton</button>

    <div>
      {roleButtons ? roleButtons:[]}
    </div>

    <br/><br/>

    

   </>
  )
}

export default Role