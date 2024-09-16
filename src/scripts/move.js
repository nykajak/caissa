import { check_bounds,copy_board,retrieve_board,retrieve_meta,retrieve_fen} from "./board.js";
import { get_piece,is_rook,is_queen,is_bishop,is_knight,is_pawn,is_king,same_color_piece,diff_color_piece,is_white_piece,is_black_piece,is_empty } from "./piece.js";
import {get_notation, get_square} from "./notation.js"

export function see_direction(board,start,direction){
    // Find first opponents piece in a certain direction from start. Needs a piece to be on start
    let curr = [start[0],start[1]];
    while(check_bounds([curr[0] + direction[0], curr[1] + direction[1]])){
        curr = [curr[0] + direction[0], curr[1] + direction[1]];
        if (same_color_piece(board,start,curr)){
            break;
        }

        if (diff_color_piece(board,start,curr)){
            return curr
        }
    }

    return [-1, -1];
}

export function attacked(board,square){
    // Function returns true if square containing piece attacked by piece of opposite color

    // Rook / Queen
    for (let i = -1; i <= 1; i++){
        if (i === 0){
            for (let j = -1; j <= 1; j += 2){
                let res = see_direction(board,square,[i, j]);
                if (check_bounds(res) && (is_rook(board,res) || is_queen(board,res))){
                    return true;
                }
            }
        }

        else{
            let res = see_direction(board,square,[i, 0]);
            if (check_bounds(res) && (is_rook(board,res) || is_queen(board,res))){
                return true;
            }
        }
    }   

    // Bishop / Queen
    for (let i = -1; i <= 1; i+=2){
        for (let j = -1; j <= 1; j+=2){
            let res = see_direction(board,square,[i, j]);
            if (check_bounds(res) && (is_bishop(board,res) || is_queen(board,res))){
                return true;
            }
        }
    }

    // Knight
    for (let i = -2; i <= 2; i += 4){
        for (let j = -1; j <= 1; j += 2){
            let candidate1 = [square[0] + i, square[1] + j];
            if (!(i === 0) && check_bounds(candidate1)){
                if (diff_color_piece(board,square,candidate1) && is_knight(board,candidate1)){                    
                    return true;
                }
            }

            let candidate2 = [square[0] + j, square[1] + i];
            if (!(i === 0) && check_bounds(candidate2)){
                if (diff_color_piece(board,square,candidate2) && is_knight(board,candidate2)){
                    return true;
                }
            }
        }
    }

    // Pawn
    if (is_black_piece(board,square)){
        let candidate1 = [square[0] + 1, square[1] - 1];
        if (check_bounds(candidate1) && diff_color_piece(board,square,candidate1) && is_pawn(board,candidate1)){            
            return true;
        }

        let candidate2 = [square[0] + 1, square[1] + 1];
        if (check_bounds(candidate2) && diff_color_piece(board,square,candidate2) && is_pawn(board,candidate2)){            
            return true;
        }
    }

    else if(is_white_piece(board,square)){
        let candidate1 = [square[0] - 1, square[1] - 1];
        if (check_bounds(candidate1) && diff_color_piece(board,square,candidate1) && is_pawn(board,candidate1)){            
            return true;
        }

        let candidate2 = [square[0] - 1, square[1] + 1];
        if (check_bounds(candidate2) && diff_color_piece(board,square,candidate2) && is_pawn(board,candidate2)){            
            return true;
        }
    }

    // King
    for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
            if (i == j && i == 0){
                continue;
            }

            let candidate = [square[0] + i, square[1] + j];
            if (check_bounds(candidate) && diff_color_piece(board,square,candidate) && is_king(board,candidate)){
                return true;
            }
        }
    }
    
    return false;
}

export function is_in_check(fen){
    // Returns true if side to move is in check
    let board = retrieve_board(fen);
    let meta = retrieve_meta(fen);

    let square = [];
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (meta["turn"] === 1){
                if (is_king(board,[i,j]) && is_white_piece(board,[i,j])){
                    square = [i,j];
                }
            }
            else{
                if (is_king(board,[i,j]) && is_black_piece(board,[i,j])){
                    square = [i,j];
                }
            } 
        }
    }

    return attacked(board,square)
}

export function is_safe(fen,start,end){
    // Returns true if move made does not lead to check.
    let board = retrieve_board(fen);
    let meta = retrieve_meta(fen);

    let temp = copy_board(board);
    make_move_raw(temp,start,end);

    let temp_fen = retrieve_fen(temp,meta);

    if (is_in_check(temp_fen)){
        return false;
    }

    return true;
}

export function find_all_possible(board,start,direction){
    // Find all moves in a certain direction from start. Needs a piece to be on start
    let curr = [start[0],start[1]];
    let moves = [];
    while(true){
        curr = [curr[0] + direction[0], curr[1] + direction[1]];
        if (check_bounds(curr)){
            if (same_color_piece(board,start,curr)){
                break;
            }
            else {
                moves.push(curr);
                if (diff_color_piece(board,start,curr)){
                    break;
                }
            }
        }
        else{
            break;
        }
    }

    return moves;
}

export function get_legal_rook(fen,square){
    // Find all legal rook moves. A piece must be on square.

    let board = retrieve_board(fen);
    let moves = []

    moves = moves.concat(find_all_possible(board,square,[0, 1])) // Right
    moves = moves.concat(find_all_possible(board,square,[1, 0])) // Down
    moves = moves.concat(find_all_possible(board,square,[0, -1])) // Left
    moves = moves.concat(find_all_possible(board,square,[-1, 0])) // Up
    
    moves = moves.filter((x)=>is_safe(fen,square, x))
    return moves;
}

export function get_legal_bishop(fen,square){
    // Find all legal bishop moves. A piece must be on square.
    
    let board = retrieve_board(fen);
    let moves = []

    moves = moves.concat(find_all_possible(board,square,[1, 1])) // Down-Right
    moves = moves.concat(find_all_possible(board,square,[1, -1])) // Down-Left
    moves = moves.concat(find_all_possible(board,square,[-1, 1])) // Up-Right
    moves = moves.concat(find_all_possible(board,square,[-1, -1])) // Up-Left

    moves = moves.filter((x)=>is_safe(fen,square, x))
    return moves;
}

export function get_legal_queen(fen,square){
    // Find all legal queen moves. A piece must be on square.
    let moves = get_legal_rook(fen,square);
    moves = moves.concat(get_legal_bishop(fen,square));

    return moves;
}

export function get_legal_knight(fen,square){
    // Find all legal knight moves. A piece must be on square.
    let board = retrieve_board(fen);
    let moves = [];

    for (let i = -2; i <= 2; i += 4){
        for (let j = -1; j <= 1; j += 2){
            let candidate1 = [square[0] + i, square[1] + j];
            if (!(i === 0) && check_bounds(candidate1)){
                if (is_empty(board,candidate1) || diff_color_piece(board,square,candidate1)){
                    moves.push(candidate1);
                    
                }
            }

            let candidate2 = [square[0] + j, square[1] + i];
            if (!(i === 0) && check_bounds(candidate2)){
                if (is_empty(board,candidate2) || diff_color_piece(board,square,candidate2)){
                    moves.push(candidate2);
                }
            }

        }
    }

    moves = moves.filter((x)=>is_safe(fen,square, x))
    return moves;
}

export function get_legal_king(fen,square){
    // Find all legal king moves. A piece must be on square.

    let board = retrieve_board(fen)
    let meta = retrieve_meta(fen);

    let moves = []
    for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
            let candidate = [square[0] + i, square[1] + j];
            if (!(i === j && i === 0) && check_bounds(candidate) == true){
                if (is_empty(board,candidate) || diff_color_piece(board,square,candidate)){
                    moves.push(candidate);
                }
            }
        }
    }

    // Check for castling
    if (!is_in_check(fen)){
        if (meta["turn"] === 1){
            if (meta["whiteKingSideCastle"] === 1){
                if (is_empty(board,[square[0], square[1] + 1]) && is_empty(board,[square[0], square[1] + 2])){
                    if (is_safe(fen,square,[square[0], square[1] + 1]) && is_safe(fen,square,[square[0], square[1] + 2])){
                        moves.push([square[0],square[1] + 2])
                    }
                }
            }

            if (meta["whiteQueenSideCastle"] === 1){
                if (is_empty(board,[square[0], square[1] - 1]) && is_empty(board,[square[0], square[1] - 2])){
                    if (is_safe(fen,square,[square[0], square[1] - 1]) && is_safe(fen,square,[square[0], square[1] - 2])){
                        moves.push([square[0],square[1] - 2])
                    }
                }
            }
        }

        else{
            if (meta["blackKingSideCastle"] === 1){
                if (is_empty(board,[square[0], square[1] + 1]) && is_empty(board,[square[0], square[1] + 2])){
                    if (is_safe(fen,square,[square[0], square[1] + 1]) && is_safe(fen,square,[square[0], square[1] + 2])){
                        moves.push([square[0],square[1] + 2])
                    }
                }
            }

            if (meta["blackQueenSideCastle"] === 1){
                if (is_empty(board,[square[0], square[1] - 1]) && is_empty(board,[square[0], square[1] - 2])){
                    if (is_safe(fen,square,[square[0], square[1] - 1]) && is_safe(fen,square,[square[0], square[1] - 2])){
                        moves.push([square[0],square[1] - 2])
                    }
                }
            }
        }
    }

    moves = moves.filter((x)=>is_safe(fen,square, x))
    return moves;
}

export function get_legal_pawn(fen,square){
    // Find all legal pawn moves. A piece must be on square.
    let board = retrieve_board(fen)
    let meta = retrieve_meta(fen);
    let moves = [];

    if (is_white_piece(board,square)){
        let candidate = [square[0] - 1, square[1]]; // One step forward
        if (check_bounds(candidate) && is_empty(board,candidate)){
            moves.push(candidate);
        }

        // Two steps forward
        if (square[0] == 6 && is_empty(board,[square[0] - 1,square[1]]) && is_empty(board,[square[0] - 2,square[1]])){
            moves.push([square[0] - 2,square[1]]);
        }

        // Capture left
        candidate = [square[0] - 1,square[1] - 1];
        if (check_bounds(candidate) && is_black_piece(board,candidate)){
            moves.push(candidate);
        }
        
        // Capture right
        candidate = [square[0] - 1,square[1] + 1];
        if (check_bounds(candidate) && is_black_piece(board,candidate)){
            moves.push(candidate);
        }

        // Enpassant handled here
        if (meta["enpassant"] !== 0){
            candidate = get_square(meta["enpassant"]);

            let cond1 = square[0] - candidate[0] === 1 && square[1] - candidate[1] === 1;
            let cond2 = square[0] - candidate[0] === 1 && square[1] - candidate[1] === -1;
            if (cond1 || cond2){
                moves.push(candidate);
            }
        }
    }

    else if (is_black_piece(board,square)){
        let candidate = [square[0] + 1, square[1]]; // One step forward
        if (check_bounds(candidate) && is_empty(board,candidate)){
            moves.push(candidate);
        }

        // Two steps forward
        if (square[0] == 1 && is_empty(board,[square[0] + 1,square[1]]) && is_empty(board,[square[0] + 2,square[1]])){
            moves.push([square[0] + 2,square[1]]);
        }

        // Capture right
        candidate = [square[0] + 1,square[1] - 1];
        if (check_bounds(candidate) && is_white_piece(board,candidate)){
            moves.push(candidate);
        }
        
        // Capture left
        candidate = [square[0] + 1,square[1] + 1];
        if (check_bounds(candidate) && is_white_piece(board,candidate)){
            moves.push(candidate);
        }

        // Enpassant handled here
        if (meta["enpassant"] !== 0){
            candidate = get_square(meta["enpassant"]);

            let cond1 = square[0] - candidate[0] === -1 && square[1] - candidate[1] === 1;
            let cond2 = square[0] - candidate[0] === -1 && square[1] - candidate[1] === -1;
            if (cond1 || cond2){
                moves.push(candidate);
            }
        }
    }
    
    moves = moves.filter(x=>is_safe(fen,square, x));
    return moves;
}

export function get_legal(fen,square){
    // Find all legal moves of a piece on square. A piece must be on square.
    let board = retrieve_board(fen);
    let meta = retrieve_meta(fen)

    // Check if player to move and color of piece same.
    if (meta["turn"] === 1 && is_black_piece(board,square)){
        return []
    }
    else if (meta["turn"] !== 1 && is_white_piece(board,square)){
        return []
    }
    
    // Find all legal moves for piece on square.
    if (is_king(board,square)){
        return get_legal_king(fen,square);
    }

    else if (is_queen(board,square)){
        return get_legal_queen(fen,square);
    }

    else if (is_rook(board,square)){
        return get_legal_rook(fen,square);
    }

    else if (is_bishop(board,square)){
        return get_legal_bishop(fen,square);
    }

    else if (is_knight(board,square)){
        return get_legal_knight(fen,square);
    }

    else if (is_pawn(board,square)){
        return get_legal_pawn(fen,square);
    }

    else{
        return [];
    }
}


export function make_move_raw(board,start_square,end_square){
    // Make move on board from start to end. Naive
    board[end_square[0]][end_square[1]] = get_piece(board,start_square);
    board[start_square[0]][start_square[1]] = " ";
}

export function make_move(fen, notation_start, notation_end){
    // Make move and return FEN of resulting position.
    let board = retrieve_board(fen);
    let meta = retrieve_meta(fen);


    const start = get_square(notation_start);
    const end = get_square(notation_end);
    let legal_moves = get_legal(fen,start);

    meta["enpassant"] = 0; // Set enpassant to false after finding all legal moves.

    let possible = false;
    for (let m of legal_moves){
        if (m[0] === end[0] && m[1] === end[1]){
            possible = true;
            break;
        }
    }

    // Return current position data if move not legal
    if (!possible){
        return fen;
    }

    // Handling losing castling rights for rook
    if (is_rook(board,start)){
        if (meta["turn"] === 1){
            if (start[1] === 7){
                meta["whiteKingSideCastle"] = 0;
            }
            else if (start[1] === 0){
                meta["whiteQueenSideCastle"] = 0;
            }
        }

        else{
            if (start[1] === 7){
                meta["blackKingSideCastle"] = 0;
            }
            else if (start[1] === 0){
                meta["blackQueenSideCastle"] = 0;
            }
        }
    }

    if (is_king(board,start)){
        // Handling losing castling rights for king
        if (meta["turn"] === 1){
            meta["whiteKingSideCastle"] = 0;
            meta["whiteQueenSideCastle"] = 0;
        }

        else{
            meta["blackKingSideCastle"] = 0;
            meta["blackQueenSideCastle"] = 0;
        }

        // Handling moving rook when castling.
        if (end[1] - start[1] === 2){
            make_move_raw(board,[end[0],end[1]+1],[end[0],end[1]-1])
        }
        else if (end[1] - start[1] === -2){
            make_move_raw(board,[end[0],end[1]-2],[end[0],end[1]+1])
        }
    }

    if (is_pawn(board,start)){
        // Handling en passant
        if (is_empty(board,end) && Math.abs(end[1] - start[1]) === 1){ // Column differs
            // Removing captured piece.
            if (meta["turn"] === 1){
                board[end[0] + 1][end[1]] = " "
            }

            else{
                board[end[0] - 1][end[1]] = " "
            }
        }

        else if (Math.abs(end[1] - start[1]) === 0 && Math.abs(end[0] - start[0]) === 2){
            // Updating meta to indicate enpassant possible.
            if (meta["turn"] === 1){
                meta["enpassant"] = get_notation([end[0] + 1,end[1]])
            }

            else{
                meta["enpassant"] = get_notation([end[0] - 1,end[1]])
            }
        }
    }


    make_move_raw(board,start,end)
    
    let x = get_square("h1");
    if (!(is_rook(board,x) && is_white_piece(board,x))){
        meta["whiteKingSideCastle"] = 0;
    }

    x = get_square("a1");
    if (!(is_rook(board,x) && is_white_piece(board,x))){
        meta["whiteQueenSideCastle"] = 0;
    }

    x = get_square("a8");
    if (!(is_rook(board,x) && is_black_piece(board,x))){
        meta["blackQueenSideCastle"] = 0;
    }

    x = get_square("h8");
    if (!(is_rook(board,x) && is_black_piece(board,x))){
        meta["blackKingSideCastle"] = 0;
    }

    meta["turn"] = 1 - meta["turn"]
    return retrieve_fen(board,meta);
}