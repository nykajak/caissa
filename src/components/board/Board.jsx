import { useEffect, useState } from "react"
import {init_fen, retrieve_board,retrieve_meta} from "../../scripts/board.js"
import {make_move, get_legal} from "../../scripts/move.js"
import {get_notation,get_square} from "../../scripts/notation.js"
import {is_empty} from "../../scripts/piece.js"
import {Layout} from "../layout/Layout.jsx"
import { is_checkmate, is_stalemate, promotion_needed } from "../../scripts/result.js"
import { Promotion } from "../promotion/Promotion.jsx"
import "./Board.css"

// Board component is used to render chessboard.
// Takes in startState
export function Board({startState = init_fen()}){
    const [listBoards,setListBoards] = useState([startState]); // Stores list of FEN
    const [currBoard,setCurrBoard] = useState(0); // Stores index of curr FEN
    const [move,setMove] = useState([]); // Stores state of move to be made.

    useEffect(()=>{
        let fen = listBoards[currBoard];

        // Add styling when start of move determined.
        if (move.length === 1){

            if (!is_empty(retrieve_board(fen),get_square(move[0]))){
                let s = document.getElementById(move[0]);
                s.classList.add("selected-square");
            }
    
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
                setMove([]);
            }

            else{
                if (is_empty(retrieve_board(listBoards[currBoard]),get_square(move[1]))){
                    setMove([])
                }
                else{
                    setMove([move[1]])
                }
            }
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

    // Check for checkmate
    if (is_checkmate(listBoards[currBoard])){
        if (meta["turn"] === 1){
            return <Layout board={board} perspective={perspective} move={move} setMove={setMove} decrementBoard={decrementBoard} incrementBoard={incrementBoard} gameOver={"Black Won!"}/>
        }
        else{
            return <Layout board={board} perspective={perspective} move={move} setMove={setMove} decrementBoard={decrementBoard} incrementBoard={incrementBoard} gameOver={"White Won!"}/>
        }
    }

    // Check for stalemate
    if (is_stalemate(listBoards[currBoard])){
        return <Layout board={board} perspective={perspective} move={move} setMove={setMove} decrementBoard={decrementBoard} incrementBoard={incrementBoard} gameOver={"Draw!"}/>
    }

    let need_promotion = promotion_needed(listBoards[currBoard]);
    if (need_promotion[0] !== -1 && need_promotion[0] !== -1){
        return (
            <>
                <Layout board={board} perspective={1-perspective} move={move} setMove={setMove} decrementBoard={decrementBoard} incrementBoard={incrementBoard} gameOver={0}/>
                <Promotion fen={listBoards[currBoard]} setListBoards={setListBoards} listBoards={listBoards} square={need_promotion}/>       
            </>
        )
    }

    // Render 8 rows.
    return (
        <>
            <Layout board={board} perspective={perspective} move={move} setMove={setMove} decrementBoard={decrementBoard} incrementBoard={incrementBoard} gameOver={0}/>
        </>
    )
}