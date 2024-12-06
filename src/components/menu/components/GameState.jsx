import "./GameState.css"
import { BoardLayout } from "../../board/BoardLayout.jsx"

export function GameState({gameState,friendly}){
    return (
        <div className="menu-board-div">
            <BoardLayout key={gameState} friendly={friendly}/>
        </div>
    )
}