import { act, useEffect, useRef, useState } from "react"

export function Timer({active}){
    const [time,setTime] = useState(300);

    useEffect(()=>{
        if (active == 1){
            const interval = setInterval(() => {
                setTime(time - 1);
            }, 1000);
    
            return () => clearInterval(interval);
        }
    },[time,active])

    let seconds = time % 60;
    let minutes = (time - seconds) / 60;
    let formatted_time = `${minutes} minutes ${seconds} seconds!`

    return (
        <>
            {formatted_time}
        </>
    )
}