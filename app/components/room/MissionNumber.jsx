import React from 'react'

const MissionNumber = (props) => {

 const { users,userName,roomId,scoreRecord,setShowLeader } = props;

 // 先從 leader 借，晚點要整合
 const missionScenario = {
  1: {1:1, 2:1, 3:1, 4:1, 5:1,},
  2: {1:2, 2:2, 3:1, 4:1, 5:1,},
  3: {1:1, 2:1, 3:1, 4:1, 5:1,},
  4: {1:1, 2:1, 3:1, 4:1, 5:1,},
  5: {1:2, 2:3, 3:2, 4:3, 5:3,},
  6: {1:2, 2:3, 3:4, 4:3, 5:4,},
  7: {1:2, 2:3, 3:3, 4:4, 5:4,},
  8: {1:3, 2:4, 3:4, 4:5, 5:5,},
  9: {1:3, 2:4, 3:4, 4:5, 5:5,},
  10: {1:3, 2:4, 3:4, 4:5, 5:5,},
};

const roleScenarios = [
 { total: 1, badCount: 0, goodCount: 1 },
 { total: 2, badCount: 1, goodCount: 1 },
 { total: 3, badCount: 1, goodCount: 2 },
 { total: 4, badCount: 1, goodCount: 3 },
 { total: 5, badCount: 2, goodCount: 3 },
 { total: 6, badCount: 2, goodCount: 4 },
 { total: 7, badCount: 3, goodCount: 4 },
 { total: 8, badCount: 3, goodCount: 5 },
 { total: 9, badCount: 3, goodCount: 6 },
 { total: 10, badCount: 4, goodCount: 6 },
];


  return (
   <>
   <div>
    好人壞人
   </div>
   <div style={{display:'flex',border:'1px solid black'}}>
    {users && Object.entries(missionScenario[users.length]).map(([index, item]) => (
    <div key={index} style={{margin:'5px'}}>
      <div>任務{index}</div>
      <img src={`/number/number-${item}.png`} alt="number" style={{height:'15px'}}/>
    </div>
    ))}
   </div>
   </>
  )
}

export default MissionNumber