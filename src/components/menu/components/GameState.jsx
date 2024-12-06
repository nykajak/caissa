import "./GameState.css"
import { Content } from "../../content/board/Content"

export function GameState({gameState,friendly}){
    return (
        <div className="menu-board-div">
            <Content key={gameState} friendly={friendly}/>
        </div>
    )
}