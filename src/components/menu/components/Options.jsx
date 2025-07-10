import "./Options.css"
export function Options({setGameState,setFriendly}){
    return (
        <div className="menu-options-div">
            <button className="menu-option-button" onClick={()=>{setGameState(x=>1-x); setFriendly(true)}}>
                <img src="/handshake.svg" alt="" />
                Casual Game
            </button>

            <button className="menu-option-button" onClick={()=>{setGameState(x=>1-x); setFriendly(false)}}>
                <img src="/timer.svg" alt="" />
                Timed Game
            </button>
        </div>
    )
}