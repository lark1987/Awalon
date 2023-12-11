import React from 'react'

const GameInfo = (props) => {

 const { users,roleScenarios,missionScenario,scoreRecord,voteFailedRecord } = props;

  return (
   <>
  <br/>
  {
  voteFailedRecord.length>0 ? (
  <div>
  <img src={`/battery/battery-${voteFailedRecord.length}.png`} 
  alt="battery" style={{height:'30px'}} /><br/>
  <span className='mini-text-grey'>規則說明：連續投票失敗達五次，壞人陣營獲勝</span>
  </div>) :[]
  }
  <hr/>
  <div className='gameInfoBox'>

    <div>
    <img src='/icon-good.png' alt="goodman" style={{height:'40px'}}/>
    {users && roleScenarios[users.length-1] &&
    <div style={{alignSelf:'end',fontSize:'13px'}}>好人{roleScenarios[users.length-1].goodCount}</div>
    }
    </div>
    
    <div>
    <img src='/icon-bad.png' alt="badman" style={{height:'40px'}}/>
    {users && roleScenarios[users.length-1] &&
    <div style={{alignSelf:'end',fontSize:'13px'}}>壞人{roleScenarios[users.length-1].badCount}</div>
    }
    </div>

    <div style={{display:'flex'}}>
    {users && Object.entries(missionScenario[users.length]).map(([index, item]) => (
    <div key={index} style={{fontSize:'13px'}}>
      <div style={{margin:'5px 3px'}}>
      {
      scoreRecord.length>0 && scoreRecord[index-1] == "失敗"?
      <img src='/icon-badwin.png' alt="fail" style={{height:'30px'}}/>
      :(scoreRecord.length>0 && scoreRecord[index-1] == "成功"?
      (<img src='/icon-goodwin.png' alt="success" style={{height:'30px'}}/>)
      :(<img src={`/number/number-${item}.png`} alt="number" style={{height:'30px'}}/>
      )
      )
      }
      </div>

      <div style={{ 
        color: scoreRecord.length+1 == index ? 'brown' : 'black', 
        fontWeight: scoreRecord.length+1 == index ? 'bold' : 'normal' }} >
        任務{index}
      </div>



    </div>
    ))}
    </div>
  </div>
  <span className='mini-text-grey'>規則說明：五次任務中，先贏得三次的陣營獲勝</span>

  {users.length > 6 &&(
  <span className='mini-text-grey' style={{color:'green'}}>玩家七位以上，第四次任務要兩張失敗才會失敗</span>
  )
  }
   </>
  )
}

export default GameInfo