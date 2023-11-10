import React,{ useState,useEffect } from 'react';
import io from 'socket.io-client';

const Assassin = (props) => {

 const { users,roomId } = props;

 const [selectedItem, setSelectedItem] = useState([]);

 const handleCheckboxChange = (item) => {
    setSelectedItem(item);
 };

  const assassinChoose = () => { 
    const socket = io(`http://localhost:4000/${roomId}`);
    socket.emit('assassinChoose',selectedItem);
    }

  return (
   <>
    <br/>
    <div>請選出哪一位是梅林</div>
    <br/>
    <div>
        {users?
        users.map((item, index) => (
          <span key={index}>
              <input
                type="radio"
                checked={selectedItem === item}
                onChange={() => handleCheckboxChange(item)}
              />
              {item}　
          </span>
        ))
        :[]}
      <br/><br/>
      <button onClick={assassinChoose}>確認</button>
    </div>
    <br/><br/>

   </>
  )
}

export default Assassin