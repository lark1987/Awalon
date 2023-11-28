"use client"

import '../page.css'
import { useRouter } from 'next/navigation'

const Guide = () => {

  const router = useRouter();

  const goHome = () => {
    router.push('/');
   }


  return (
   <>
    <div className='container'>
    <div>Guide</div>
    <div onClick={goHome} className='leave-btn'>
    <img src='/leave.png' alt="exit"/>
    </div>
    </div>
    </>
  )
}

export default Guide