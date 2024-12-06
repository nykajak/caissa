import {Row} from "../row/Row.jsx"
import {Timer} from "../timer/Timer.jsx"

import "./Layout.css"

// Layout component renders the actual board using parameters derived from Board.jsx
export function Layout({board,perspective,move,setMove,decrementBoard,incrementBoard,gameOver,friendly=false}){

    let board_output;
    
    // Adding correct board orientation
    if (perspective === 1){
        board_output = (
            <div key={0} className="board">
                {board.map((val,idx)=>{
                    return <Row board={board} x={idx} perspective={perspective} move={move} setMove={setMove} key={idx}/>
                })}
            </div>
        )
    }
    else{
        board_output = (
            <div key={0} className="board">
                {board.map((val,idx)=>{
                    return <Row board={board} x={7-idx} perspective={perspective} move={move} setMove={setMove} key={idx}/>
                })}
            </div>  
        )
    }

    if (!friendly){
        return (
            <div className="layout-div">
                {board_output}
                <div className="other-div">
                    <div className={(perspective===1)?"timer-div-white":"timer-div-black"}>
                        <div className={(perspective===1)?"top-timer":"bottom-timer"}>
                            <Timer active={(gameOver === 0) ? 1-perspective : 0} color={"black"} timeOut={()=>console.log("White won!")}/>
                        </div>
                        <div className={(perspective===1)?"bottom-timer":"top-timer"}>
                            <Timer active={(gameOver === 0) ? perspective : 0} color={"white"} timeOut={()=>console.log("Black won!")}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    
    }
    else{
        return (
            <div className="layout-div">
                {board_output}
                <div className="other-div">
                    <div className="control-panel">
                        <button className="control-button" onClick={decrementBoard}>Go to prev move</button>
                        <button className="control-button" onClick={incrementBoard}>Go to next move</button>
                    </div>
                </div>
            </div>
        )
    }
}