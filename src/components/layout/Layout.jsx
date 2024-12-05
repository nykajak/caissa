import {Row} from "../row/Row.jsx"
import "./Layout.css"
import {Timer} from "../timer/Timer.jsx"

// Layout component renders the actual board using parameters derived from Board.jsx
export function Layout({board,perspective,move,setMove,decrementBoard,incrementBoard,gameOver,friendly=false}){

    let render_output = [];
    
    // Adding correct board orientation
    if (perspective === 1){
        render_output.push(
            <div key={0} className="board">
                {board.map((val,idx)=>{
                    return <Row board={board} x={idx} perspective={perspective} move={move} setMove={setMove} key={idx}/>
                })}
            </div>
        )
    }
    else{
        render_output.push(
            <div key={0} className="board">
                {board.map((val,idx)=>{
                    return <Row board={board} x={7-idx} perspective={perspective} move={move} setMove={setMove} key={idx}/>
                })}
            </div>  
        )
    }

    if (friendly){
        // Adding control panel
        render_output.push(
            <div key={1} className="control-panel">
                <button className="control-button" onClick={decrementBoard}>Back</button>
                <button className="control-button" onClick={incrementBoard}>Next</button>
            </div>
        )
        // Adding reminder text
        render_output.push(
            <div key={2} className="reminder-panel">
                <p className="reminder-text">
                    {gameOver === 0 ? (perspective == 1 ? "White to Move!" : "Black to Move!") : gameOver}
                </p>
            </div>
        )
    }


    if (!friendly){
        return (
            <div className="layout-div">
                {render_output}
                <div className={(perspective===1)?"timer-div-white":"timer-div-black"}>
                    <div>
                        <Timer active={(gameOver === 0) ? 1-perspective : 0} color={"black"} timeOut={()=>console.log("White won!")}/>
                    </div>
                    <div>
                        <Timer active={(gameOver === 0) ? perspective : 0} color={"white"} timeOut={()=>console.log("Black won!")}/>
                    </div>
                </div>
            </div>
        )
    
    }
    else{
        return (
            <>
                {render_output}
            </>
        )
    }
}