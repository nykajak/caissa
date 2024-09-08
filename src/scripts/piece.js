export function get_piece(board,square){
    // Returns piece representation of square.
    return board[square[0]][square[1]];
}

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

export function check_occupied(board,square){
    // Returns true if square occupied.
    if (get_piece(board,square) === " "){
        return false;
    }

    return true;
}

export function check_color(board,square){
    // Returns 0 if square unoccupied, 1 if white piece and -1 if black piece.
    if (!check_occupied(board,square)){
        return 0;
    }

    const code = get_piece(board,square).charCodeAt(0);
    if (code >= 65 &&  code <= 90){
        return 1;
    }

    return -1;
}

export function is_white_piece(board,square){
    // Returns true if square occupied by white piece
    return (check_color(board,square) == 1)         
}

export function is_black_piece(board,square){
    // Returns true if square occupied by black piece
    return (check_color(board,square) == -1)         
}

export function is_empty(board,square){
    // Returns true if square unoccupied
    return (check_color(board,square) == 0)         
}

export function same_color_piece(board,start,end){
    // Returns true if both squares occupied by same colored piece
    if (is_white_piece(board,start) && is_white_piece(board,end)){
        return true;
    }

    if (is_black_piece(board,start) && is_black_piece(board,end)){
        return true;
    }

    return false;
}

export function diff_color_piece(board,start,end){
    // Returns true if both squares occupied by different colored piece
    if (is_white_piece(board,start) && is_black_piece(board,end)){
        return true;
    }

    if (is_black_piece(board,start) && is_white_piece(board,end)){
        return true;
    }

    return false;
}

