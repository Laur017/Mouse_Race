import { useState, useEffect } from "react";
import './Game.css';
import Timer from "../Timer/Timer";
import GameOver from "../GameOver/GameOver";

export default function Game() {
    const [objects, setObjects] = useState<{id: number; class:string; top: number; left: number; size: number}[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [win, setWin] = useState<boolean>(false)
    const [countCorrect, setCountCorrect] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)

    useEffect(() => {
        const newObjects: {
            id: number;
            class: string;
            top: number;
            left: number;
            size: number;
          }[] = [];

          const generateRandomPosition = (): { top: number; left: number; size: number } => {
            let foundValidPosition = false;
            let top = 0, left = 0, size = 0;
          
            while (!foundValidPosition) {
              foundValidPosition = true;
              top = Math.floor(Math.random() * 10) * 10;
              left = Math.floor(Math.random() * 10) * 10;
              size = Math.floor(Math.random() * 5) + 1;
          
              for (const obj of newObjects) {
                if (
                  top > obj.top - 4 * obj.size &&
                  top < obj.top + 4 * obj.size &&
                  left > obj.left - 4 * obj.size &&
                  left < obj.left + 4 * obj.size
                ) {
                  foundValidPosition = false;
                  break;
                }
              }
            }
            
            return { top, left, size };
          };
          

      
        for (let i = 0; i < 25; i++) {
          const position = generateRandomPosition();
          const classType =
            i >= 0 && i < 10 ? "red" : i >= 10 && i < 20 ? "green" : "change";
          const object = {
            id: i,
            class: classType,
            top: position.top,
            left: position.left,
            size: position.size,
          };
          newObjects.push(object);
        }
      
        setObjects(newObjects);
      
        const interval = setInterval(() => {
          setObjects((prevObjects) => {
            return prevObjects.map((obj) => {
              if (obj.class === "change") {
                return { ...obj, class: obj.class === "change" ? "changed" : "change" };
              } else if (obj.class === "changed") {
                return { ...obj, class: "change" };
              }
              return obj;
            });
          });
        }, 2000);
      
        return () => clearInterval(interval);
      }, []);
      

    const handleClick = (id: number, event: React.MouseEvent<HTMLDivElement>) => {
        if(event.currentTarget.className === "red" || event.currentTarget.className === "changed"){
          setWin(false)
          setGameOver(true)
        }

        const updatedBalls = objects.filter((ball) => ball.id !== id);
        setObjects(updatedBalls);
        setCountCorrect(countCorrect + 1)

    };

    useEffect(() => {
      if(countCorrect === 15){
        setWin(true)
        setGameOver(true)
      }
    },[countCorrect]);

    const timeUp = (m:number, s:number) => {
      setMinutes(m);
      setSeconds(s);
    }

    return (
        <div className="game-div">
            <Timer over={win} timeUp = {timeUp}/>
            {gameOver && 
            <div className="back-panel">
              <GameOver type={win} seconds={seconds} minutes={minutes}/>
            </div>  
              }
            <div className="action-div">
                {objects.map((obj) => (
                    <div
                        key={obj.id}
                        className={obj.class}
                        style={{ 
                            top: `${obj.top}%`, 
                            left: `${obj.left}%`, 
                            width: `${obj.size}rem`, 
                            height: `${obj.size}rem`}}
                        onClick={(e) => handleClick(obj.id,e)}
                    ></div>
                ))}
            </div>
        </div>
    );
}
