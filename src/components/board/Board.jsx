import { useEffect, useState } from "react"
import {init_fen, retrieve_board,retrieve_meta} from "../../scripts/board.js"
import {make_move, get_legal} from "../../scripts/move.js"
import {get_notation,get_square} from "../../scripts/notation.js"
import {Row} from "../row/Row.jsx"
import "./Board.css"

export default function Board({startState = init_fen()}){
    const [listBoards,setListBoards] = useState([startState]);
    const [currBoard,setCurrBoard] = useState(0);
    const [move,setMove] = useState([]);

    useEffect(()=>{
         console.log(listBoards[currBoard])
    },[currBoard])

    useEffect(()=>{
        console.log(move);
        let fen = listBoards[currBoard];

        if (move.length === 1){
            let s = document.getElementById(move[0]);
            s.classList.add("selected-square");
    
            let moves = get_legal(fen,get_square(move[0]));
            for (let move of moves){
                document.getElementById(get_notation(move)).classList.add("possible-square");
            }
        }

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
            let s = document.getElementById(move[0]);
            s.classList.remove("selected-square");

            let moves = get_legal(fen,get_square(move[0]));
            for (let move of moves){
                let temp = document.getElementById(get_notation(move))
                temp.classList.remove("possible-square");
            }

            let res = make_move(listBoards[currBoard],move[0],move[1])
            console.log(res)

            if (res !== listBoards[currBoard]){
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

    let board = retrieve_board(listBoards[currBoard]);
    let meta = retrieve_meta(listBoards[currBoard]);
    let perspective = meta["turn"];

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

    if (perspective === 1){
        return (
            <>
                <div className="board">
                    {board.map((val,idx)=>{
                        return <Row board={board} x={idx} perspective={perspective} move={move} setMove={setMove} key={idx}/>
                    })}
                </div>

                <div>
                    <button onClick={incrementBoard}>Next</button>
                    <button onClick={decrementBoard}>Back</button>
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
                
                <div>
                    <button onClick={incrementBoard}>Next</button>
                    <button onClick={decrementBoard}>Back</button>
                </div>
            </>
        )
    }
}