import "./Square.css";

export default function Square({board,row,col}){
    let d = {
        "k": "\u2654","q": "\u2655","r": "\u2656","b": "\u2657","n": "\u2658","p": "\u2659",
        "K": "\u265A","Q": "\u265B","R": "\u265C","B": "\u265D","N": "\u265E","P": "\u265F",
        " ": " "
    }   
    
    if ((x + y) % 2 == 0){
        return (
            <>
            <div className="square white-square">
                {d[board[row][col]]}
            </div>
        </>
        )
    }

    return (
        <>
            <div className="square black-square">
                {d[board[row][col]]}
            </div>
        </>
    )
}