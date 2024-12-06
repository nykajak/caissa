import "./Menu.css"

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Options } from "./components/Options.jsx";
import { GameState } from "./components/GameState.jsx";
import { useState } from "react"

export function Menu(){
    const [gameState,setGameState] = useState(0);
    const [friendly,setFriendly] = useState(true);

    return (
        <div className="menu-container">
            <Header/>

            <div className="menu-content-div">
                <Options setGameState={setGameState} setFriendly={setFriendly}/>
                <GameState gameState={gameState} friendly={friendly} />
            </div>

           <Footer/>
        </div>

    )
}