import { useEffect, useState } from "react"
import {retrieve_board,retrieve_meta,retrieve_fen} from "../../scripts/board.js"

import "./Promotion.css"
import { promotion_needed } from "../../scripts/result.js";

export function Promotion({fen,setListBoards,listBoards,square}){
    const [choice,setChoice] = useState(0);

        
    let board = retrieve_board(fen);
    let meta = retrieve_meta(fen);
    let l;
    if (choice !== 0){
        board[square[0]][square[1]] = choice;
        let new_fen = retrieve_fen(board,meta);
        let new_list_boards = listBoards.slice(0,listBoards.length-1).concat(new_fen) ;
        setListBoards(new_list_boards);
    }

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