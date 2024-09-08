import { get_piece } from "./board.js";

export function is_bishop(board,square){
    // Returns true if square occupied by bishop
    return get_piece(board,square).toLowerCase() === "b";
}

export function is_knight(board,square){
    // Returns true if square occupied by knight
    return get_piece(board,square).toLowerCase() === "n";
}

export function is_king(board,square){
    // Returns true if square occupied by king
    return get_piece(board,square).toLowerCase() === "k";
}

export function is_queen(board,square){
    // Returns true if square occupied by queen
    return get_piece(board,square).toLowerCase() === "q";
}

export function is_pawn(board,square){
    // Returns true if square occupied by pawn
    return get_piece(board,square).toLowerCase() === "p";
}

export function is_rook(board,square){
    // Returns true if square occupied by rook
    return get_piece(board,square).toLowerCase() === "r";
}