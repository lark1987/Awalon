"use client"

import { useRouter } from 'next/navigation';
import './page.css'

export default function Home() {

  const router = useRouter();

  const navigateToLobby = () => {
    
    router.push('/lobby');
  };

  return (
    <div className='container'>
      <h1>Welcome to Awalon</h1>
      <input placeholder='請輸入名稱'></input>　
      <button onClick={navigateToLobby}> START </button>
    </div>
  )
}
