import { useState } from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const Assassin = (props) => {

 const { users,roomId,setShowAssassin,gameOver } = props;

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
    {gameOver.includes("離線")?[]:
    (
      <>
      <div className='assassin-box'>
        請選出哪一位是梅林
        <br/><br/>
        <div style={{display:'flex',justifyContent:'center',gap:'10px'}}>
            {users?
            users.map((item, index) => (
              <div key={index} >
                  <label for={item} style={{cursor: 'pointer',}}>
                  <div>{item}</div>
                  <div><img src='/assassin-human.png' alt="human" style={{width:'30px'}} /></div>
                  </label>
                  <input
                    type="radio"
                    checked={selectedItem === item}
                    onChange={() => handleCheckboxChange(item)}
                    id={item}
                  />
              </div>
            ))
            :[]}
        </div>
        <br/>

        <div className='assassin-swordBox' onClick={assassinChoose}>
        <img src='/assassin-sword.png' alt="sword" style={{width:'40px'}}/>
        <br/><span>刺殺</span>
        </div>

      </div><br/><br/>
      </>
    )}
   </>
  )
}

export default Assassin