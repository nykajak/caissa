import "./Termination.css"
import { useState } from "react"
export function Termination({gameOver}){
    const [isClosed, setIsClosed] = useState(false);

    if (isClosed){
        return <></>
    }

    return (
        <div className="termination-div">
            <button className="closeButton" onClick={()=>{setIsClosed(true)}}>x</button>
            {gameOver}
        </div>
    )
}