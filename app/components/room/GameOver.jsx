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
    sessionStorage.clear()
    setGoods('')
    setBads('')
    router.push('/');
    return () => {socket.disconnect(); };
  }

  const getRoleList = () => { 
    const socket = io(`${socketUrl}${roomId}`);
    socket.emit('roleList')
    socket.on('roleList', (goods,bads) => {
      setGoods(goods)
      setBads(bads)
      return () => {socket.disconnect(); };
    });
    return () => {socket.disconnect(); };
    
  }

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

  <br/><br/>
  <div style={{display:'flex',justifyContent:'space-evenly'}}>
    {gameOver.includes("刺客")?null:
    (gameOver.includes("離線")?null:
    (<button className='btn-yellow' onClick={getRoleList}>玩家身份</button>
    ))}
    <button className='btn-yellow' onClick={goHome}>離開房間</button>
  </div>
  <br/><br/>


  { goods && bads && (
      <>
      <br/><br/>
      <div style={{color:'white',display:'flex',justifyContent:'center',columnGap:'10px'}}>
        <div>
          <img src='/gameOver-goods.png' alt="goods" style={{width:'150px'}}/>
          {goods && goods.map((item, index) => (
            <div key={index}>{item.userName}：{item.role}</div>
          ))}
        </div>
        <div>
          <img src='/gameOver-bads.png' alt="goods" style={{width:'150px'}}/>
          {bads && bads.map((item, index) => (
            <div key={index}>{item.userName}：{item.role}</div>
          ))}
        </div>
      </div>
      <br/><br/>
      </>
    )
  }






  </div>
   )}

   </>
  )
}

export default GameOver