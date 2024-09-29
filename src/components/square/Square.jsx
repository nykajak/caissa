import "./Square.css";
import {get_notation} from "../../scripts/notation.js"
import {is_empty} from "../../scripts/piece.js"

// Square component is used to render correct piece and to add squares to moves
// Takes in board, x (row no), y (col no), move and function to setMove
export function Square({board,x,y,move,setMove}){
    let d = {
        "k": "Chess_bk.png","q": "Chess_bq.png","r": "Chess_br.png","b": "Chess_bb.png","n": "Chess_bn.png","p": "Chess_bp.png",
        "K": "Chess_WK.png","Q": "Chess_WQ.png","R": "Chess_WR.png","B": "Chess_WB.png","N": "Chess_WN.png","P": "Chess_WP.png",
    }   // Mapping of piece code to image

    function addToMove(){
        // Adds starting square to move if not empty
        if (move.length === 0){
            if (!is_empty(board,[x,y])){
                setMove([get_notation([x,y])])
            }
        }

        else if (move.length === 1){
            // Adds ending square to move if not same as starting square
            if (move[0] !== get_notation([x,y])){
                setMove([...move, get_notation([x,y])])
            }
            // Else cancels move.
            else{
                setMove([]);
            }
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
    
    //Rendering white square
    if ((x + y) % 2 === 0){
        return (
            <>
            <div onClick={addToMove} id={get_notation([x,y])} className="square white-square">
                {output}
            </div>
        </>
        )
    }

    //Rendering black square
    return (
        <>
            <div onClick={addToMove} id={get_notation([x,y])} className="square black-square">
                {output}
            </div>
        </>
    )
}