import React from 'react'
import io from 'socket.io-client';

const ScoreBoard = (props) => {

  const {scoreRecord,voteFailedRecord,gameOver } = props;

  return (
   <>
    {!gameOver &&scoreRecord ?
    (<div><br/><br/>任務成敗紀錄：
      {scoreRecord.map((item, index) => (
      <span key={index}> {item} </span>
      ))}</div>)
    :[]
    }

    {!gameOver &&voteFailedRecord ?
    (<div><br/><br/>投票失敗次數：
      {voteFailedRecord.map((item, index) => (
      <span key={index}> {item} </span>
      ))}</div>)
    :[]
    }

    {gameOver ?
    (<div>
      <br/>{gameOver}
      <button>遊戲結束，公開所有角色</button>
    </div>)
    :[]
    }



   </>
  )
}

export default ScoreBoard