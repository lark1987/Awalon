import { useState } from 'react';
import { useRouter } from 'next/navigation'
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const Header = (props) => {

 const {roomId,gameOver,groupMessage } = props;

 const [isToggled, setIsToggled] = useState(false);

 const router = useRouter();
 const goHome = () => {
   const socket = io(`${socketUrl}${roomId}`);
   socket.emit('roomOpen')
   sessionStorage.clear()
   router.push('/');
   return () => {socket.disconnect(); };
  }

 const roleCheck = () => { 
  setIsToggled(!isToggled)
 }

  return (
    <>

    <div>
    {/* <div className='room-logo'>
    <img src='/logo.png' alt="logo" />
    </div> */}

    {isToggled ? (<>
    <div style={{color:'rgb(20 36 55)',borderRadius:'20px',padding:'3px',height:'28px'}}>
    <b>{groupMessage}</b></div>
    </>):(
    <div className='room-logo'>
    <img src='/logo.png' alt="logo" />
    </div>
    )
    }

    <div onClick={goHome} className='leave-btn'>
    <img src='/leave.png' alt="exit"/>
    </div>

    {groupMessage &&
      <div onClick={roleCheck} className='man-btn'>
      <img src='/icon-man.png' alt="man"/>
      </div>
    }

    <hr/>
    </div>



    
    </>
  )
}

export default Header