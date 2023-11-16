import { useEffect } from 'react';
import io from 'socket.io-client';

const ScoreBoard = (props) => {

  const {roomId,scoreRecord,voteFailedRecord,gameOver,setGameOver,setUserNumber } = props;

  const goRoom = () => { 
    window.location.href = `/rooms/${roomId}`
   }

  // 處理 gameOver 訊息 
  const onLoad = () => { 
    const socket = io(`http://localhost:4000/${roomId}`);
    socket.on('goGameOver', (msg) => {
      setGameOver(msg)
      return () => {socket.disconnect(); };
    });
  }

  useEffect(() => onLoad(), []);

  return (
   <>
    {!gameOver ? 
    (scoreRecord.includes("成功") || scoreRecord.includes("失敗") ?
      (<div><br/><br/>任務紀錄：
      {scoreRecord.map((item, index) => (
      <span key={index}>
         {item && item.includes("成功")?('👑'):
          item && item.includes("失敗")?('💀'):[]} 
      </span>
      ))}<br/>
      <span className='mini-text-grey'>規則說明：五次任務中，先贏的三次的陣營獲勝</span>
      </div>):[]
    ):[]
    }

    {!gameOver && voteFailedRecord.includes("反對") ?
    (<div><br/>投票失敗：
      {voteFailedRecord.map((item, index) => (
      <span key={index}>{item && item.includes("反對")?('❌'):[]}</span>
      ))}<br/>
      <span className='mini-text-grey'>規則說明：連續投票失敗達五次，壞人陣營獲勝</span>
      </div>)
    :[]
    }

    {gameOver ? 
    (<div>
      <br/>
      {gameOver.includes("壞人")?
      (<img src='/badWin.png' alt="badWin" style={{width:'300px'}} />):(
        gameOver.includes("好人")?
      (<img src='/goodWin.png' alt="goodWin" style={{width:'300px'}} />):[])
      }
      <br/><br/>
      <b style={{color:'blue'}}>{gameOver}</b>
      <br/><br/>
      {gameOver.includes("刺客")?[]:
        <button onClick={goRoom}>回到房間</button>
      }
      
    </div>)
    :[]
    }



   </>
  )
}

export default ScoreBoard