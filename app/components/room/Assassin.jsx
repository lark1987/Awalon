import { useState } from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const Assassin = (props) => {

 const { users,roomId,setShowAssassin } = props;

 const [selectedItem, setSelectedItem] = useState([]);

 const handleCheckboxChange = (item) => {
    setSelectedItem(item);
 };

  const assassinChoose = () => { 
    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('assassinChoose',selectedItem);
    setShowAssassin(false)
    return () => {socket.disconnect(); };
    }

  return (
   <>
    <br/>
    <div className='background-blue'>請選出哪一位是梅林</div>
    <div><br/>
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
   </>
  )
}

export default Assassin