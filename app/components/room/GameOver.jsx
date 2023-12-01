import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation'
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const GameOver = (props) => {

  const {roomId,gameOver,setGameOver,users,userNumber,} = props;

  const [goods, setGoods] = useState();
  const [bads, setBads] = useState();

  const router = useRouter();

  const goHome = () => {
    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('roomOpen')
    router.push('/');
    // window.location.href = "/";
    return () => {socket.disconnect(); };
   }

  const onLoad = () => {
    const socket = io(`${socketUrl}${roomId}`);
    socket.on('goGameOver', (msg,goods,bads) => {
      setGameOver(msg)
      setGoods(goods)
      setBads(bads)
      return () => {socket.disconnect(); };
    });
    return () => {socket.disconnect(); };
  }
  useEffect(() => onLoad(), []);

  // useEffect(() => { 
  //   if(!users) return
  //   if(!userNumber) return
  //   if (users.length !== userNumber){
  //     const socket = io(`${socketUrl}${roomId}`);
  //     socket.emit('goGameOver','玩家離線，遊戲中止')
  //     socket.emit('roomOpen')
  //     return () => {socket.disconnect(); };
  //   }
  //  },[users])

  return (
   <>
   {gameOver && (

  <div>
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
    {gameOver.includes("離線")?
    (<img src='/byebye.png' alt="byebye" style={{width:'200px'}} />)
    :[]
    }
  </div>

  {/* <br/><br/>
  <div style={{backgroundColor:'white'}}>
  <div>好人陣營
    {goods && goods.map((item, index) => (
      <div key={index}>{item.userName}：{item.role}</div>
    ))}
  </div>
  <div>壞人陣營
    {bads && bads.map((item, index) => (
      <div key={index}>{item.userName}：{item.role}</div>
    ))}
  </div>
  </div> */}

  <br/><br/>
  <div><button className='btn-yellow' onClick={goHome}>離開房間</button></div>
  </div>
   )}

   </>
  )
}

export default GameOver