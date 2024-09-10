import {Square} from "../square/Square.jsx"
import "./Row.css"
export function Row({board,x,perspective,move,setMove}){

    if (perspective === 1){
        return <>
            <div className="row"> 
                {board[x].map((val,idx)=>{
                    return <Square board={board} x={x} y={idx} move={move} setMove={setMove} key={idx}/>
                })}
            </div>
           
        </>
    }
    
    return <>
        <div className="row"> 
            {board[x].map((val,idx)=>{
                    return <Square board={board} x={x} y={7-idx} move={move} setMove={setMove} key={idx}/>
            })}
        </div>
        </>
}