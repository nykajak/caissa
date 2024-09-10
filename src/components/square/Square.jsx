import "./Square.css";
import {get_notation} from "../../scripts/notation.js"

export function Square({board,x,y,move,setMove  }){
    let d = {
        "k": "\u2654","q": "\u2655","r": "\u2656","b": "\u2657","n": "\u2658","p": "\u2659",
        "K": "\u265A","Q": "\u265B","R": "\u265C","B": "\u265D","N": "\u265E","P": "\u265F",
        " ": " "    
    }   

    function addToMove(){
        if (move.length <= 1){
            setMove([...move, get_notation([x,y])])
        }
    }
    
    if ((x + y) % 2 === 0){
        return (
            <>
            <div onClick={addToMove} id={get_notation([x,y])} className="square white-square">
                {d[board[x][y]]}
            </div>
        </>
        )
    }

    return (
        <>
            <div onClick={addToMove} id={get_notation([x,y])} className="square black-square">
                {d[board[x][y]]}
            </div>
        </>
    )
}