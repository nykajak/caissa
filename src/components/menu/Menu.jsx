import "./Menu.css"
import { Board } from "../board/Board.jsx"
import { useState } from "react"

export function Menu(){
    const [gameState,setGameState] = useState(0);
    const [friendly,setFriendly] = useState(true);

    return (
        <div className="container">
            <div className="header-div">
                <h2 className="menu-text">Caissa - Your Portable Chess Board</h2> 
            </div>

            <div className="content-div">
                <div className="options-div">
                    <div className="options">
                        <button className="option-button" onClick={()=>{setGameState(x=>1-x); setFriendly(true)}} >New Friendly Game</button>
                    </div>
                    <div className="options">
                        <button className="option-button" onClick={()=>{setGameState(x=>1-x); setFriendly(false)}}>New Timed Game</button>
                    </div>
                </div>

                <div className="board-div">
                    <Board key={gameState} friendly={friendly}/>
                </div>
            </div>

            <div className="footer-div">
                <div>
                    <address>Made using React by Nykaj A K</address>
                </div>
            </div>
        </div>

    )
}