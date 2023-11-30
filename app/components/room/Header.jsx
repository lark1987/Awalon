import { useRouter } from 'next/navigation'
import io from 'socket.io-client';
import { socketUrl } from '../../utils/socketUrl';

const Header = (props) => {

 const {roomId, } = props;

 const router = useRouter();
 const goHome = () => {
   const socket = io(`${socketUrl}${roomId}`);
   socket.emit('roomOpen')
   router.push('/');
   return () => {socket.disconnect(); };
  }

  return (
    <>
    <div className='room-logo' onClick={goHome}>
    <img src='/logo.png' alt="logo" />
    </div>

    <div onClick={goHome} className='leave-btn'>
    <img src='/leave.png' alt="exit"/>
    </div>

    <div onClick={goHome} className='man-btn'>
    <img src='/icon-man.png' alt="man"/>
    </div>

    <hr/>
    </>
  )
}

export default Header