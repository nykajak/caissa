import { useEffect, useState } from "react"
import {init_fen, retrieve_board,retrieve_meta} from "../../scripts/board.js"
import {make_move, get_legal} from "../../scripts/move.js"
import {get_notation,get_square} from "../../scripts/notation.js"
import {Row} from "../row/Row.jsx"
import "./Board.css"

export default function Board({startState = init_fen()}){
    const [listBoards,setListBoards] = useState([startState]); // Stores list of FEN
    const [currBoard,setCurrBoard] = useState(0); // Stores index of curr FEN
    const [move,setMove] = useState([]); // Stores state of move to be made.

    useEffect(()=>{
        let fen = listBoards[currBoard];

        // Add styling when start of move determined.
        if (move.length === 1){
            let s = document.getElementById(move[0]);
            s.classList.add("selected-square");
    
            let moves = get_legal(fen,get_square(move[0]));
            for (let move of moves){
                document.getElementById(get_notation(move)).classList.add("possible-square");
            }
        }

        // Remove styling when move reset.
        else if (move.length === 0){
            let s = document.getElementsByClassName("selected-square");
            for (let i of s){
                i.classList.remove("selected-square");
            }
    
            s = [...document.getElementsByClassName("possible-square")];
            for (let i of s){   
                i.classList.remove("possible-square");
            }
        }

        else if (move.length === 2){
            // Remove styling before move made.
            let s = document.getElementById(move[0]);
            s.classList.remove("selected-square");

            let moves = get_legal(fen,get_square(move[0]));
            for (let move of moves){
                let temp = document.getElementById(get_notation(move))
                temp.classList.remove("possible-square");
            }

            // Attempt to make move
            let res = make_move(listBoards[currBoard],move[0],move[1])
            if (res !== listBoards[currBoard]){
                // If move resulted in different position
                // Then update list of FENs and move forward

                // If went back and forcing update then overwrite.
                if (currBoard + 1 !== listBoards.length){
                    setListBoards(listBoards.slice(0,currBoard+1).concat([res]));
                    setCurrBoard((x)=>x+1);
                }
                else{
                    setListBoards((x)=>[...x, res]);
                    setCurrBoard((x)=>x+1);
                }
            }
            setMove([]);
        }
    },[move])

    // Retrieve properties
    let board = retrieve_board(listBoards[currBoard]);
    let meta = retrieve_meta(listBoards[currBoard]);
    let perspective = meta["turn"];

    // Functions for navigation back and front.
    function incrementBoard(){
        if(listBoards.length > currBoard + 1){
            setCurrBoard((x)=>x+1);
            setMove([]);
        }
    }

    function decrementBoard(){
        if(currBoard >= 1){
            setCurrBoard((x)=>x-1);
            setMove([]);
        }
    }

    // Render 8 rows.
    if (perspective === 1){
        return (
            <>
                <div className="board">
                    {board.map((val,idx)=>{
                        return <Row board={board} x={idx} perspective={perspective} move={move} setMove={setMove} key={idx}/>
                    })}
                </div>

                <div className="control-panel">
                    <button className="control-button" onClick={incrementBoard}>Next</button>
                    <button className="control-button" onClick={decrementBoard}>Back</button>
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
                    <button className="control-button" onClick={incrementBoard}>Next</button>
                    <button className="control-button" onClick={decrementBoard}>Back</button>
                </div>
            </>
        )
    }
}