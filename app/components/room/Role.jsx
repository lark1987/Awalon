
import { useState,useEffect } from 'react';
import io from 'socket.io-client';

const Role = (props) => {

  const { users,roomId,userName,userId,
    setUserNumber,userReady,setUserReady,
    setShowAssassin, 
  } = props;

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
// 遊戲開始按鈕：關房、抽角
const gameStart = () => { 
  getRoleButton()
  const socketRoom = io(`http://localhost:4000/${roomId}`);
  const userNumber = users.length
  socketRoom.emit('userNumber',userNumber);
  return () => {socketRoom.disconnect(); };
}


// 點選好人牌：加入好人room、刷新角色按鈕列表
const good = () => { 

const socket = io(`http://localhost:4000/${roomId}`);
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
// 點選壞人牌：加入壞人room、刷新角色按鈕列表
const bad = () => { 
const socket = io(`http://localhost:4000/${roomId}`);
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
//  點選梅林牌：加入梅林 oom、刷新角色按鈕列表
const merlin = () => { 
const socket = io(`http://localhost:4000/${roomId}`);
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
const assassin = () => { 
const socket = io(`http://localhost:4000/${roomId}`);
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
  const socket = io(`http://localhost:4000/${roomId}`);
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
  const socketRoom = io(`http://localhost:4000/${roomId}`);
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

// 頁面刷新提醒
useEffect(() => {
  const handleBeforeUnload = (event) => {
    const message = '您確定要離開嗎？';
    event.returnValue = message; 
    return message; 
  };
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);



  return (
   <>
    <div>
      
      {hideClick1 ?
      (<div>
      <br/>
      <button className ='btn-yellow ' onClick={gameStart}>START</button><br/><br/>
      <div className='mini-text-grey'>人員到齊後，即可開始遊戲</div>
      </div>)
      :[]}

      
      {hideClick2 && shuffleList ?
      ( <span>
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
        </span>
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

    </div>    
   </>
  )
}

export default Role