
import React,{ useState,useEffect } from 'react';
import io from 'socket.io-client';


const Leader = (props) => {

  const { users,roomId,showLeader } = props;

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
  };




 
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

        <button onClick={handleSubmit}>確認</button>

      </div>)
      }
    </div>


    <br/>
    <br/>

   </>
  )
}

export default Leader