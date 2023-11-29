import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const ScoreBoard = (props) => {

  const {roomId,scoreRecord,voteFailedRecord,gameOver,setGameOver } = props;

  // 處理 gameOver 訊息 
  const onLoad = () => { 
    const socket = io(`${socketUrl}${roomId}`);
    socket.on('goGameOver', (msg) => {
      setGameOver(msg)
      return () => {socket.disconnect(); };
    });
  }

  useEffect(() => onLoad(), []);

  return (
   <>
    {gameOver ? 
    (<div>
      {gameOver.includes("壞人")?
      (<img src='/badWin.png' alt="badWin" style={{width:'300px'}} />):(
        gameOver.includes("好人")?
      (<img src='/goodWin.png' alt="goodWin" style={{width:'300px'}} />):[])
      }
      <br/><br/>
      <b style={{color:'blue'}}>{gameOver}</b>
      <br/><br/>
    </div>)
    :[]
    }
   </>
  )
}

export default ScoreBoard