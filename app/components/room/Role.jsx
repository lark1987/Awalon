
import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const Role = (props) => {

  const { users,roomId,userName,userId,gameOver,
    setUserNumber,userReady,setUserReady,
    setShowAssassin, roleScenarios,
    groupMessage, setGroupMessage,
  } = props;

  const [systemMessage, setSystemMessage] = useState();
  const [shuffleList, setShuffleList] = useState();
  // const [groupMessage, setGroupMessage] = useState();
  const [hideClick1,setHideClick1] = useState(true);
  const [hideClick2,setHideClick2] = useState(true);


// 好人壞人列表生成
const generateList = (total, badCount, goodCount) =>{
  const listItems = [];
  listItems.push('merlin');
  if(total > 1){
    listItems.push('assassin');
  }
  for (let i = 2; i < total; i++) {
    if (i <= badCount) {
      listItems.push('bad');
    } else {
      listItems.push('good');
    }
  }
  return listItems;
}
// 依照參與人數，生成好人壞人列表，並隨機亂序
const generateShuffleList = () => { 
  const newList = roleScenarios.map((scenario) => (
    users.length === scenario.total?
    generateList(scenario.total, scenario.badCount, scenario.goodCount):null)
    ).filter(item => item !== null)[0];
  const shuffleList = newList.slice().sort(() => Math.random() - 0.5);
  return shuffleList
 }
// 創造角色按鈕：提供列表給 socket，同步生成
 const getRoleButton = () => { 
  const newList = generateShuffleList()
  const socketRoom = io(`${socketUrl}${roomId}`);
  socketRoom.emit('getRoleButton',newList);
  return () => {socketRoom.disconnect(); };
}
// 遊戲開始按鈕：關房、抽角
const gameStart = () => { 
  if(users.length < 2) {
    setSystemMessage('玩家人數需至少為兩名')
    return
  }
  
  getRoleButton()
  const socketRoom = io(`${socketUrl}${roomId}`);
  const userNumber = users.length
  socketRoom.emit('userNumber',userNumber);
  return () => {socketRoom.disconnect(); };
}


// 好人牌
const good = () => { 

const socket = io(`${socketUrl}${roomId}`);
socket.emit('joinGood',userName);
socket.on('groupMessage', (msg) => { 
  setGroupMessage(msg)
  return () => {socket.disconnect(); };
})

let index = shuffleList.indexOf('good');
const newList = shuffleList.slice(0, index).concat(shuffleList.slice(index + 1));
socket.emit('getRoleButton',newList);

setHideClick2(false)

return () => {socket.disconnect(); };
}
// 壞人牌
const bad = () => { 
const socket = io(`${socketUrl}${roomId}`);
socket.emit('joinBad',userName);
socket.on('groupMessage', (msg) => { 
  setGroupMessage(msg)
  return () => {socket.disconnect(); };
})
socket.on('badPeopleList',(msg) => { 
  console.log(msg)
  return () => {socket.disconnect(); };
  })

let index = shuffleList.indexOf('bad');
const newList = shuffleList.slice(0, index).concat(shuffleList.slice(index + 1));
socket.emit('getRoleButton',newList);

setHideClick2(false)

return () => {socket.disconnect(); };
}
// 梅林牌
const merlin = () => { 
const socket = io(`${socketUrl}${roomId}`);
socket.emit('joinMerlin',userName);
socket.on('groupMessage', (msg) => { 
  setGroupMessage(msg)
  return () => {socket.disconnect(); };
})
socket.on('badPeopleList',(msg) => { 
  console.log(msg)
  return () => {socket.disconnect(); };
  })

let index = shuffleList.indexOf('merlin');
const newList = shuffleList.slice(0, index).concat(shuffleList.slice(index + 1));
socket.emit('getRoleButton',newList);

setHideClick2(false)

return () => {socket.disconnect(); };

}
// 刺客牌
const assassin = () => { 
const socket = io(`${socketUrl}${roomId}`);
socket.emit('joinAssassin',userName);
socket.on('groupMessage', (msg) => { 
  setGroupMessage(msg)
  return () => {socket.disconnect(); };
})
socket.on('badPeopleList',(msg) => { 
  console.log(msg)
  return () => {socket.disconnect(); };
})
socket.on('goAssassin',() => { 
  console.log('Assassin出任務囉！')
  setShowAssassin(true)
  return () => {socket.disconnect(); };
})

let index = shuffleList.indexOf('assassin');
const newList = shuffleList.slice(0, index).concat(shuffleList.slice(index + 1));
socket.emit('getRoleButton',newList);

setHideClick2(false)

return () => {socket.disconnect(); };

}

// 角色確認等候，跳轉至 Game 組件 
const toGame = () => { 
  const socket = io(`${socketUrl}${roomId}`);
  socket.emit('goGame',userId,userName,roomId);
  socket.on('goGame', (arr) => {

    let ready = arr.map(item => item.userName);
    setUserReady(ready)

      return () => {socket.disconnect(); };
  })
  return () => {socket.disconnect(); };
}

// 頁面掛載監聽
const getReady = () => { 
  const socketRoom = io(`${socketUrl}${roomId}`);
  socketRoom.on('roleButton', (newList) => { 
    setShuffleList(newList)
    setHideClick1(false)
    return () => {socketRoom.disconnect(); };
  })
  socketRoom.on('userNumber', (userNumber) => { 
    setUserNumber(userNumber)
    return () => {socketRoom.disconnect(); };
  })
  return () => {socketRoom.disconnect(); };
}

useEffect(() => getReady(), []);





  return (
   <>
   {
    !gameOver && (
      <>
      {hideClick1 ?
      (<div>
      <br/><br/>
      <button className ='btn-yellow ' onClick={gameStart}>START</button><br/><br/>
      <div className='mini-text-grey'>人員到齊後，即可開始遊戲</div><br/>
      <div style={{color:'blue'}}><b>{systemMessage}</b></div>
      </div>)
      :[]}
      
      {hideClick2 && shuffleList ?
      ( <>
        <div>
        <br/>請抽選您的角色牌<br/><br/>
        {shuffleList.map((role,index) => (
        <span key={index} 
        className='card'
        onClick={
          role === 'merlin' ? merlin : (
          role === 'assassin' ? assassin : (
          role === 'good' ? good : bad))
        }>
        <img src='/card.png' alt="card" />　
        </span>
        ))}
        </div>
        <br/><br/>
        </>
      )
      :[]}

      {groupMessage && !userReady ? (
        <div>
          <br/><div className='card-role' >
          {groupMessage.includes("梅林")?(<img src='/role/merlin.jpg' alt="card" />): 
          (groupMessage.includes("刺客")?(<img src='/role/assassin.jpg' alt="card" />):
          (groupMessage.includes("好人")?(<img src='/role/goodPerson.jpg' alt="card" />):
          (groupMessage.includes("壞人")?(<img src='/role/badPerson.jpg' alt="card" />):([]))))
          }</div>

          <br/><b>{groupMessage}</b><br/><br/>
          <button onClick={toGame}>確認陣營，繼續遊戲</button>
        </div>
      ) : []}
      </>
    )
   }

   
   </>
  )
}

export default Role