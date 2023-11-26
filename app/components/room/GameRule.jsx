import React from 'react'
import GameInfo from './GameInfo'

const GameRule = (props) => {
  return (
   <>
   <br/>
  <div>
  <img src='/gameRule.png' alt="gameRule" style={{width:'200px'}} />
  </div>
  <div className='gameRuleBox'>
  <ol>
    <li>玩家輪流當隊長，每局隊長可以指派人員出任務，並由全體玩家投票是否同意。</li><br/>
    <li>若是平局或反對票佔多數，視為投票失敗，更換隊長並重新選派人員。<b>連續投票失敗達五次，壞人陣營直接獲勝</b>。</li><br/>
    <li>投票成功所選人員可以出任務，壞人陣營可以選擇任務成功或失敗，好人陣營只能選擇任務成功。</li><br/>
    <li><b>總共會進行五次任務，每局任務人員數量不同，請參照圖示。</b>任務成功三次，由好人陣營獲勝。任務失敗三次，由壞人陣營獲勝。</li><br/>
    <li>好人陣營獲勝時，壞人陣營可以討論梅林是誰，由刺客執行刺殺，若刺殺正確，壞人陣營反敗為勝！</li>
  </ol>
  </div>
   </>
  )
}

export default GameRule