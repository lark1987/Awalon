"use client"

import Lobby from './components/Lobby'

export default function Home() {

  return (
    <>
    <div className='pic-box'>
    <img className='homePic pic-rocket' src='/homepage/home-rocket.png' alt="pic-rocket" />
    <img className='homePic pic-star' src='/homepage/home-star.png' alt="pic-star" />
    <img className='homePic pic-balloon' src='/homepage/home-balloon.png' alt="pic-balloon" />
    <img className='homePic pic-bling' src='/homepage/home-bling.png' alt="pic-bling" />
    <img className='homePic pic-earth' src='/homepage/home-earth.png' alt="pic-earth" />
    <br/><br/>
    <img className='pic-rocket-800' src='/homepage/home-rocket-2.png' alt="pic-rocket" />
    <Lobby/>
    <img className='pic-welcome' src='/homepage/home-welcome.png' alt="pic-welcome" />
    <br/><br/>
    </div>
    </>

  )
}
