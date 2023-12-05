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
       歡迎來到 Awalon！<br/>
       本站希望能作為經典桌遊阿瓦隆的團康輔助工具，好友相約，隨時開玩！<br/><br/>
 
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
       由一玩家創建房間名稱及密碼，並提供給其他玩家加入。<br/>
       確認"目前在線人員"的名單，人員到齊即可開始遊戲。<br/><br/>
       點選左上角圖示可以離開房間，<br/>
       <span style={{color:'blue'}}>
       房間員額10名為上限、<br/>房間名稱不可重複、<br/>房間內的玩家名稱不可以相同。<br/><br/>
       </span>
       請留意遊戲開始後，<br/>關閉或刷新頁面都將導致遊戲中斷。
       </div>
       <img src='/guide/guide-1.png' alt="guide" style={{width:'250px'}}></img>
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
       每位玩家抽取自己的角色牌，確認自己的身份。
       遊戲過程中可點選左上角的人物圖示確認自己的身份。<br/><br/>
 
       壞人數量：<br/>
       二~四位玩家：一名壞人<br/>
       五~六位玩家：二名壞人<br/>
       七~九位玩家：三名壞人<br/>
       十位玩家：四名壞人<br/><br/>
       目前特殊角色僅提供：梅林、刺客。
       </div>
        <img src='/guide/guide-2.png' alt="guide" style={{width:'250px'}}></img>
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
       請一位玩家撥放指導語音，供梅林及壞人陣營確認身份。
       </div>
       <img src='/guide/guide-2.png' alt="guide" style={{width:'250px'}}></img>
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
      所有人了解規則後可繼續遊戲。
      </div>
      <img src='/guide/guide-4.png' alt="guide" style={{width:'250px'}}></img>
      </>)}
     </div>

     <div>
      <div onClick={()=>handleToggle(5)} className='guide-list'>
      step 5 ：隊長指派
      </div>
      {toggles[5] && (<>
       <div className='guide-content'>
       隊長順序會列示在最上方，請依照下方星星裡的數字選擇該數量的人員。
       資訊版會呈現當次遊戲的好人及壞人數量，及目前進行到哪一次的任務。
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
      每位玩家可以投票表決是否同意此次出任務的人選。
      點選 黑色圈圈 可以確認投票結果的詳細資訊。
      若平票或反對票佔多數，即投票失敗。更換隊長重新指派。
      若連續投票失敗達五次，壞人陣營直接勝利。由電池圖案標記。
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
      被指派的人員可以點選任務成功或任務失敗，（好人陣營只能選擇任務成功）
      只要有一人點選失敗，任務即失敗（資訊版星星會變成黑色）。
      （七人以上第四次任務需要兩人點選失敗，任務才算失敗）
      笑臉表示任務成功的數量，哭臉表示任務失敗的數量。
      任務失敗三次，壞人陣營獲勝！
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
      若任務成功三次，啟動刺客任務。
      抽到刺客角色的玩家，可和壞人陣營討論哪一位玩家是梅林。
      若刺殺成功，壞人陣營獲勝！
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