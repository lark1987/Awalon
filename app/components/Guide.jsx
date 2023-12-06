"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../page.css'

const Guide = () => {

const initialToggles = Array(9).fill(false);

const [toggles, setToggles] = useState(initialToggles);

const handleToggle = (index) => {
  setToggles((prevToggles) => {
    const newToggles = [...prevToggles];
    newToggles[index] = !newToggles[index];
    return newToggles;
  });
};

const router = useRouter();
const goHome = () => { 
 router.push('/');
}


  return (
   <>
    <div className='container' >

    <div className='logo'><img src='/logo.png' alt="logo" onClick={goHome}
    style={{cursor:'pointer'}}/></div>

    <hr/>

     <div>
      <div onClick={()=>handleToggle(0)} className='guide-list'>
      step 0 ：網站主題
      </div>
      {toggles[0] && (
       <div className='guide-content'>
       <b>歡迎來到 Awalon！</b><br/>
       本站希望能作為經典桌遊阿瓦隆<br/>的輔助工具，好友相約，隨時開玩！<br/><br/>
 
       <span style={{color:'blue'}}>遊戲人數建議：5~10人。<br/>
       目前特殊角色僅提供：梅林、刺客<br/></span>
       仍請購買支持紙本桌遊！
       </div>
      )}
     </div>


     <div>
      <div onClick={()=>handleToggle(1)} className='guide-list'>
      step 1 ：進入房間
      </div>
      {toggles[1] && (
       <>
       <div className='guide-content'>
       創建房間名稱及密碼，即可進入房間<br/>
       確認玩家有出現在<b>"目前在線人員"</b>，<br/>全員到齊即可開始遊戲！<br/><br/>
       <span style={{color:'blue'}}>
       房間員額10名為上限、<br/>房間名稱不可重複、<br/>房間內的玩家名稱不可以相同。<br/><br/>
       </span>
       請留意遊戲開始後，<br/><span style={{color:'red'}}>關閉或刷新頁面都將導致遊戲中斷。</span>
       </div>
       </>
      )}
     </div>


     <div>
      <div onClick={()=>handleToggle(2)} className='guide-list'>
      step 2 ：抽取角色
      </div>
      {toggles[2] && (
       <>
       <div className='guide-content'>
       每位玩家抽取角色牌、確認陣營身份<br/>
       <span style={{color:'blue'}}>目前特殊角色僅提供：梅林、刺客。</span><br/><br/>

       <table className='guide-table'>
        <tr><th>玩家人數</th><th>壞人數量</th></tr>
        <tr><td>2~4</td><td>一位</td></tr>
        <tr><td>5~6</td><td>二位</td></tr>
        <tr><td>7~9</td><td>三位</td></tr>
        <tr><td>10</td><td>四位</td></tr>
        </table><br/>

       角色分成好人陣營及壞人陣營，<br/>
       <span style={{color:'blue'}}>壞人陣營知悉彼此身份。</span><br/>
       <b>梅林</b>：可以知道壞人的身份，<br/><b>刺客</b>：可以找出梅林並刺殺。<br/>



       </div>
        </>
      )}
     </div>

     <div>
      <div onClick={()=>handleToggle(3)} className='guide-list'>
      step 3 ：天黑閉眼
      </div>
      {toggles[3] && (
       <>
       <div className='guide-content'>
       請一位玩家撥放指導語音，<br/>供梅林及壞人陣營知悉身份。<br/>
       </div>
       </>
      )}
      
     </div>

     <div>
      <div onClick={()=>handleToggle(4)} className='guide-list'>
      step 4 ：遊戲規則
      </div>
      {toggles[4] && (
      <>
      <div className='guide-content'>
      <b>玩家輪流當隊長</b>，<br/>每局隊長可以指派人員出任務，<br/>並由全體玩家投票是否同意。<br/><br/>
      <b>總共會進行五次任務</b>，<br/>先贏得三次的陣營獲勝！<br/><br/>
      好人陣營獲勝時，<br/><b>壞人陣營的刺客可以指認梅林</b>，<br/>若指認正確，壞人陣營反敗為勝！
      </div>
      </>)}
     </div>

     <div>
      <div onClick={()=>handleToggle(5)} className='guide-list'>
      step 5 ：隊長指派
      </div>
      {toggles[5] && (<>
       <div className='guide-content'>
       隊長順序會列示在最上方，<br/><b>依照星星數字選擇該數量的人員。</b><br/>
       資訊版會呈現好人壞人數量，<br/><b>當次任務的字體會呈現粗體紅色。</b><br/>
       </div>
       <img src='/guide/guide-5.png' alt="guide" style={{width:'250px'}}></img>
       </>)}
     </div>

     <div>
      <div onClick={()=>handleToggle(6)} className='guide-list'>
      step 6 ：全員投票
      </div>
      {toggles[6] && (<>
      <div className='guide-content'>
      投票表決是否同意出任務的人選。<br/>
      <b>投票結果可點選 黑色圈圈 查看。</b><br/><br/>
      <span style={{color:'blue'}}>
      若平票或反對票佔多數，投票失敗。</span><br/>更換隊長重新指派。<br/><br/>
      <span style={{color:'blue'}}>連續投票失敗五次，壞人陣營勝利。</span><br/>
      以電池圖案標記。<br/>
      </div>
      <img src='/guide/guide-6.png' alt="guide" style={{width:'250px'}}></img>
      </>)}
     </div>

     <div>
      <div onClick={()=>handleToggle(7)} className='guide-list'>
      step 7 ：出任務囉
      </div>
      {toggles[7] && (<>
      <div className='guide-content'>
      任務人員可以點選任務成功或失敗，<br/>
      <b>好人陣營只能選擇任務成功！</b><br/><br/>

      任務成功三次，好人陣營獲勝！<br/>
      任務失敗三次，壞人陣營獲勝！<br/><br/>

      <span style={{color:'blue'}}><b>只要有一人點選失敗，任務即失敗</b></span><br/>
      資訊版星星會變成黑色。<br/>
      <b>笑臉</b>：任務成功的數量，<br/>
      <b>哭臉</b>：任務失敗的數量。<br/><br/>

      <span style={{color:'blue'}}><b>七人以上第四次任務需兩個失敗，</b></span><br/>任務才算失敗<br/>
      
      
      </div>
      <img src='/guide/guide-7.png' alt="guide" style={{width:'250px'}}></img>
      </>)}
     </div>

     <div>
      <div onClick={()=>handleToggle(8)} className='guide-list'>
      step 8 ：刺客出動
      </div>
      {toggles[8] && (<>
      <div className='guide-content'>
      <b>若任務成功三次，啟動刺客任務。</b><br/>
      壞人陣營討論哪一位玩家是梅林。<br/>
      若刺客刺殺成功，壞人陣營獲勝！
      </div>
      <img src='/guide/guide-8.png' alt="guide" style={{width:'250px'}}></img>
      </>)}
     </div>
    
    <br/>
    <div>
    <img src='/leave.png' alt="exit" onClick={goHome} 
    style={{width:'30px',cursor:'pointer'}} />
    </div>



    </div>
   </>

  )
}

export default Guide