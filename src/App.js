import './App.css';
import { useState } from "react"

function App() {
  return (
    <div className="App">

      <div className = "Title">
        <h1> Reaction Speed Test </h1>
      </div>
      
      <StartTest></StartTest>

      <div>
        ....
      </div>
    </div>
  );
}

export default App;


function StartTest(){ //테스트 시작부분 따로 작성
  let [statenum,numChange] = useState(0);
  let [clickTime, setClickTime] = useState(null);
  let [reactionTime, setRectionTime] = useState(null);
  let [waitTime, setWaitTime] = useState(null)

  let handleclick = (e) => {
    console.log("클릭 발생시점 (ms):",e.timeStamp);
    setClickTime(e.timeStamp);
    numChange(statenum+1);
    let waittime = random(2000,7000);
    console.log(waittime)
    setWaitTime(waittime);
    setTimeout(()=>{numChange(prev => prev + 1);},waittime);
  }

  let comebackScreen = (e) => {
    numChange(statenum+1);
    console.log(waitTime, clickTime, e.timeStamp);
    setRectionTime(e.timeStamp-waitTime-clickTime-70);
  }
  
  let repeat = () => {
    numChange(statenum-3);
  }

  let tooFast = () => {
    numChange(statenum+3);
  }

  function random(min,max) {
    return Math.random()*(max-min) + min;
  } //랜덤 변수 생성 함수

  if (statenum === 0) {
    return <div className = "startscreen" onClick={handleclick}> <h2>Start the reaction test! click here.</h2> </div>
  } else if (statenum === 1){
    return <div className = "waitscreen" onClick={tooFast}> <h2>Wait until turns to green!</h2> </div>
  } else if (statenum === 2){
    return <div className = "greenscreen" onClick={comebackScreen}><h2>Now click the screen!</h2></div>
  } else if (statenum === 3){
    return <div className = "result" onClick = {repeat}><h2>Your Reaction Time is </h2><h1>{reactionTime.toFixed(0)}</h1><h2> ms!</h2></div>
  } else if (statenum === 4){
    return <div className = "missscreen" onClick = {repeat}><h2>You Clicked too fast!</h2><h3>이거 예상샷 해서 반응속도 쬐에끔 더 빠르게 하면 뭐하니...</h3></div>
  }
}
