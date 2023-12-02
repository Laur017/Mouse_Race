import { useEffect, useState } from "react";
import './Timer.css'

export default function Timer() {
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const incrementTimer = (): void => {
        setSeconds(prevSeconds => {
            if (prevSeconds + 1 > 59) {
                setMinutes(prevMinutes => prevMinutes + 1);
                return 0;
            } else {
                return prevSeconds + 1;
            }
        });
    };

    // useEffect(() => {
    //     const intervalId = setInterval(incrementTimer, 1000);

    //     return () => clearInterval(intervalId);
    // }, []);

    return (
        <div className="timer-div">
            <h6>{minutes < 10 ? '0' + minutes : minutes} : {seconds < 10 ? '0' + seconds : seconds}</h6>
        </div>
    );
}
