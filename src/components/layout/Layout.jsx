import {Row} from "../row/Row.jsx"
import "./Layout.css"

// Layout component renders the actual board using parameters derived from Board.jsx
export function Layout({board,perspective,move,setMove,decrementBoard,incrementBoard,gameOver}){

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

    return (
        <>
            {render_output}
        </>
    )
}