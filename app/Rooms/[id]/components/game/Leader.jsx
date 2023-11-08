
import React,{ useState,useEffect } from 'react';
import io from 'socket.io-client';


const Leader = (props) => {

  const { users,roomId,showLeader,setShowLeader } = props;

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
    socket.emit('missionRaise',selectedItems);
    setShowLeader(false)

    return () => {socket.disconnect(); };
   }

 
  return (
    <>
    <br/>
    <br/>
    <div>
      {users && showLeader &&
      (<div>
        <div>Leader：請選擇和您一起出任務的人員</div><br/>

        {users.map((item, index) => (
        <span key={index}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />
            {item}　
        </span>))}

        <button onClick={missionRaise}>確認</button>

      </div>)
      }
    </div>
   </>
  )
}

export default Leader