
import React,{ useState,useEffect } from 'react';
import io from 'socket.io-client';


const Game = (props) => {

  const { users,setUsers,roomId,userName,userId } = props;

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // 進度在這裡 ~ 提供名單給後端，請後端給被選擇的人回應。
  const handleSubmit = () => {

    console.log(selectedItems);

    const socket = io(`http://localhost:4000/${roomId}`);
    socket.emit('getFightButton',selectedItems);
    socket.on('fightButton', (msg) => { 
      console.log(msg)
    })
  };




 
  return (
    <>
    <div>Game</div>
    <br/>
    <div>
        {users?
        users.map((item, index) => (
          <span key={index}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item}　
          </span>
        ))
        :[]}
      <br/>
      <br/>
      <button onClick={handleSubmit}>選擇出征隊友</button>
    </div>


    <br/>
    <br/>

   </>
  )
}

export default Game