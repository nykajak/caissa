import { useState } from "react";
import { Timer } from "./Timer";

export function TimerDriver(){
    const [clockRunning,setClockRunning] = useState(0);
    return (
        <>
            <button onClick={()=>setClockRunning(1-clockRunning)}>Toggle</button>
            <Timer active={1 -clockRunning}/>
            <Timer active={clockRunning}/>
        </>
    )
}