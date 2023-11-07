import React,{ useState,useEffect } from 'react';
import io from 'socket.io-client';

const Assassin = (props) => {

 const { users,setUsers,roomId,userName,userId } = props;

 const [selectedItems, setSelectedItems] = useState([]);

 const handleCheckboxChange = (item) => {
   if (selectedItems.includes(item)) {
     setSelectedItems(selectedItems.filter((i) => i !== item));
   } else {
     setSelectedItems([...selectedItems, item]);
   }
 };

  return (
   <>
    <div>Assassin</div>
    <br/>
    <div>請勾選哪一位是梅林</div>
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
      <br/><br/>
      <button>確認</button>
    </div>
    <br/><br/>

   </>
  )
}

export default Assassin