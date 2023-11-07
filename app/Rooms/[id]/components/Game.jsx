import { useState,useEffect } from 'react';

const Game = (props) => {

  const {users,userReady } = props;



 





  return (
   <>
   {userReady?
    (<div>
      <span>玩家確認身份中請稍候，已完成：</span>
      {userReady.map((data, index) => (
        <span key={index}> 　{data}</span>
      ))}
    </div>)
    :[]
    }
   </>
    
  )
}

export default Game