import { useEffect } from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const GameOver = (props) => {

  const {roomId,gameOver,setGameOver} = props;

  const onLoad = () => {
    const socket = io(`${socketUrl}${roomId}`);
    socket.on('goGameOver', (msg) => {
      setGameOver(msg)
      return () => {socket.disconnect(); };
    });
    return () => {socket.disconnect(); };
  }
  useEffect(() => onLoad(), []);

  return (
   <>
    <br/><br/>
    <img src='/gameOver.png' alt="gameOver" style={{width:'300px'}} />
    <br/><br/>
    <div className='gameOver-text'>{gameOver}</div>
    <br/><br/>
    <div>
      {gameOver.includes("刺客")?
      (<img src='/assassin-gameover.png' alt="assassin" style={{width:'200px'}} />)
      :(gameOver.includes("壞人")?(
      (<div className='gameOver-img'><img src='/badWin.png' alt="badWin"/></div>))
      :(gameOver.includes("好人")?
      (<div className='gameOver-img'><img src='/goodWin.png' alt="goodWin"/></div>):[]))
      }
    </div>
   </>
  )
}

export default GameOver