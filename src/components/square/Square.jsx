import "./Square.css";
import {get_notation} from "../../scripts/notation.js"
// import "../../../static/assets"

export function Square({board,x,y,move,setMove  }){
    // let d = {
    //     "k": "\u2654","q": "\u2655","r": "\u2656","b": "\u2657","n": "\u2658","p": "\u2659",
    //     "K": "\u265A","Q": "\u265B","R": "\u265C","B": "\u265D","N": "\u265E","P": "\u265F",
    //     " ": " "    
    // }   

    let d = {
        "k": "Chess_bk.png","q": "Chess_bq.png","r": "Chess_br.png","b": "Chess_bb.png","n": "Chess_bn.png","p": "Chess_bp.png",
        "K": "Chess_WK.png","Q": "Chess_WQ.png","R": "Chess_WR.png","B": "Chess_WB.png","N": "Chess_WN.png","P": "Chess_WP.png",
    }   

    function addToMove(){
        if (move.length <= 1){
            setMove([...move, get_notation([x,y])])
        }
    }

    let output = (<></>)
    if (board[x][y] !== " "){
        output = (
            <>
                <img src={require("./../../assets/" + d[board[x][y]])} alt="f" width="100%" height="100%"/>
            </>
        )
    }
    
    if ((x + y) % 2 === 0){
        return (
            <>
            <div onClick={addToMove} id={get_notation([x,y])} className="square white-square">
                {output}
            </div>
        </>
        )
    }

    return (
        <>
            <div onClick={addToMove} id={get_notation([x,y])} className="square black-square">
                {output}
            </div>
        </>
    )
}