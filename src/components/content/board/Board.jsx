import "./Board.css"
import { Row } from "./Row.jsx"

export function Board({board,perspective,move,setMove}){
    if (perspective === 1){
        return (
            <div className="board">
                {board.map((val,idx)=>{
                    return <Row board={board} x={idx} perspective={perspective} move={move} setMove={setMove} key={idx}/>
                })}
            </div>
        )
    }
    else{
        return (
            <div className="board">
                {board.map((val,idx)=>{
                    return <Row board={board} x={7-idx} perspective={perspective} move={move} setMove={setMove} key={idx}/>
                })}
            </div>  
        )
    }
}