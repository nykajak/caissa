import {Square} from "../square/Square.jsx"
import "./Row.css"

// The Row component is purely to render rows
// Takes in board, x (row no), perspective, move and function to setMove
export function Row({board,x,perspective,move,setMove}){
    // Renders 8 squares from white's perspective
    if (perspective === 1){
        return <>
            <div className="row"> 
                {board[x].map((val,idx)=>{
                    return <Square board={board} x={x} y={idx} move={move} setMove={setMove} key={idx}/>
                })}
            </div>
           
        </>
    }
    
    // Renders 8 squares from black's perspective
    return <>
        <div className="row"> 
            {board[x].map((val,idx)=>{
                    return <Square board={board} x={x} y={7-idx} move={move} setMove={setMove} key={idx}/>
            })}
        </div>
        </>
}