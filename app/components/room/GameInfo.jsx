import React from 'react'

const GameInfo = (props) => {

 const { users,roleScenarios,missionScenario, } = props;

  return (
   <>
  <br/><br/><br/>
  <div className='gameInfoBox'>

    <div style={{margin:'5px'}}>
    <img src='/icon-good.png' alt="goodman" style={{height:'30px'}}/>
    {users && roleScenarios[users.length-1] &&
    <div style={{alignSelf:'end'}}>{roleScenarios[users.length-1].goodCount}</div>
    }
    </div>
    
    <div style={{margin:'5px'}}>
    <img src='/icon-bad.png' alt="badman" style={{height:'30px'}}/>
    {users && roleScenarios[users.length-1] &&
    <div style={{alignSelf:'end'}}>{roleScenarios[users.length-1].badCount}</div>
    }
    </div>



    <div style={{display:'flex'}}>
    {users && Object.entries(missionScenario[users.length]).map(([index, item]) => (
    <div key={index} style={{margin:'5px'}}>
      <img src={`/number/number-${item}.png`} alt="number" style={{height:'30px'}}/>
      <div>任務{index}</div>
    </div>
    ))}
    
  </div>



  </div>
   </>
  )
}

export default GameInfo