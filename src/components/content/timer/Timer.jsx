import {  useEffect, useState } from "react"
import "./Timer.css"

export function Timer({active, color, timeOut}){
    const [time,setTime] = useState(300);
    
    useEffect(()=>{
        if (active == 1 && time > 0){
            const interval = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            
            return () => clearInterval(interval);
        }
    },[time,active])
    
    if (time == 0){
        timeOut();
    }
    let seconds = time % 60;
    let minutes = (time - seconds) / 60;

    if (minutes < 10){
        minutes = "0"+minutes;
    }

    if (seconds < 10){
        seconds = "0"+seconds;
    }

    let formatted_time = `${minutes} : ${seconds}`
    let classNames = 'timer-text timer-text-'+color;

    if (active == 1){
        classNames += " active";
    }

    return (
        <div className={classNames}>
            {formatted_time}
        </div>
    )
}