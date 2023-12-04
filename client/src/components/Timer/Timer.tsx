import { useEffect, useState } from "react";
import './Timer.css'

interface TimerProps {
    over: boolean;
    timeUp: (m: number, s: number) => void;
  }

export default function Timer({over, timeUp}:TimerProps) {
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

    useEffect(() => {
        const intervalId = setInterval(incrementTimer, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        timeUp(minutes,seconds)
        setMinutes(0)
        setSeconds(0)
    },[over])
 

    return (
        <div className="timer-div">
            <h6>{minutes < 10 ? '0' + minutes : minutes} : {seconds < 10 ? '0' + seconds : seconds}</h6>
        </div>
    );
}
