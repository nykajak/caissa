import "./Square.css";
import {get_notation} from "../../scripts/notation.js"

export function Square({board,x,y,move,setMove}){
    let d = {
        "k": "Chess_bk.png","q": "Chess_bq.png","r": "Chess_br.png","b": "Chess_bb.png","n": "Chess_bn.png","p": "Chess_bp.png",
        "K": "Chess_WK.png","Q": "Chess_WQ.png","R": "Chess_WR.png","B": "Chess_WB.png","N": "Chess_WN.png","P": "Chess_WP.png",
    }   

    function addToMove(){
        // Adds square to move in Board.jsx
        if (move.length <= 1){
            setMove([...move, get_notation([x,y])])
        }
    }

    // Fiuguring out which piece to render
    let output = (<></>)
    if (board[x][y] !== " "){
        output = (
            <>
                <img src={require("./../../assets/" + d[board[x][y]])} alt="f" width="100%" height="100%"/>
            </>
        )
    }
    
    //Rendering
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