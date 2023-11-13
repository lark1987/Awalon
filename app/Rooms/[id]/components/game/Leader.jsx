
import React,{ useState,useEffect } from 'react';
import io from 'socket.io-client';
import '../../../../page.css'


const Leader = (props) => {

  const { users,userName,roomId,showLeader,setShowLeader } = props;

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const missionRaise = () => { 
    const socket = io(`http://localhost:4000/${roomId}`);
    socket.emit('missionRaise',selectedItems,userName);
    setShowLeader(false)

    return () => {socket.disconnect(); };
   }

 
  return (
    <>
      {users && showLeader &&
      (<div>
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
      </div>)
      }
   </>
  )
}

export default Leader