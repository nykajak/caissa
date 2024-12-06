import "./GameState.css"
import { Board } from "../../board/Board.jsx"

export function GameState({gameState,friendly}){
    return (
        <div className="menu-board-div">
            <Board key={gameState} friendly={friendly}/>
        </div>
    )
}