import {Timer} from "../timer/Timer.jsx"
import { Board } from "./Board.jsx"
import { Termination } from "../termination/Termination.jsx"

import "./Layout.css"

// Layout component renders the actual board using parameters derived from Board.jsx
export function Layout({board,perspective,move,setMove,decrementBoard,incrementBoard,gameOver,setGameOver,friendly=false}){
    if (!friendly){
        return (
            <div className={"layout-div " + ((perspective===1) ? "whiteMove" : "blackMove")}>
                
                <div className={(perspective===1)?"top-timer":"bottom-timer"}>
                    <Timer active={(gameOver === 0) ? 1-perspective : 0} color={"black"} timeOut={()=>setGameOver("White won!")}/>
                </div>
                <Board board={board} perspective={perspective} move={move} setMove={setMove}/>
                
                <div className={(perspective===1)?"bottom-timer":"top-timer"}>
                    <Timer active={(gameOver === 0) ? perspective : 0} color={"white"} timeOut={()=>setGameOver("Black won!")}/>
                </div>
                
                {(gameOver !== 0) ? <Termination gameOver={gameOver}/> : <></>}
            </div>
        )
    
    }
    else{
        return (
            <div className="layout-div">
                <Board board={board} perspective={perspective} move={move} setMove={setMove}/>
                <div className="control-panel">
                    <button className="control-button" onClick={decrementBoard}>Go to prev move</button>
                    <button className="control-button" onClick={incrementBoard}>Go to next move</button>
                </div>

                {(gameOver !== 0) ? <Termination gameOver={gameOver}/> : <></>}
            </div>
        )
    }
}