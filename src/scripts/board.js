import {get_piece,is_empty} from "./piece.js"

export function check_bounds(square){
    // Returns true if square in bounds
    return (square[0] <= 7 && square[0] >= 0) && (square[1] <= 7 && square[1] >= 0);
}

export function copy_board(board){
    // Returns copied array representation of board position
    let board2 = [];
    for (let row of board){
        board2.push([...row]);
    }

    return board2;
}

export function print_board(board, as_white = true){
    // Pretty prints board position
    let d = {
        "k": "\u2654","q": "\u2655","r": "\u2656","b": "\u2657","n": "\u2658","p": "\u2659",
        "K": "\u265A","Q": "\u265B","R": "\u265C","B": "\u265D","N": "\u265E","P": "\u265F",
        " ": " "
    }
    console.log();
    if (as_white){
        for (let row in board){
            let s = 8 - row + "|"
            for (let square of board[row]){
                s += d[square] + " ";
            }
            console.log(s);
        }
    
        console.log("  ---------------");
        console.log("  a b c d e f g h");
    }
    else{
        for (let row in board){
            let n = ((row - 0) + 1);
            let s = n + "|";
            for (let col in board[8 - row - 1]){
                s += d[board[8 - row - 1][8 - col - 1]] + " ";
            }
            console.log(s);
        }
    
        console.log("  ---------------");
        console.log("  h g f e d c b a");
    }
    console.log()
}

export function init_fen(){
    // Returns FEN of initial position
    return "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -"
}

export function retrieve_fen(board,meta){
    // Returns constructed FEN from board state and meta data
    let s = "";

    for (let i = 0; i < 8; i++){
        let space = 0;
        for (let j = 0; j < 8; j++){
            if (!is_empty(board,[i,j])){
                if (space != 0){
                    s += space;
                }
                s += get_piece(board,[i,j]);
                space = 0;
            }
            else{
                space += 1
            }
        }

        if (i != 7){
            if (space != 0){
                s += space
            }
            s += "/"
        }
    }

    // Now adding meta data
    
    s += " "
    if (meta["turn"] === 1){
        s += "w";
    }
    else{
        s += "b";
    }

    s += " "

    let f = 0;
    if (meta["whiteKingSideCastle"] === 1){
        s += "K";
        f = 1;
    }

    if (meta["whiteQueenSideCastle"] === 1){
        s += "Q";
        f = 1;
    }

    if (meta["blackKingSideCastle"] === 1){
        s += "k";
        f = 1;
    }

    if (meta["blackQueenSideCastle"] === 1){
        s += "q";
        f = 1;
    }

    if (f == 1){
        s += " "
    }

    else{
        s += "- "
    }

    if (meta["enpassant"] === 0){
        s += "-" 
    }
    else{
        s += meta["enpassant"];
    }

    return s;
}

export function retrieve_board(fen){
    // Function extracting board state from fen
    let board = [
        [" "," "," "," "," "," "," "," "],
        [" "," "," "," "," "," "," "," "],
        [" "," "," "," "," "," "," "," "],
        [" "," "," "," "," "," "," "," "],
        [" "," "," "," "," "," "," "," "],
        [" "," "," "," "," "," "," "," "],
        [" "," "," "," "," "," "," "," "],
        [" "," "," "," "," "," "," "," "]
    ]

    let fields = fen.split(" ");

    let rows = fields[0].split("/");
    for (let i = 0; i < rows.length; i++){
        let j = 0;

        let itr = 0;
        while (itr < rows[i].length){
            if (!isNaN(rows[i][itr])){
                let num = Number.parseInt(rows[i][itr])

                while(num > 0){
                    board[i][j] = " "
                    j++;
                    num--;
                }
            }

            else{
                board[i][j] = rows[i][itr]
                j++;
            }
            
            itr++;
        }
    }

    return board
}

export function retrieve_meta(fen){
    // Function extracting meta data from FEN
    let fields = fen.split(" ");

    let to_move = fields[1];
    let castling = fields[2];
    let enpassant = fields[3];

    let res = {}
    
    if (to_move === "w"){
        res["turn"] = 1;
    }
    else{
        res["turn"] = 0;
    }

    res["whiteKingSideCastle"] = 0;
    res["whiteQueenSideCastle"] = 0;
    res["blackKingSideCastle"] = 0;
    res["blackQueenSideCastle"] = 0;
    res["enpassant"] = 0;

    for (let i = 0; i < castling.length; i++){
        if (castling[i] === "K"){
            res["whiteKingSideCastle"] = 1; 
        }

        else if (castling[i] === "Q"){
            res["whiteQueenSideCastle"] = 1;
        }

        else if (castling[i] === "k"){
            res["blackKingSideCastle"] = 1;
        }

        else if (castling[i] === "q"){
            res["blackQueenSideCastle"] = 1;
        }
    }

    if (enpassant !== "-"){
        res["enpassant"] = enpassant;
    }

    return res;
}
