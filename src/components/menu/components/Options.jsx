import "./Options.css"
export function Options({setGameState,setFriendly}){
    return (
        <div className="menu-options-div">
            <div className="menu-options">
                <button className="menu-option-button" onClick={()=>{setGameState(x=>1-x); setFriendly(true)}} >New Friendly Game</button>
            </div>
            <div className="menu-options">
                <button className="menu-option-button" onClick={()=>{setGameState(x=>1-x); setFriendly(false)}}>New Timed Game</button>
            </div>
        </div>
    )
}