import { useState } from "react"
import {retrieve_board,retrieve_meta,retrieve_fen} from "../../scripts/board.js"
import "./Promotion.css"

// Promotion component displays and handles options for promotion of pawns.
// This component is only rendered if some pawn on 8th rank.
// Takes in current FEN string, list of FEN strings, function to set list of FEN strings and square
export function Promotion({fen,setListBoards,listBoards,square}){
    const [choice,setChoice] = useState(0);

    // Retrieving encoded data
    let board = retrieve_board(fen);
    let meta = retrieve_meta(fen);
    
    let l; // List variable

    // If piece alerady chosen
    if (choice !== 0){
        // Set corresponding piece on square in board
        board[square[0]][square[1]] = choice;

        // Construct new FEN string
        let new_fen = retrieve_fen(board,meta);

        // Append FEN string to end of list.
        let new_list_boards = listBoards.slice(0,listBoards.length-1).concat(new_fen) ;
        setListBoards(new_list_boards);
    }

    // If piece to be promoted is White
    if (meta["turn"] !== 1){
        l = ["Chess_WN.png","Chess_WB.png","Chess_WR.png","Chess_WQ.png"]
        return (
            <div className="promotion-modal">
                <div className="promotion-div">
                    <span className="promotion-choice"><img src={require("./../../assets/" + l[0])} alt="not_found.jpg" onClick={()=>setChoice('N')}/></span>
                    <span className="promotion-choice"><img src={require("./../../assets/" + l[1])} alt="not_found.jpg" onClick={()=>setChoice('B')}/></span>
                    <span className="promotion-choice"><img src={require("./../../assets/" + l[2])} alt="not_found.jpg" onClick={()=>setChoice('R')}/></span>
                    <span className="promotion-choice"><img src={require("./../../assets/" + l[3])} alt="not_found.jpg" onClick={()=>setChoice('Q')}/></span>
                </div>
            </div>
        )
    }

    // If piece to be promoted is Black
    l = ["Chess_bn.png","Chess_bb.png","Chess_br.png","Chess_bq.png"]
    return (
        <div className="promotion-modal">
            <div className="promotion-div">
                <span className="promotion-choice"><img src={require("./../../assets/" + l[0])} alt="not_found.jpg" onClick={()=>setChoice('n')}/></span>
                <span className="promotion-choice"><img src={require("./../../assets/" + l[1])} alt="not_found.jpg" onClick={()=>setChoice('b')}/></span>
                <span className="promotion-choice"><img src={require("./../../assets/" + l[2])} alt="not_found.jpg" onClick={()=>setChoice('r')}/></span>
                <span className="promotion-choice"><img src={require("./../../assets/" + l[3])} alt="not_found.jpg" onClick={()=>setChoice('q')}/></span>
            </div>
        </div>
    )
}