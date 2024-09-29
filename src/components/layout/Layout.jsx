import {Row} from "../row/Row.jsx"
import "./Layout.css"

// Layout component renders the actual board using parameters derived from Board.jsx
export function Layout({board,perspective,move,setMove,decrementBoard,incrementBoard,gameOver}){
    if (perspective === 1){
        return (
            <>
                <div className="board">
                    {board.map((val,idx)=>{
                        return <Row board={board} x={idx} perspective={perspective} move={move} setMove={setMove} key={idx}/>
                    })}
                </div>
    
                <div className="control-panel">
                    <button className="control-button" onClick={decrementBoard}>Back</button>
                    <button className="control-button" onClick={incrementBoard}>Next</button>
                </div>
                
                <div className="reminder-panel">
                    <p className="reminder-text">
                        {gameOver === 0 ? "White to Move!" : gameOver}
                    </p>
                </div>
            </>
        )
    }
    else{
        return (
            <>
                <div className="board">
                    {board.map((val,idx)=>{
                        return <Row board={board} x={7-idx} perspective={perspective} move={move} setMove={setMove} key={idx}/>
                    })}
                </div>  
                
                <div className="control-panel">
                    <button className="control-button" onClick={decrementBoard}>Back</button>
                    <button className="control-button" onClick={incrementBoard}>Next</button>
                </div>

                <div className="reminder-panel">
                    <p className="reminder-text">
                        {gameOver === 0 ? "Black to Move!" : gameOver}
                    </p>
                </div>
            </>
        )
    }
}