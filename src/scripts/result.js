import { is_black_piece, is_pawn, is_white_piece } from "./piece.js";
import { get_legal, is_in_check } from "./move.js";
import { retrieve_board, retrieve_meta } from "./board.js";

export function is_checkmate(fen){
    
    let board = retrieve_board(fen);
    let meta = retrieve_meta(fen);

    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (meta["turn"] === 1){
                if (is_white_piece(board,[i,j]) && get_legal(fen,[i,j]).length > 0){
                    return false;
                }
            }
            else{
                if (is_black_piece(board,[i,j]) && get_legal(fen,[i,j]).length > 0){
                    return false;
                }
            } 
        }
    }

    return is_in_check(fen);
}

export function is_stalemate(fen){
    let board = retrieve_board(fen);
    let meta = retrieve_meta(fen);
    
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (meta["turn"] === 1){
                if (is_white_piece(board,[i,j]) && get_legal(fen,[i,j]).length > 0){
                    return false;
                }
            }
            else{
                if (is_black_piece(board,[i,j]) && get_legal(fen,[i,j]).length > 0){
                    return false;
                }
            } 
        }
    }

    return !is_in_check(fen);
}

export function promotion_needed(fen){
    let board = retrieve_board(fen);
    let meta = retrieve_meta(fen);

    if (meta["turn"] === 1){ // Last move was black's
        for (let i = 0; i < 8; i++){
            if (is_black_piece(board,[7,i]) && is_pawn(board,[7,i])){
                return [7,i]
            }
        }
    }
    else{
        for (let i = 0; i < 8; i++){
            if (is_white_piece(board,[0,i]) && is_pawn(board,[0,i])){
                return [0,i]
            }
        }
    }

    return [-1,-1]
}