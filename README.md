
<img src='./public/logo.png' width='300'>

## Introduction

復刻經典桌遊阿瓦隆，期待作為團康輔助工具，好友相約，隨時玩樂！  

遊戲 DEMO 影片：https://www.flexclip.com/tw/share/27031520f008021fd06997fd2f342bffffeaf8e.html

## Architecture

前端以 React 作為主要框架，搭配 Next.js，於 Vercel 部屬。  
後端由 node.js 架設伺服器，以 socket.io 提供互動功能，部屬於 AWS EC2。

<img src='./public/read/architecture.png' width='500'>

## Components

<img src='./public/read/components.PNG' width='600'> 

- 頁面：登入頁面 Lobby、遊戲說明 Guide、遊戲房間 Room  
- 房間：房間標頭 Header、在線人員 OnlineUsers  
- 流程：抽取角色 Role、<b>流程串接 Game</b>、遊戲結束 GameOver  
- 任務：隊長提名 Leader、全員投票 Vote、執行任務 Mission、刺客行動 Assassin  
- 資訊：遊戲規則 GameRule、遊戲紀錄 GameInfo








