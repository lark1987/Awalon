
import { useState } from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';


const Leader = (props) => {

  const { users,userName,roomId,scoreRecord,setShowLeader } = props;

  const [selectedItems, setSelectedItems] = useState([]);
  const [systemMessage, setSystemMessage] = useState([]);

  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // 出任務人數配置
  const scenarioMap = {
    1: {1:1, 2:1, 3:1, 4:1, 5:1,},
    2: {1:2, 2:1, 3:1, 4:1, 5:1,},
    3: {1:1, 2:1, 3:1, 4:1, 5:1,},
    4: {1:1, 2:1, 3:1, 4:1, 5:1,},
    5: {1:2, 2:3, 3:2, 4:3, 5:3,},
    6: {1:2, 2:3, 3:4, 4:3, 5:4,},
    7: {1:2, 2:3, 3:3, 4:4, 5:4,},
    8: {1:3, 2:4, 3:4, 4:5, 5:5,},
    9: {1:3, 2:4, 3:4, 4:5, 5:5,},
    10: {1:3, 2:4, 3:4, 4:5, 5:5,},
  };
  // 當局人數確認  
  const selectCheck = (user, game)=> {
    const userMap = scenarioMap[user];
    return userMap[game];
}
  // 選擇隊員，發起投票 
  const missionRaise = () => { 

    const selectNumber = selectCheck(users.length,scoreRecord.length+1)
    if (selectedItems.length !== selectNumber){
      setSystemMessage(`請選擇${selectNumber}名隊員`)
      return
    }
    
    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('missionRaise',selectedItems,userName);
    setShowLeader(false)

    return () => {socket.disconnect(); };
   }

 
  return (
    <>

      <div>
        <br/>
        <img src='/leader.png' alt="leader" style={{width:'50px'}}/><br/><br/>
        <div className='background-red'>您是本局隊長，請選擇要出任務的人員</div><br/>
        <div style={{display:'inline-flex'}}>
        {users.map((item, index) => (
        <label key={index}>
          <span>{item}</span><br/>
          <img src={`/member/member-${index+1}.jpg`} alt="member" style={{width:'40px'}}/><br/>
          <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            /><br/>
        </label>))}
        </div>

        <br/><br/><button onClick={missionRaise} style={{'backgroundColor':'#cbd5f1'}}>提請投票</button><br/><br/>
        {systemMessage?
        (<div><b style={{color:'red'}}>{systemMessage}</b></div>)
        :[]}
      </div>

      
   </>
  )
}

export default Leader